import Footer from "./Components/Footer";
import Header from "./Components/Header";

import BlogDetailsFullwidth from "./Pages/blog-details-fullwidth";
import BlogDetailsLeft from "./Pages/blog-details-left";
import BlogDetailsRight from "./Pages/blog-details-right";
import BlogGridFullwidth from "./Pages/blog-grid-fullwidth";
import BlogGridLeft from "./Pages/blog-grid-left";
import BlogGridRight from "./Pages/blog-grid-right";
import BlogListLeft from "./Pages/blog-list-left";
import BlogListRight from "./Pages/blog-list-right";

import Home from "./Pages/Home";
import Home2 from "./Pages/Home2";

import PageAbout from "./Pages/Page-about";
import PageContact from "./Pages/Page-contact";
import PageFaq from "./Pages/Page-faq";
import FogotLogin from "./Pages/Page-fogot-Login";
import FogotPassword from "./Pages/Page-fogot-password";
import MyAccount from "./Pages/Page-my-account";
import Page404 from "./Pages/Page404";
import AdminDashboard from "./Pages/AdminDashboard";

import ShopCart from "./Pages/Shop-cart";
import ShopCheckout from "./Pages/Shop-Checkout";
import CheckoutSuccess from "./Pages/CheckoutSuccess";
import ShopDetails from "./Pages/Shop-details";
import ShopGridfullwidth from "./Pages/Shop-Grid-fullwidth";
import ShopGridleft from "./Pages/shop-grid-left";
import ShopGridright from "./Pages/shop-grid-right";
import Shoplistleft from "./Pages/Shop-list-left";
import Shoplistright from "./Pages/Shop-list-right";
import Shopwishlist from "./Pages/Shop-wishlist";

import { useEffect, useLayoutEffect } from "react";
import { Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = localStorage.getItem("user");
  if (!user) {
    alert("Bạn cần đăng nhập để thực hiện chức năng này!");
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const userStr = localStorage.getItem("user");
  if (!userStr) {
    alert("Bạn cần đăng nhập để truy cập trang quản trị!");
    return <Navigate to="/login" replace />;
  }
  try {
    const user = JSON.parse(userStr);
    if (user?.role !== "admin") {
      alert("Tài khoản của bạn không có quyền truy cập trang này!");
      return <Navigate to="/" replace />;
    }
  } catch {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

const homeRoutes = new Set([
  "/",
  "/index2",
  "/index3",
  "/index4",
  "/index5",
  "/index6",
  "/index7",
  "/index8",
]);

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  // BODY CLASS HOME
  useLayoutEffect(() => {
    document.body.classList.toggle("home", homeRoutes.has(path));
  }, [path]);

  // SCROLL TOP
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  // RELOAD THEME SCRIPT (Slick / jQuery theme fix)
  useEffect(() => {
    const oldScript = document.getElementById("theme-script");
    oldScript?.remove();

    const timer = setTimeout(() => {
      const script = document.createElement("script");
      script.id = "theme-script";
      script.src = "/assets/js/app.js";
      script.async = true;
      document.body.appendChild(script);
    }, 100);

    return () => {
      clearTimeout(timer);
      document.getElementById("theme-script")?.remove();
    };
  }, [path]);

  // GLOBAL LINK HANDLER (SPA navigation)
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // Chặn các hành vi liên quan đến giỏ hàng, thanh toán, wishlist nếu chưa đăng nhập
      const isCartAction = 
        target.closest(".btn-add-to-cart") || 
        target.closest(".add-to-cart") || 
        target.closest(".add_to_cart") || 
        target.closest(".product-btn") ||
        target.closest(".btn-wishlist") ||
        target.closest(".wishlist-box") ||
        target.closest(".checkout") ||
        target.closest(".view-cart");

      const anchor = target.closest("a");
      const href = anchor ? anchor.getAttribute("href") : null;
      const isCartLink = href && (
        href.includes("cart") || 
        href.includes("checkout") || 
        href.includes("wishlist")
      );

      if (isCartAction || isCartLink) {
        const user = localStorage.getItem("user");
        if (!user) {
          event.preventDefault();
          event.stopPropagation();
          alert("Bạn cần đăng nhập để thực hiện chức năng này!");
          navigate("/login");
          return;
        }
      }

      // Nhận diện click "Add to cart" và xử lý thêm sản phẩm động vào giỏ hàng
      const isAddToCartClick = 
        target.closest(".btn-add-to-cart") || 
        (target.closest(".product-btn") && target.textContent?.toLowerCase().includes("add to cart")) ||
        (anchor && anchor.classList.contains("product-btn") && anchor.textContent?.toLowerCase().includes("add to cart"));

      if (isAddToCartClick) {
        const user = localStorage.getItem("user");
        if (user) {
          event.preventDefault();
          event.stopPropagation();

          const wrapper = target.closest(".product-wapper") || 
                          target.closest(".products-entry") || 
                          target.closest(".product-item") || 
                          target.closest(".shop-details") || 
                          target.closest(".product-top-info") || 
                          target.closest("tr") || 
                          target.closest(".product");
          if (wrapper) {
            const name = wrapper.querySelector(".product-title")?.textContent?.trim() || 
                         wrapper.querySelector(".product-name")?.textContent?.trim() || 
                         wrapper.querySelector(".product-title a")?.textContent?.trim() ||
                         wrapper.querySelector("h1.title")?.textContent?.trim() ||
                         "Sản phẩm";
            const priceElement = wrapper.querySelector(".price ins") || 
                                 wrapper.querySelector(".price span") || 
                                 wrapper.querySelector(".price");
            const priceText = priceElement?.textContent?.trim() || "$100.00";
            const price = parseFloat(priceText.replace(/[^0-9.]/g, "")) || 100;
            const imgElement = wrapper.querySelector("img");
            let img = imgElement?.getAttribute("src") || "/media/product/1.jpg";
            if (img && !img.startsWith("/") && !img.startsWith("http")) {
              img = "/" + img;
            }
            const id = name.toLowerCase().replace(/[^a-z0-9]/g, "-");

            const qtyInput = wrapper.querySelector(".qty") as HTMLInputElement;
            const qtyToAdd = qtyInput ? (parseInt(qtyInput.value) || 1) : 1;

            const cartStr = localStorage.getItem("cart") || "[]";
            let cart = [];
            try {
              cart = JSON.parse(cartStr);
            } catch {
              cart = [];
            }

            const existing = cart.find((item: any) => item.id === id);
            if (existing) {
              existing.quantity += qtyToAdd;
            } else {
              cart.push({ id, name, price, img, quantity: qtyToAdd });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            window.dispatchEvent(new Event("cartUpdated"));
            alert(`Đã thêm "${name}" vào giỏ hàng thành công!`);
          } else {
            alert("Không thể đọc thông tin sản phẩm.");
          }
          return;
        }
      }

      if (!anchor || !href) return;

      // ignore external links
      if (
        href.startsWith("http") ||
        href.startsWith("https") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:") ||
        href.startsWith("#") ||
        anchor.target === "_blank"
      ) {
        return;
      }

      event.preventDefault();

      try {
        const url = new URL(href, window.location.origin);

        if (url.origin !== window.location.origin) return;

        let targetPath = url.pathname;

        // remove .html nếu có
        targetPath = targetPath.replace(".html", "");

        // normalize page- paths
        if (targetPath.startsWith("/page-")) {
          targetPath = "/" + targetPath.slice(6);
        } else if (targetPath.startsWith("/Page-")) {
          targetPath = "/" + targetPath.slice(6);
        }

        // redirect index pages -> home
        const indexPages = [
          "/index",
          "/index3",
          "/index4",
          "/index5",
          "/index6",
          "/index7",
          "/index8",
        ];

        if (indexPages.includes(targetPath)) {
          targetPath = "/";
        }

        navigate(targetPath + url.search + url.hash);
      } catch (err) {
        console.error("Navigation error:", err);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [navigate]);

  return (
    <>
      <Header />

      <main>
        <Routes>
          {/* HOME */}
          <Route path="/" element={<Home />} />
          <Route path="/index2" element={<Home2 />} />

          {/* SHOP */}
          <Route path="/shop-grid-left" element={<ShopGridleft />} />
          <Route path="/shop-grid-right" element={<ShopGridright />} />
          <Route path="/shop-grid-fullwidth" element={<ShopGridfullwidth />} />
          <Route path="/shop-list-left" element={<Shoplistleft />} />
          <Route path="/shop-list-right" element={<Shoplistright />} />
          <Route path="/shop-details" element={<ShopDetails />} />
          <Route path="/shop-cart" element={<ProtectedRoute><ShopCart /></ProtectedRoute>} />
          <Route path="/shop-checkout" element={<ProtectedRoute><ShopCheckout /></ProtectedRoute>} />
          <Route path="/checkout-success" element={<ProtectedRoute><CheckoutSuccess /></ProtectedRoute>} />
          <Route path="/shop-wishlist" element={<ProtectedRoute><Shopwishlist /></ProtectedRoute>} />

          {/* BLOG */}
          <Route path="/blog-grid-left" element={<BlogGridLeft />} />
          <Route path="/blog-grid-right" element={<BlogGridRight />} />
          <Route path="/blog-grid-fullwidth" element={<BlogGridFullwidth />} />
          <Route path="/blog-list-left" element={<BlogListLeft />} />
          <Route path="/blog-list-right" element={<BlogListRight />} />
          <Route path="/blog-details-left" element={<BlogDetailsLeft />} />
          <Route path="/blog-details-right" element={<BlogDetailsRight />} />
          <Route path="/blog-details-fullwidth" element={<BlogDetailsFullwidth />} />

          {/* PAGES */}
          <Route path="/login" element={<FogotLogin />} />
          <Route path="/forgot-password" element={<FogotPassword />} />
          <Route path="/my-account" element={<ProtectedRoute><MyAccount /></ProtectedRoute>} />
          <Route path="/about" element={<PageAbout />} />
          <Route path="/contact" element={<PageContact />} />
          <Route path="/faq" element={<PageFaq />} />
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />

          {/* 404 */}
          <Route path="*" element={<Page404 />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;