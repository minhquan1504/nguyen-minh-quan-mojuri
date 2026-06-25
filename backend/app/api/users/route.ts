import { jsonResponse, optionsResponse } from "@/lib/response";
import { users } from "@/lib/store";
import { supabase } from "@/lib/supabase";

export function OPTIONS() {
  return optionsResponse();
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("id, name, email, role, createdAt")
      .order("createdAt", { ascending: false });

    if (error) {
      console.warn("Supabase users fetch failed, falling back to local memory:", error.message);
      const usersWithoutPasswords = users.map(({ password: _, ...u }) => u);
      return jsonResponse({ items: usersWithoutPasswords });
    }

    return jsonResponse({ items: data || [] });
  } catch (err) {
    console.error("Supabase users fetch error:", err);
    const usersWithoutPasswords = users.map(({ password: _, ...u }) => u);
    return jsonResponse({ items: usersWithoutPasswords });
  }
}
