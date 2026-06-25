import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2).optional(),
  description: z.string().min(1),
  thumbnail: z.string().min(1),
  gallery: z.array(z.string()).default([]),
  price: z.number().nonnegative(),
  salePrice: z.number().nonnegative().optional(),
  stock: z.number().int().nonnegative(),
  category: z.enum(["Rings", "Necklaces", "Earrings", "Bracelets"]),
  status: z.enum(["in_stock", "out_of_stock"]).default("in_stock"),
  isTrending: z.boolean().default(false),
  isNew: z.boolean().default(false),
});

export const orderSchema = z.object({
  customer: z.object({
    name: z.string().min(2),
    phone: z.string().min(8),
    address: z.string().min(5),
    email: z.email(),
  }),
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        name: z.string().min(1),
        price: z.number().nonnegative(),
        quantity: z.number().int().positive(),
      }),
    )
    .min(1),
  shippingFee: z.number().nonnegative().default(0),
});

export const blogSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2).optional(),
  coverImage: z.string().min(1),
  summary: z.string().min(1),
  content: z.string().min(1),
  category: z.enum(["Tips", "Collections", "News"]),
  status: z.enum(["draft", "published"]).default("draft"),
});

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  subject: z.string().min(2),
  message: z.string().min(5),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  password: z.string().min(6),
});

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
