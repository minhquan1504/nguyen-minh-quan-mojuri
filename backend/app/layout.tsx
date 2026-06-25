import type { ReactNode } from "react";

export const metadata = {
  title: "Mojuri Backend",
  description: "API server for Mojuri Jewelry E-commerce",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
