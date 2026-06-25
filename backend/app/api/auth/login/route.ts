import { badRequest, jsonResponse, optionsResponse } from "@/lib/response";
import { loginSchema } from "@/lib/schemas";
import { users } from "@/lib/store";
import { supabase } from "@/lib/supabase";

export function OPTIONS() {
  return optionsResponse();
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return badRequest("Dữ liệu đăng nhập không hợp lệ", parsed.error.flatten());
    }

    const { email, password } = parsed.data;

    // 1. Try Supabase login
    try {
      let { data: user, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email.toLowerCase())
        .maybeSingle();

      if (error) {
        console.warn("Supabase login check error:", error.message);
      } else if (!user && email.toLowerCase() === "admin@mojuri.local" && password === "admin123") {
        // Auto-seed admin user to Supabase
        const newAdmin = {
          id: "user_admin",
          name: "Mojuri Admin",
          email: "admin@mojuri.local",
          password: "admin123",
          role: "admin" as const,
          createdAt: new Date().toISOString(),
        };
        const { data: seededAdmin, error: seedError } = await supabase
          .from("users")
          .insert([newAdmin])
          .select()
          .single();
        if (!seedError) {
          user = seededAdmin;
        }
      }

      if (user) {
        if (user.password !== password) {
          return jsonResponse({ message: "Email hoặc mật khẩu không chính xác" }, { status: 401 });
        }
        const { password: _, ...userWithoutPassword } = user;
        return jsonResponse({
          token: `mock-token-${user.id}`,
          user: userWithoutPassword,
        });
      }
    } catch (supaErr: any) {
      console.warn("Supabase login error, falling back to local memory:", supaErr.message || supaErr);
    }

    // 2. Try Local Memory login
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
      return jsonResponse({ message: "Email hoặc mật khẩu không chính xác" }, { status: 401 });
    }

    const { password: _, ...userWithoutPassword } = user;

    return jsonResponse({
      token: `mock-token-${user.id}`,
      user: userWithoutPassword,
    });
  } catch (error) {
    return badRequest("Đã xảy ra lỗi khi xử lý yêu cầu");
  }
}
