import { badRequest, jsonResponse, notFound, optionsResponse } from "@/lib/response";
import { productSchema, slugify } from "@/lib/schemas";
import { products } from "@/lib/store";

type Params = {
  params: Promise<{ id: string }>;
};

export function OPTIONS() {
  return optionsResponse();
}

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  const product = products.find((item) => item.id === id || item.slug === id);

  if (!product) {
    return notFound("Product not found");
  }

  return jsonResponse(product);
}

export async function PUT(request: Request, { params }: Params) {
  const { id } = await params;
  const index = products.findIndex((item) => item.id === id || item.slug === id);

  if (index === -1) {
    return notFound("Product not found");
  }

  const body = await request.json();
  const parsed = productSchema.partial().safeParse(body);

  if (!parsed.success) {
    return badRequest("Invalid product data", parsed.error.flatten());
  }

  products[index] = {
    ...products[index],
    ...parsed.data,
    slug: parsed.data.slug ?? (parsed.data.name ? slugify(parsed.data.name) : products[index].slug),
  };

  return jsonResponse(products[index]);
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  const index = products.findIndex((item) => item.id === id || item.slug === id);

  if (index === -1) {
    return notFound("Product not found");
  }

  const [deleted] = products.splice(index, 1);

  return jsonResponse(deleted);
}
