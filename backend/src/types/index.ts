export type ProductStatus = "in_stock" | "out_of_stock";

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  gallery: string[];
  price: number;
  salePrice?: number;
  stock: number;
  category: "Rings" | "Necklaces" | "Earrings" | "Bracelets";
  status: ProductStatus;
  isTrending: boolean;
  isNew: boolean;
  createdAt: string;
};

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type OrderItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};

export type Order = {
  id: string;
  customer: {
    name: string;
    phone: string;
    address: string;
    email: string;
  };
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
};

export type BlogStatus = "draft" | "published";

export type Blog = {
  id: string;
  title: string;
  slug: string;
  coverImage: string;
  summary: string;
  content: string;
  category: "Tips" | "Collections" | "News";
  status: BlogStatus;
  createdAt: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: "user" | "admin";
  createdAt: string;
};
