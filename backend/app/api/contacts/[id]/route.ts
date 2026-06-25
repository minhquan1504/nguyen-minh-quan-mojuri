import { badRequest, jsonResponse, notFound, optionsResponse } from "@/lib/response";
import { contacts } from "@/lib/store";
import { supabase } from "@/lib/supabase";

type Params = {
  params: Promise<{ id: string }>;
};

export function OPTIONS() {
  return optionsResponse();
}

export async function PUT(request: Request, { params }: Params) {
  const { id } = await params;
  const body = await request.json();

  if (typeof body.isRead !== "boolean") {
    return badRequest("isRead must be boolean");
  }

  try {
    const { data, error } = await supabase
      .from("contacts")
      .update({ isRead: body.isRead })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.warn("Supabase contacts update failed, falling back to local memory:", error.message);
      const contact = contacts.find((item) => item.id === id);
      if (!contact) return notFound("Contact message not found");
      contact.isRead = body.isRead;
      return jsonResponse(contact);
    }

    return jsonResponse(data);
  } catch (err) {
    console.error("Supabase contacts update error:", err);
    const contact = contacts.find((item) => item.id === id);
    if (!contact) return notFound("Contact message not found");
    contact.isRead = body.isRead;
    return jsonResponse(contact);
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;

  try {
    const { data, error } = await supabase
      .from("contacts")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.warn("Supabase contacts delete failed, falling back to local memory:", error.message);
      const index = contacts.findIndex((item) => item.id === id);
      if (index === -1) return notFound("Contact message not found");
      const [deleted] = contacts.splice(index, 1);
      return jsonResponse(deleted);
    }

    return jsonResponse(data);
  } catch (err) {
    console.error("Supabase contacts delete error:", err);
    const index = contacts.findIndex((item) => item.id === id);
    if (index === -1) return notFound("Contact message not found");
    const [deleted] = contacts.splice(index, 1);
    return jsonResponse(deleted);
  }
}
