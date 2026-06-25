import { badRequest, jsonResponse, optionsResponse } from "@/lib/response";
import { productSchema, slugify } from "@/lib/schemas";
import { createId, products } from "@/lib/store";
import type { Product } from "@/types";

export function OPTIONS() {
  return optionsResponse();
}

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search")?.toLowerCase();
  const minPrice = Number(searchParams.get("minPrice") ?? 0);
  const maxPrice = Number(searchParams.get("maxPrice") ?? Number.MAX_SAFE_INTEGER);
  const page = Math.max(Number(searchParams.get("page") ?? 1), 1);
  const limit = Math.max(Number(searchParams.get("limit") ?? 12), 1);

  const filtered = products.filter((product) => {
    const price = product.salePrice ?? product.price;
    const matchesCategory = category ? product.category === category : true;
    const matchesSearch = search
      ? product.name.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search)
      : true;
    return matchesCategory && matchesSearch && price >= minPrice && price <= maxPrice;
  });

  const start = (page - 1) * limit;
  const items = filtered.slice(start, start + limit);

  return jsonResponse({
    items,
    meta: {
      page,
      limit,
      total: filtered.length,
      totalPages: Math.ceil(filtered.length / limit),
    },
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = productSchema.safeParse(body);

  if (!parsed.success) {
    return badRequest("Invalid product data", parsed.error.flatten());
  }

  const product: Product = {
    id: createId("prod"),
    ...parsed.data,
    slug: parsed.data.slug ?? slugify(parsed.data.name),
    createdAt: new Date().toISOString(),
  };

  products.unshift(product);

  return jsonResponse(product, { status: 201 });
}
