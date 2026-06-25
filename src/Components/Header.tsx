import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const [user, setUser] = useState<any>(() => {
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        return JSON.parse(userStr);
      }
    } catch {
      // ignore
    }
    return null;
  });
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const userObj = JSON.parse(userStr);
        return userObj?.role === "admin";
      }
    } catch {
      // ignore
    }
    return false;
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);
  const [isDesktopCartOpen, setIsDesktopCartOpen] = useState(false);

  const [cartItems, setCartItems] = useState<any[]>(() => {
    try {
      const cartStr = localStorage.getItem("cart");
      return cartStr ? JSON.parse(cartStr) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const handleCartUpdate = () => {
      try {
        const cartStr = localStorage.getItem("cart");
        setCartItems(cartStr ? JSON.parse(cartStr) : []);
      } catch {
        setCartItems([]);
      }
    };
    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleRemoveFromCart = (id: string) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".login-header")) {
        setIsDropdownOpen(false);
      }
      if (!target.closest(".mini-cart") && !target.closest(".mojuri-topcart")) {
        setIsMobileCartOpen(false);
        setIsDesktopCartOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsDropdownOpen(false);
    setIsMobileCartOpen(false);
    setIsDesktopCartOpen(false);
    const timer = setTimeout(() => {
      try {
        const userStr = localStorage.getItem("user");
        if (userStr) {
          const parsedUser = JSON.parse(userStr);
          setUser(parsedUser);
          setIsAdmin(parsedUser?.role === "admin");
        } else {
          setUser(null);
          setIsAdmin(false);
        }
      } catch {
        setUser(null);
        setIsAdmin(false);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const [headerEmail, setHeaderEmail] = useState("");
  const [headerPassword, setHeaderPassword] = useState("");
  const [headerError, setHeaderError] = useState<string | null>(null);
  const [headerLoading, setHeaderLoading] = useState(false);

  const handleHeaderLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setHeaderError(null);
    setHeaderLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: headerEmail,
          password: headerPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Đăng nhập thất bại");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);
      setIsAdmin(data.user?.role === "admin");
      
      setHeaderEmail("");
      setHeaderPassword("");

      if (data.user?.role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Đăng nhập không thành công.";
      setHeaderError(message);
    } finally {
      setHeaderLoading(false);
    }
  };

  return (
    <>
 <div id="page" className="hfeed page-wrapper">
       
<header id="site-header" className="site-header header-v1 color-white">
  <div className="header-mobile">
    <div className="section-padding">
      <div className="section-container">
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3 header-left">
            <div className="navbar-header">
              <button
                type="button"
                id="show-megamenu"
                className="navbar-toggle"
              />
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 header-center">
            <div className="site-logo">
              <a href="index.html">
                <img
                  width={400}
                  height={79}
                  src="media/logo-white.png"
                  alt="Mojuri – Jewelry Store HTML Template"
                />
              </a>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3 header-right">
            <div className="mojuri-topcart dropdown">
              <div className="dropdown mini-cart top-cart">
                <div className="remove-cart-shadow" />
                <a
                  className="dropdown-toggle cart-icon"
                  href="#"
                  role="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileCartOpen(!isMobileCartOpen);
                  }}
                >
                  <div className="icons-cart">
                    <i className="icon-large-paper-bag" />
                    <span className="cart-count">{cartCount}</span>
                  </div>
                </a>
                <div 
                  className="dropdown-menu cart-popup"
                  style={{
                    display: isMobileCartOpen ? "block" : "none",
                    opacity: isMobileCartOpen ? 1 : 0,
                    visibility: isMobileCartOpen ? "visible" : "hidden",
                    pointerEvents: isMobileCartOpen ? "auto" : "none",
                    position: "absolute",
                    right: 0,
                    top: "100%",
                    backgroundColor: "#ffffff",
                    zIndex: 999,
                    transition: "all 0.25s ease-in-out"
                  }}
                >
                  <div className="cart-empty-wrap" style={{ display: cartItems.length === 0 ? "block" : "none" }}>
                    <ul className="cart-list">
                      <li className="empty">
                        <span>No products in the cart.</span>
                        <a className="go-shop" href="/shop-grid-left">
                          GO TO SHOP
                          <i aria-hidden="true" className="arrow_right" />
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="cart-list-wrap" style={{ display: cartItems.length > 0 ? "block" : "none" }}>
                    <ul className="cart-list">
                      {cartItems.map((item) => (
                        <li key={item.id} className="mini-cart-item">
                          <a 
                            href="#" 
                            className="remove" 
                            title="Remove this item"
                            onClick={(e) => {
                              e.preventDefault();
                              handleRemoveFromCart(item.id);
                            }}
                          >
                            <i className="icon_close" />
                          </a>
                          <a href="/shop-details" className="product-image">
                            <img
                              width={600}
                              height={600}
                              src={item.img.startsWith("/") ? item.img : "/" + item.img}
                              alt={item.name}
                            />
                          </a>
                          <a href="/shop-details" className="product-name">
                            {item.name}
                          </a>
                          <div className="quantity">Qty: {item.quantity}</div>
                          <div className="price">${item.price.toFixed(2)}</div>
                        </li>
                      ))}
                    </ul>
                    <div className="total-cart">
                      <div className="title-total">Total: </div>
                      <div className="total-price">
                        <span>${cartTotal.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="buttons">
                      <a
                        href="/shop-cart"
                        className="button btn view-cart btn-primary"
                      >
                        View cart
                      </a>
                      <a
                        href="/shop-checkout"
                        className="button btn checkout btn-default"
                      >
                        Check out
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="header-mobile-fixed">
      {/* Shop */}
      <div className="shop-page">
        <a href="shop-grid-left.html">
          <i className="wpb-icon-shop" />
        </a>
      </div>
      {/* Login */}
      <div className="my-account">
        <div className="login-header" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <a href={user ? "/my-account" : "/login"}>
            <i className="wpb-icon-user" />
          </a>
          {user && (
            <span style={{ fontSize: "9px", color: "#666", whiteSpace: "nowrap", marginTop: "2px" }}>
              {user.name}
            </span>
          )}
        </div>
      </div>
      {/* Search */}
      <div className="search-box">
        <div className="search-toggle">
          <i className="wpb-icon-magnifying-glass" />
        </div>
      </div>
      {/* Wishlist */}
      <div className="wishlist-box">
        <a href="shop-wishlist.html">
          <i className="wpb-icon-heart" />
        </a>
      </div>
    </div>
  </div>
  <div className="header-desktop">
    <div className="header-wrapper">
      <div className="section-padding">
        <div className="section-container large p-l-r">
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 header-left">
              <div className="site-logo">
                <a href="index.html">
                  <img
                    width={400}
                    height={140}
                    src="media/logo-white.png"
                    alt="Mojuri – Jewelry Store HTML Template"
                  />
                </a>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 text-center header-center">
              <div className="site-navigation">
                <nav id="main-navigation">
                  <ul id="menu-main-menu" className="menu">
                    <li className="level-0 menu-item menu-item-has-children current-menu-item">
                      <a href="index.html">
                        <span className="menu-item-text">Home</span>
                      </a>
                      <ul className="sub-menu">
                        <li>
                          <a href="index.html">
                            <span className="menu-item-text">Home Clean</span>
                          </a>
                        </li>
                        <li>
                          <a href="index2.html">
                            <span className="menu-item-text">
                              Home Collection
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href="index3.html">
                            <span className="menu-item-text">Home Minimal</span>
                          </a>
                        </li>
                        <li>
                          <a href="index4.html">
                            <span className="menu-item-text">Home Modern</span>
                          </a>
                        </li>
                        <li>
                          <a href="index5.html">
                            <span className="menu-item-text">
                              Home Parallax
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href="index6.html">
                            <span className="menu-item-text">Home Strong</span>
                          </a>
                        </li>
                        <li>
                          <a href="index7.html">
                            <span className="menu-item-text">Home Style</span>
                          </a>
                        </li>
                        <li>
                          <a href="index8.html">
                            <span className="menu-item-text">Home Unique</span>
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="level-0 menu-item menu-item-has-children">
                      <a href="shop-grid-left.html">
                        <span className="menu-item-text">Shop</span>
                      </a>
                      <ul className="sub-menu">
                        <li className="level-1 menu-item menu-item-has-children">
                          <a href="shop-grid-left.html">
                            <span className="menu-item-text">
                              Shop - Products
                            </span>
                          </a>
                          <ul className="sub-menu">
                            <li>
                              <a href="shop-grid-left.html">
                                <span className="menu-item-text">
                                  Shop Grid - Left Sidebar
                                </span>
                              </a>
                            </li>
                            <li>
                              <a href="shop-list-left.html">
                                <span className="menu-item-text">
                                  Shop List - Left Sidebar
                                </span>
                              </a>
                            </li>
                            <li>
                              <a href="shop-grid-right.html">
                                <span className="menu-item-text">
                                  Shop Grid - Right Sidebar
                                </span>
                              </a>
                            </li>
                            <li>
                              <a href="shop-list-right.html">
                                <span className="menu-item-text">
                                  Shop List - Right Sidebar
                                </span>
                              </a>
                            </li>
                            <li>
                              <a href="shop-grid-fullwidth.html">
                                <span className="menu-item-text">
                                  Shop Grid - No Sidebar
                                </span>
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="shop-details.html">
                            <span className="menu-item-text">Shop Details</span>
                          </a>
                        </li>
                        <li>
                          <a href="/shop-cart">
                            <span className="menu-item-text">Shop - Cart</span>
                          </a>
                        </li>
                        <li>
                          <a href="/shop-checkout">
                            <span className="menu-item-text">
                              Shop - Checkout
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href="shop-wishlist.html">
                            <span className="menu-item-text">
                              Shop - Wishlist
                            </span>
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="level-0 menu-item menu-item-has-children mega-menu mega-menu-fullwidth align-center">
                      <a href="blog-grid-left.html">
                        <span className="menu-item-text">Blog</span>
                      </a>
                      <div className="sub-menu">
                        <div className="row">
                          <div className="col-md-5">
                            <div className="menu-section">
                              <h2 className="sub-menu-title">Blog Category</h2>
                              <ul className="menu-list">
                                <li>
                                  <a href="blog-grid-left.html">
                                    <span className="menu-item-text">
                                      Blog Grid - Left Sidebar
                                    </span>
                                  </a>
                                </li>
                                <li>
                                  <a href="blog-grid-right.html">
                                    <span className="menu-item-text">
                                      Blog Grid - Right Sidebar
                                    </span>
                                  </a>
                                </li>
                                <li>
                                  <a href="blog-list-left.html">
                                    <span className="menu-item-text">
                                      Blog List - Left Sidebar
                                    </span>
                                  </a>
                                </li>
                                <li>
                                  <a href="blog-list-right.html">
                                    <span className="menu-item-text">
                                      Blog List - Right Sidebar
                                    </span>
                                  </a>
                                </li>
                                <li>
                                  <a href="blog-grid-fullwidth.html">
                                    <span className="menu-item-text">
                                      Blog Grid - No Sidebar
                                    </span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                            <div className="menu-section">
                              <h2 className="sub-menu-title">Blog Details</h2>
                              <ul className="menu-list">
                                <li>
                                  <a href="blog-details-left.html">
                                    <span className="menu-item-text">
                                      Blog Details - Left Sidebar
                                    </span>
                                  </a>
                                </li>
                                <li>
                                  <a href="blog-details-right.html">
                                    <span className="menu-item-text">
                                      Blog Details - Right Sidebar
                                    </span>
                                  </a>
                                </li>
                                <li>
                                  <a href="blog-details-fullwidth.html">
                                    <span className="menu-item-text">
                                      Blog Details - No Sidebar
                                    </span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="col-md-7">
                            <div className="menu-section">
                              <h2 className="sub-menu-title">Recent Posts</h2>
                              <div className="block block-posts recent-posts p-t-5">
                                <ul className="posts-list">
                                  <li className="post-item">
                                    <a
                                      href="blog-details-right.html"
                                      className="post-image"
                                    >
                                      <img src="media/blog/1.jpg" />
                                    </a>
                                    <div className="post-content">
                                      <h2 className="post-title">
                                        <a href="blog-details-right.html">
                                          Bridial Fair Collections 2023
                                        </a>
                                      </h2>
                                      <div className="post-time">
                                        <span className="post-date">
                                          May 30, 2022
                                        </span>
                                        <span className="post-comment">
                                          4 Comments
                                        </span>
                                      </div>
                                    </div>
                                  </li>
                                  <li className="post-item">
                                    <a
                                      href="blog-details-right.html"
                                      className="post-image"
                                    >
                                      <img src="media/blog/2.jpg" />
                                    </a>
                                    <div className="post-content">
                                      <h2 className="post-title">
                                        <a href="blog-details-right.html">
                                          Our Sterling Silver
                                        </a>
                                      </h2>
                                      <div className="post-time">
                                        <span className="post-date">
                                          Aug 24, 2022
                                        </span>
                                        <span className="post-comment">
                                          2 Comments
                                        </span>
                                      </div>
                                    </div>
                                  </li>
                                  <li className="post-item">
                                    <a
                                      href="blog-details-right.html"
                                      className="post-image"
                                    >
                                      <img src="media/blog/3.jpg" />
                                    </a>
                                    <div className="post-content">
                                      <h2 className="post-title">
                                        <a href="blog-details-right.html">
                                          Kitchen Inspired On Japanese
                                        </a>
                                      </h2>
                                      <div className="post-time">
                                        <span className="post-date">
                                          Dec 06, 2022
                                        </span>
                                        <span className="post-comment">
                                          1 Comment
                                        </span>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="level-0 menu-item menu-item-has-children">
                      <a href="#">
                        <span className="menu-item-text">Pages</span>
                      </a>
                      <ul className="sub-menu">
                        <li>
                          <a href="page-login.html">
                            <span className="menu-item-text">
                              Login / Register
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href="page-forgot-password.html">
                            <span className="menu-item-text">
                              Forgot Password
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href="page-my-account.html">
                            <span className="menu-item-text">My Account</span>
                          </a>
                        </li>
                        <li>
                          <a href="page-about.html">
                            <span className="menu-item-text">About Us</span>
                          </a>
                        </li>
                        <li>
                          <a href="page-contact.html">
                            <span className="menu-item-text">Contact</span>
                          </a>
                        </li>
                        <li>
                          <a href="page-faq.html">
                            <span className="menu-item-text">FAQ</span>
                          </a>
                        </li>
                        <li>
                          <a href="page-404.html">
                            <span className="menu-item-text">Page 404</span>
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="level-0 menu-item">
                      <a href="/contact">
                        <span className="menu-item-text">Contact</span>
                      </a>
                    </li>
                    {isAdmin && (
                      <li className="level-0 menu-item">
                        <a href="/admin">
                          <span className="menu-item-text" style={{ color: "#d2691e", fontWeight: "bold" }}>Admin Dashboard</span>
                        </a>
                      </li>
                    )}
                  </ul>
                </nav>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 header-right">
              <div className="header-page-link">
                {/* Search */}
                <div className="search-box">
                  <div className="search-toggle">
                    <i className="icon-search" />
                  </div>
                </div>
                {/* Login */}
                <div className="login-header icon" style={{ position: "relative" }}>
                  <a 
                    className="active-login" 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsDropdownOpen(!isDropdownOpen);
                    }}
                  >
                    <i className="icon-user" />
                  </a>
                  {user ? (
                    <div 
                      className="user-dropdown-menu" 
                      style={{ 
                        position: "absolute",
                        right: 0,
                        top: "100%",
                        backgroundColor: "#ffffff",
                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
                        border: "1px solid #eeeeee",
                        borderRadius: "2px",
                        padding: "15px",
                        minWidth: "180px",
                        width: "180px",
                        zIndex: 999,
                        opacity: isDropdownOpen ? 1 : 0,
                        visibility: isDropdownOpen ? "visible" : "hidden",
                        pointerEvents: isDropdownOpen ? "auto" : "none",
                        display: isDropdownOpen ? "block" : "none",
                        transition: "all 0.25s ease-in-out"
                      }}
                    >
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px", transform: "none" }}>
                        <div style={{ fontSize: "13px", fontWeight: "bold", color: "#000000", borderBottom: "1px solid #eee", paddingBottom: "8px", marginBottom: "5px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          Hi, {user.name}
                        </div>
                        {user.role === "admin" && (
                          <a 
                            href="/admin" 
                            style={{ 
                              fontSize: "12px", 
                              color: "#d2691e", 
                              fontWeight: "bold",
                              textDecoration: "none",
                              display: "block",
                              padding: "4px 0"
                            }}
                          >
                            Admin Dashboard
                          </a>
                        )}
                        <a 
                          href="/my-account" 
                          style={{ 
                            fontSize: "12px", 
                            color: "#333333", 
                            textDecoration: "none",
                            display: "block",
                            padding: "4px 0"
                          }}
                        >
                          My Account
                        </a>
                        <a 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault();
                            localStorage.removeItem("user");
                            localStorage.removeItem("token");
                            window.location.href = "/";
                          }}
                          style={{ 
                            fontSize: "12px", 
                            color: "#ff4d4f", 
                            textDecoration: "none",
                            fontWeight: "bold",
                            marginTop: "8px",
                            display: "block",
                            borderTop: "1px solid #eee",
                            paddingTop: "8px"
                          }}
                        >
                          Đăng xuất
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div 
                      className="form-login-register"
                      style={{
                        position: "absolute",
                        right: 0,
                        top: "100%",
                        backgroundColor: "#ffffff",
                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
                        border: "1px solid #eeeeee",
                        borderRadius: "2px",
                        padding: "20px",
                        minWidth: "280px",
                        zIndex: 999,
                        opacity: isDropdownOpen ? 1 : 0,
                        visibility: isDropdownOpen ? "visible" : "hidden",
                        pointerEvents: isDropdownOpen ? "auto" : "none",
                        display: isDropdownOpen ? "block" : "none",
                        transition: "all 0.25s ease-in-out"
                      }}
                    >
                      <div className="box-form-login" style={{ transform: "none" }}>
                        <div className="box-content" style={{ transform: "none" }}>
                          <div className="form-login active" style={{ transform: "none" }}>
                            <form onSubmit={handleHeaderLogin} className="login" style={{ transform: "none" }}>
                              <h2 style={{ color: "#333333", marginBottom: "15px", fontSize: "18px", textTransform: "uppercase" }}>Sign in</h2>
                              {headerError && (
                                <p className="status" style={{ color: "red", fontSize: "11px", marginBottom: "10px" }}>
                                  {headerError}
                                </p>
                              )}
                              <div className="content" style={{ transform: "none" }}>
                                <div className="username" style={{ marginBottom: "10px" }}>
                                  <input
                                    type="email"
                                    required
                                    className="input-text"
                                    name="username"
                                    placeholder="Your email"
                                    value={headerEmail}
                                    onChange={(e) => setHeaderEmail(e.target.value)}
                                    style={{ color: "#333333", backgroundColor: "#ffffff", border: "1px solid #dddddd", width: "100%", padding: "8px 12px", textTransform: "none" }}
                                  />
                                </div>
                                <div className="password" style={{ marginBottom: "15px" }}>
                                  <input
                                    className="input-text"
                                    required
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={headerPassword}
                                    onChange={(e) => setHeaderPassword(e.target.value)}
                                    style={{ color: "#333333", backgroundColor: "#ffffff", border: "1px solid #dddddd", width: "100%", padding: "8px 12px" }}
                                  />
                                </div>
                                <div className="button-login">
                                  <button
                                    type="submit"
                                    className="button"
                                    disabled={headerLoading}
                                    style={{ width: "100%", padding: "10px", backgroundColor: "#333", color: "#fff", border: "none" }}
                                  >
                                    {headerLoading ? "Loading..." : "Login"}
                                  </button>
                                </div>
                                <div className="button-next-reregister" style={{ textAlign: "center", marginTop: "10px" }}>
                                  <a href="/login" style={{ textDecoration: "underline", color: "#d2691e", fontSize: "12px" }}>
                                    Create An Account
                                  </a>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {/* Wishlist */}
                <div className="wishlist-box">
                  <a href="shop-wishlist.html">
                    <i className="icon-heart" />
                  </a>
                  <span className="count-wishlist">1</span>
                </div>
                {/* Cart */}
                <div className="mojuri-topcart dropdown light">
                  <div className="dropdown mini-cart top-cart">
                    <div className="remove-cart-shadow" />
                    <a
                      className="dropdown-toggle cart-icon"
                      href="#"
                      role="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsDesktopCartOpen(!isDesktopCartOpen);
                      }}
                    >
                      <div className="icons-cart">
                        <i className="icon-large-paper-bag" />
                        <span className="cart-count">{cartCount}</span>
                      </div>
                    </a>
                    <div 
                      className="dropdown-menu cart-popup"
                      style={{
                        display: isDesktopCartOpen ? "block" : "none",
                        opacity: isDesktopCartOpen ? 1 : 0,
                        visibility: isDesktopCartOpen ? "visible" : "hidden",
                        pointerEvents: isDesktopCartOpen ? "auto" : "none",
                        position: "absolute",
                        right: 0,
                        top: "100%",
                        backgroundColor: "#ffffff",
                        zIndex: 999,
                        transition: "all 0.25s ease-in-out"
                      }}
                    >
                      <div className="cart-empty-wrap" style={{ display: cartItems.length === 0 ? "block" : "none" }}>
                        <ul className="cart-list">
                          <li className="empty">
                            <span>No products in the cart.</span>
                            <a className="go-shop" href="/shop-grid-left">
                              GO TO SHOP
                              <i aria-hidden="true" className="arrow_right" />
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="cart-list-wrap" style={{ display: cartItems.length > 0 ? "block" : "none" }}>
                        <ul className="cart-list">
                          {cartItems.map((item) => (
                            <li key={item.id} className="mini-cart-item">
                              <a
                                href="#"
                                className="remove"
                                title="Remove this item"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleRemoveFromCart(item.id);
                                }}
                              >
                                <i className="icon_close" />
                              </a>
                              <a
                                href="/shop-details"
                                className="product-image"
                              >
                                <img
                                  width={600}
                                  height={600}
                                  src={item.img.startsWith("/") ? item.img : "/" + item.img}
                                  alt={item.name}
                                />
                              </a>
                              <a
                                href="/shop-details"
                                className="product-name"
                              >
                                {item.name}
                              </a>
                              <div className="quantity">Qty: {item.quantity}</div>
                              <div className="price">${item.price.toFixed(2)}</div>
                            </li>
                          ))}
                        </ul>
                        <div className="total-cart">
                          <div className="title-total">Total: </div>
                          <div className="total-price">
                            <span>${cartTotal.toFixed(2)}</span>
                          </div>
                        </div>
                        <div className="buttons">
                          <a
                            href="/shop-cart"
                            className="button btn view-cart btn-primary"
                          >
                            View cart
                          </a>
                          <a
                            href="/shop-checkout"
                            className="button btn checkout btn-default"
                          >
                            Check out
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>
</div>
</>
    )
}

