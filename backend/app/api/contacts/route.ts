import { badRequest, jsonResponse, optionsResponse } from "@/lib/response";
import { contactSchema } from "@/lib/schemas";
import { contacts, createId } from "@/lib/store";
import { supabase } from "@/lib/supabase";
import type { ContactMessage } from "@/types";

export function OPTIONS() {
  return optionsResponse();
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .order("createdAt", { ascending: false });

    if (error) {
      console.warn("Supabase fetch failed, falling back to local memory:", error.message);
      return jsonResponse({ items: contacts });
    }

    return jsonResponse({ items: data || [] });
  } catch (err) {
    console.error("Supabase contacts fetch error:", err);
    return jsonResponse({ items: contacts });
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return badRequest("Invalid contact data", parsed.error.flatten());
  }

  const contact: ContactMessage = {
    id: createId("contact"),
    ...parsed.data,
    isRead: false,
    createdAt: new Date().toISOString(),
  };

  try {
    const { data, error } = await supabase
      .from("contacts")
      .insert([contact])
      .select()
      .single();

    if (error) {
      console.warn("Supabase insert failed, storing in local memory fallback:", error.message);
      contacts.unshift(contact);
      return jsonResponse(contact, { status: 201 });
    }

    return jsonResponse(data, { status: 201 });
  } catch (err) {
    console.error("Supabase contacts insert error:", err);
    contacts.unshift(contact);
    return jsonResponse(contact, { status: 201 });
  }
}
