import type { Blog, ContactMessage, Order, Product, User } from "@/types";

export const products: Product[] = [
  {
    id: "prod_1",
    name: "Medium Flat Hoops",
    slug: "medium-flat-hoops",
    description: "Minimal polished hoop earrings for everyday styling.",
    thumbnail: "/media/product/1.jpg",
    gallery: ["/media/product/1.jpg", "/media/product/1-2.jpg"],
    price: 180,
    salePrice: 150,
    stock: 12,
    category: "Earrings",
    status: "in_stock",
    isTrending: true,
    isNew: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "prod_2",
    name: "Twin Hoops",
    slug: "twin-hoops",
    description: "Elegant twin hoop earrings with a clean jewelry-store finish.",
    thumbnail: "/media/product/3.jpg",
    gallery: ["/media/product/3.jpg", "/media/product/3-2.jpg"],
    price: 150,
    stock: 8,
    category: "Earrings",
    status: "in_stock",
    isTrending: true,
    isNew: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "prod_3",
    name: "Diamond Bracelet",
    slug: "diamond-bracelet",
    description: "Classic bracelet inspired by the Mojuri template product grid.",
    thumbnail: "/media/product/5.jpg",
    gallery: ["/media/product/5.jpg", "/media/product/5-2.jpg"],
    price: 220,
    salePrice: 199,
    stock: 5,
    category: "Bracelets",
    status: "in_stock",
    isTrending: false,
    isNew: true,
    createdAt: new Date().toISOString(),
  },
];

export const orders: Order[] = [];

export const blogs: Blog[] = [
  {
    id: "blog_1",
    title: "Bridal Fair Collections 2023",
    slug: "bridal-fair-collections-2023",
    coverImage: "/media/blog/1.jpg",
    summary: "A short guide to bridal jewelry styling and collection choices.",
    content: "Choose elegant pieces that complement the dress without overpowering it.",
    category: "Collections",
    status: "published",
    createdAt: new Date().toISOString(),
  },
  {
    id: "blog_2",
    title: "How To Care For Sterling Silver",
    slug: "how-to-care-for-sterling-silver",
    coverImage: "/media/blog/2.jpg",
    summary: "Simple care habits to keep silver jewelry bright.",
    content: "Store silver pieces dry, clean them gently, and avoid harsh chemicals.",
    category: "Tips",
    status: "published",
    createdAt: new Date().toISOString(),
  },
];

export const contacts: ContactMessage[] = [];

export const users: User[] = [
  {
    id: "user_admin",
    name: "Mojuri Admin",
    email: "admin@mojuri.local",
    password: "admin123",
    role: "admin",
    createdAt: new Date().toISOString(),
  }
];

export function createId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}
