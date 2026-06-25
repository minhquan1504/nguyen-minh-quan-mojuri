import { badRequest, jsonResponse, optionsResponse } from "@/lib/response";
import { orderSchema } from "@/lib/schemas";
import { createId, orders } from "@/lib/store";
import type { Order } from "@/types";

export function OPTIONS() {
  return optionsResponse();
}

export function GET() {
  return jsonResponse({ items: orders });
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = orderSchema.safeParse(body);

  if (!parsed.success) {
    return badRequest("Invalid order data", parsed.error.flatten());
  }

  const subtotal = parsed.data.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const order: Order = {
    id: createId("order"),
    customer: parsed.data.customer,
    items: parsed.data.items,
    subtotal,
    shippingFee: parsed.data.shippingFee,
    total: subtotal + parsed.data.shippingFee,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  orders.unshift(order);

  return jsonResponse(order, { status: 201 });
}
