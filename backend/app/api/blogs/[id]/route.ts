import { badRequest, jsonResponse, notFound, optionsResponse } from "@/lib/response";
import { blogSchema, slugify } from "@/lib/schemas";
import { blogs } from "@/lib/store";

type Params = {
  params: Promise<{ id: string }>;
};

export function OPTIONS() {
  return optionsResponse();
}

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  const blog = blogs.find((item) => item.id === id || item.slug === id);

  if (!blog) {
    return notFound("Blog not found");
  }

  return jsonResponse(blog);
}

export async function PUT(request: Request, { params }: Params) {
  const { id } = await params;
  const index = blogs.findIndex((item) => item.id === id || item.slug === id);

  if (index === -1) {
    return notFound("Blog not found");
  }

  const body = await request.json();
  const parsed = blogSchema.partial().safeParse(body);

  if (!parsed.success) {
    return badRequest("Invalid blog data", parsed.error.flatten());
  }

  blogs[index] = {
    ...blogs[index],
    ...parsed.data,
    slug: parsed.data.slug ?? (parsed.data.title ? slugify(parsed.data.title) : blogs[index].slug),
  };

  return jsonResponse(blogs[index]);
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  const index = blogs.findIndex((item) => item.id === id || item.slug === id);

  if (index === -1) {
    return notFound("Blog not found");
  }

  const [deleted] = blogs.splice(index, 1);

  return jsonResponse(deleted);
}
