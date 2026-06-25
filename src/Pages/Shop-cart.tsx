import { useState, useEffect } from "react";

export default function ShopCart() {
  const [cartItems, setCartItems] = useState<any[]>(() => {
    try {
      const cartStr = localStorage.getItem("cart");
      return cartStr ? JSON.parse(cartStr) : [];
    } catch {
      return [];
    }
  });

  const updateQuantity = (id: string, delta: number) => {
    const updated = cartItems.map((item) => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const updateQuantityInput = (id: string, value: number) => {
    const qty = Math.max(1, isNaN(value) ? 1 : value);
    const updated = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: qty };
      }
      return item;
    });
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = (id: string) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <div id="site-main" className="site-main">
        <div id="main-content" className="main-content">
          <div id="primary" className="content-area">
            <div id="title" className="page-title">
              <div className="section-container">
                <div className="content-title-heading">
                  <h1 className="text-title-heading">Shopping Cart</h1>
                </div>
                <div className="breadcrumbs">
                  <a href="/">Home</a>
                  <span className="delimiter" />
                  <a href="/shop-grid-left">Shop</a>
                  <span className="delimiter" />
                  Shopping Cart
                </div>
              </div>
            </div>
            <div id="content" className="site-content" role="main">
              <div className="section-padding">
                <div className="section-container p-l-r">
                  {cartItems.length > 0 ? (
                    <div className="shop-cart">
                      <div className="row">
                        <div className="col-xl-8 col-lg-12 col-md-12 col-12">
                          <form className="cart-form" onSubmit={(e) => e.preventDefault()}>
                            <div className="table-responsive">
                              <table className="cart-items table" cellSpacing={0}>
                                <thead>
                                  <tr>
                                    <th className="product-thumbnail">Product</th>
                                    <th className="product-price">Price</th>
                                    <th className="product-quantity">Quantity</th>
                                    <th className="product-subtotal">Subtotal</th>
                                    <th className="product-remove">&nbsp;</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {cartItems.map((item) => (
                                    <tr key={item.id} className="cart-item">
                                      <td className="product-thumbnail">
                                        <a href="/shop-details">
                                          <img
                                            width={600}
                                            height={600}
                                            src={item.img}
                                            className="product-image"
                                            alt={item.name}
                                          />
                                        </a>
                                        <div className="product-name">
                                          <a href="/shop-details">{item.name}</a>
                                        </div>
                                      </td>
                                      <td className="product-price">
                                        <span className="price">${item.price.toFixed(2)}</span>
                                      </td>
                                      <td className="product-quantity">
                                        <div className="quantity">
                                          <button 
                                            type="button" 
                                            className="minus"
                                            onClick={() => updateQuantity(item.id, -1)}
                                          >
                                            -
                                          </button>
                                          <input
                                            type="number"
                                            className="qty"
                                            step={1}
                                            min={1}
                                            name="quantity"
                                            value={item.quantity}
                                            onChange={(e) => updateQuantityInput(item.id, parseInt(e.target.value))}
                                            title="Qty"
                                            size={4}
                                            inputMode="numeric"
                                            autoComplete="off"
                                          />
                                          <button 
                                            type="button" 
                                            className="plus"
                                            onClick={() => updateQuantity(item.id, 1)}
                                          >
                                            +
                                          </button>
                                        </div>
                                      </td>
                                      <td className="product-subtotal">
                                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                                      </td>
                                      <td className="product-remove">
                                        <a 
                                          href="#" 
                                          className="remove"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            removeItem(item.id);
                                          }}
                                        >
                                          ×
                                        </a>
                                      </td>
                                    </tr>
                                  ))}
                                  <tr>
                                    <td colSpan={5} className="actions">
                                      <div className="bottom-cart" style={{ justifyContent: "space-between" }}>
                                        <h2>
                                          <a href="/shop-grid-left" style={{ textDecoration: "underline", color: "#d2691e" }}>
                                            Continue Shopping
                                          </a>
                                        </h2>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </form>
                        </div>
                        <div className="col-xl-4 col-lg-12 col-md-12 col-12">
                          <div className="cart-totals">
                            <h2>Cart totals</h2>
                            <div>
                              <div className="cart-subtotal">
                                <div className="title">Subtotal</div>
                                <div>
                                  <span>${cartTotal.toFixed(2)}</span>
                                </div>
                              </div>
                              <div className="shipping-totals">
                                <div className="title">Shipping</div>
                                <div>
                                  <ul className="shipping-methods custom-radio">
                                    <li>
                                      <input
                                        type="radio"
                                        name="shipping_method"
                                        value="free_shipping"
                                        className="shipping_method"
                                        defaultChecked
                                      />
                                      <label>Free shipping</label>
                                    </li>
                                  </ul>
                                  <p className="shipping-desc">
                                    Shipping options will be updated during checkout.
                                  </p>
                                </div>
                              </div>
                              <div className="order-total">
                                <div className="title">Total</div>
                                <div>
                                  <span style={{ fontWeight: "bold", fontSize: "18px", color: "#000" }}>
                                    ${cartTotal.toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="proceed-to-checkout">
                              <a
                                href="/shop-checkout"
                                className="checkout-button button"
                              >
                                Proceed to checkout
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="shop-cart-empty" style={{ display: "block", textAlign: "center", padding: "50px 0" }}>
                      <div className="notices-wrapper">
                        <p className="cart-empty" style={{ fontSize: "16px", marginBottom: "20px" }}>
                          Your cart is currently empty.
                        </p>
                      </div>
                      <div className="return-to-shop">
                        <a className="button" href="/shop-grid-left" style={{ padding: "12px 30px", backgroundColor: "#333", color: "#fff", textTransform: "uppercase" }}>
                          Return to shop
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}