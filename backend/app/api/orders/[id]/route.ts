import { badRequest, jsonResponse, notFound, optionsResponse } from "@/lib/response";
import { orders } from "@/lib/store";
import type { OrderStatus } from "@/types";

const statuses: OrderStatus[] = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

type Params = {
  params: Promise<{ id: string }>;
};

export function OPTIONS() {
  return optionsResponse();
}

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  const order = orders.find((item) => item.id === id);

  if (!order) {
    return notFound("Order not found");
  }

  return jsonResponse(order);
}

export async function PUT(request: Request, { params }: Params) {
  const { id } = await params;
  const order = orders.find((item) => item.id === id);

  if (!order) {
    return notFound("Order not found");
  }

  const body = await request.json();

  if (!statuses.includes(body.status)) {
    return badRequest("Invalid order status");
  }

  order.status = body.status;

  return jsonResponse(order);
}
