import { jsonResponse, notFound, optionsResponse } from "@/lib/response";
import { users } from "@/lib/store";
import { supabase } from "@/lib/supabase";

type Params = {
  params: Promise<{ id: string }>;
};

export function OPTIONS() {
  return optionsResponse();
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;

  // Prevent deleting the initial admin
  if (id === "user_admin") {
    return new Response(JSON.stringify({ message: "Cannot delete admin user" }), {
      status: 400,
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }

  try {
    const { data, error } = await supabase
      .from("users")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.warn("Supabase user delete failed, falling back to local memory:", error.message);
      const index = users.findIndex((u) => u.id === id);
      if (index === -1) return notFound("User not found");
      const [deleted] = users.splice(index, 1);
      const { password: _, ...userWithoutPassword } = deleted;
      return jsonResponse(userWithoutPassword);
    }

    const { password: _, ...userWithoutPassword } = data;
    return jsonResponse(userWithoutPassword);
  } catch (err) {
    console.error("Supabase user delete error:", err);
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) return notFound("User not found");
    const [deleted] = users.splice(index, 1);
    const { password: _, ...userWithoutPassword } = deleted;
    return jsonResponse(userWithoutPassword);
  }
}
