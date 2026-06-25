import { badRequest, jsonResponse, optionsResponse } from "@/lib/response";
import { blogSchema, slugify } from "@/lib/schemas";
import { blogs, createId } from "@/lib/store";
import type { Blog } from "@/types";

export function OPTIONS() {
  return optionsResponse();
}

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const items = status ? blogs.filter((blog) => blog.status === status) : blogs;

  return jsonResponse({ items });
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = blogSchema.safeParse(body);

  if (!parsed.success) {
    return badRequest("Invalid blog data", parsed.error.flatten());
  }

  const blog: Blog = {
    id: createId("blog"),
    ...parsed.data,
    slug: parsed.data.slug ?? slugify(parsed.data.title),
    createdAt: new Date().toISOString(),
  };

  blogs.unshift(blog);

  return jsonResponse(blog, { status: 201 });
}
