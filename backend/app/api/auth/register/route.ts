import { badRequest, jsonResponse, optionsResponse } from "@/lib/response";
import { registerSchema } from "@/lib/schemas";
import { users, createId } from "@/lib/store";
import { supabase } from "@/lib/supabase";

export function OPTIONS() {
  return optionsResponse();
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return badRequest("Dữ liệu đăng ký không hợp lệ", parsed.error.flatten());
    }

    const { name, email, password } = parsed.data;

    // 1. Supabase check & register
    try {
      const { data: existingUser, error: checkError } = await supabase
        .from("users")
        .select("*")
        .eq("email", email.toLowerCase())
        .maybeSingle();

      if (checkError) {
        console.warn("Supabase check error during register:", checkError.message);
      } else if (existingUser) {
        return badRequest("Email đã được sử dụng bởi một tài khoản khác");
      }

      if (!existingUser && !checkError) {
        const newUser = {
          id: createId("user"),
          name,
          email: email.toLowerCase(),
          password,
          role: "user" as const,
          createdAt: new Date().toISOString(),
        };

        const { data: createdUser, error: insertError } = await supabase
          .from("users")
          .insert([newUser])
          .select()
          .single();

        if (insertError) {
          throw insertError;
        }

        const { password: _, ...userWithoutPassword } = createdUser;
        return jsonResponse({
          message: "Đăng ký thành công",
          user: userWithoutPassword,
        });
      }
    } catch (supaErr: any) {
      console.warn("Supabase register error, falling back to local memory:", supaErr.message || supaErr);
    }

    // 2. Local Memory fallback
    const existingUser = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (existingUser) {
      return badRequest("Email đã được sử dụng bởi một tài khoản khác");
    }

    const newUser = {
      id: createId("user"),
      name,
      email,
      password,
      role: "user" as const,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);

    const { password: _, ...userWithoutPassword } = newUser;

    return jsonResponse({
      message: "Đăng ký thành công",
      user: userWithoutPassword,
    });
  } catch (error) {
    return badRequest("Đã xảy ra lỗi khi xử lý yêu cầu");
  }
}
