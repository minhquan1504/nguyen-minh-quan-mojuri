import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ShopCheckout() {
  const navigate = useNavigate();

  // Load cart items dynamically
  const [cartItems] = useState<any[]>(() => {
    try {
      const cartStr = localStorage.getItem("cart");
      return cartStr ? JSON.parse(cartStr) : [];
    } catch {
      return [];
    }
  });

  // Checkbox toggle states
  const [createAccount, setCreateAccount] = useState(false);
  const [shipToDifferent, setShipToDifferent] = useState(false);

  // Billing Fields Form state
  const [billingFirstName, setBillingFirstName] = useState("");
  const [billingLastName, setBillingLastName] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingPhone, setBillingPhone] = useState("");
  const [billingEmail, setBillingEmail] = useState("");
  const [orderComments, setOrderComments] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("cod"); // default cash on delivery

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Giỏ hàng của bạn đang trống!");
      navigate("/shop-grid-left");
      return;
    }

    if (
      !billingFirstName.trim() ||
      !billingLastName.trim() ||
      !billingAddress.trim() ||
      !billingCity.trim() ||
      !billingPhone.trim() ||
      !billingEmail.trim()
    ) {
      alert("Vui lòng nhập đầy đủ các trường thông tin bắt buộc (*)");
      return;
    }

    // Prepare order details
    const orderId = `ORD-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const orderData = {
      orderId,
      date: new Date().toLocaleDateString("vi-VN"),
      customer: {
        firstName: billingFirstName,
        lastName: billingLastName,
        address: billingAddress,
        city: billingCity,
        phone: billingPhone,
        email: billingEmail,
      },
      items: cartItems,
      total: cartTotal,
      paymentMethod: paymentMethod === "cod" ? "COD (Thanh toán khi nhận hàng)" : 
                     paymentMethod === "bacs" ? "Chuyển khoản ngân hàng" : 
                     paymentMethod === "cheque" ? "Thanh toán bằng Séc" : "PayPal",
      comments: orderComments,
    };

    // Save order details to localStorage
    localStorage.setItem("lastOrder", JSON.stringify(orderData));

    // Clear cart
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("cartUpdated"));

    // Redirect to checkout success page
    navigate("/checkout-success");
  };

  return (
    <>
      <div id="site-main" className="site-main">
        <div id="main-content" className="main-content">
          <div id="primary" className="content-area">
            <div id="title" className="page-title">
              <div className="section-container">
                <div className="content-title-heading">
                  <h1 className="text-title-heading">Checkout</h1>
                </div>
                <div className="breadcrumbs">
                  <a href="/">Home</a>
                  <span className="delimiter" />
                  <a href="/shop-grid-left">Shop</a>
                  <span className="delimiter" />
                  Checkout
                </div>
              </div>
            </div>
            <div id="content" className="site-content" role="main">
              <div className="section-padding">
                <div className="section-container p-l-r">
                  <div className="shop-checkout">
                    <form
                      name="checkout"
                      method="post"
                      className="checkout"
                      onSubmit={handleSubmit}
                      autoComplete="off"
                    >
                      <div className="row">
                        {/* LEFT COLUMN: BILLING & SHIPPING */}
                        <div className="col-xl-8 col-lg-7 col-md-12 col-12">
                          <div className="customer-details">
                            <div className="billing-fields">
                              <h3>Billing Details</h3>
                              <div className="billing-fields-wrapper">
                                <p className="form-row form-row-first validate-required">
                                  <label>
                                    First name{" "}
                                    <span className="required" title="required">
                                      *
                                    </span>
                                  </label>
                                  <span className="input-wrapper">
                                    <input
                                      type="text"
                                      required
                                      className="input-text"
                                      name="billing_first_name"
                                      value={billingFirstName}
                                      onChange={(e) => setBillingFirstName(e.target.value)}
                                    />
                                  </span>
                                </p>
                                <p className="form-row form-row-last validate-required">
                                  <label>
                                    Last name{" "}
                                    <span className="required" title="required">
                                      *
                                    </span>
                                  </label>
                                  <span className="input-wrapper">
                                    <input
                                      type="text"
                                      required
                                      className="input-text"
                                      name="billing_last_name"
                                      value={billingLastName}
                                      onChange={(e) => setBillingLastName(e.target.value)}
                                    />
                                  </span>
                                </p>
                                <p className="form-row form-row-wide">
                                  <label>
                                    Company name <span className="optional">(optional)</span>
                                  </label>
                                  <span className="input-wrapper">
                                    <input
                                      type="text"
                                      className="input-text"
                                      name="billing_company"
                                    />
                                  </span>
                                </p>
                                <p className="form-row form-row-wide validate-required">
                                  <label>
                                    Country / Region{" "}
                                    <span className="required" title="required">
                                      *
                                    </span>
                                  </label>
                                  <span className="input-wrapper">
                                    <select
                                      name="billing_country"
                                      className="country-select custom-select"
                                      defaultValue="VN"
                                    >
                                      <option value="VN">Vietnam</option>
                                      <option value="US">United States</option>
                                      <option value="JP">Japan</option>
                                    </select>
                                  </span>
                                </p>
                                <p className="form-row address-field validate-required form-row-wide">
                                  <label>
                                    Street address{" "}
                                    <span className="required" title="required">
                                      *
                                    </span>
                                  </label>
                                  <span className="input-wrapper">
                                    <input
                                      type="text"
                                      required
                                      className="input-text"
                                      name="billing_address_1"
                                      placeholder="House number and street name"
                                      value={billingAddress}
                                      onChange={(e) => setBillingAddress(e.target.value)}
                                    />
                                  </span>
                                </p>
                                <p className="form-row address-field validate-required form-row-wide">
                                  <label>
                                    Town / City{" "}
                                    <span className="required" title="required">
                                      *
                                    </span>
                                  </label>
                                  <span className="input-wrapper">
                                    <input
                                      type="text"
                                      required
                                      className="input-text"
                                      name="billing_city"
                                      value={billingCity}
                                      onChange={(e) => setBillingCity(e.target.value)}
                                    />
                                  </span>
                                </p>
                                <p className="form-row form-row-wide validate-required validate-phone">
                                  <label>
                                    Phone{" "}
                                    <span className="required" title="required">
                                      *
                                    </span>
                                  </label>
                                  <span className="input-wrapper">
                                    <input
                                      type="tel"
                                      required
                                      className="input-text"
                                      name="billing_phone"
                                      value={billingPhone}
                                      onChange={(e) => setBillingPhone(e.target.value)}
                                    />
                                  </span>
                                </p>
                                <p className="form-row form-row-wide validate-required validate-email">
                                  <label>
                                    Email address{" "}
                                    <span className="required" title="required">
                                      *
                                    </span>
                                  </label>
                                  <span className="input-wrapper">
                                    <input
                                      type="email"
                                      required
                                      className="input-text"
                                      name="billing_email"
                                      value={billingEmail}
                                      onChange={(e) => setBillingEmail(e.target.value)}
                                    />
                                  </span>
                                </p>
                              </div>
                            </div>
                            <div className="account-fields">
                              <p className="form-row form-row-wide">
                                <label className="checkbox" style={{ cursor: "pointer", display: "flex", gap: "8px", alignItems: "center" }}>
                                  <input
                                    className="input-checkbox"
                                    type="checkbox"
                                    name="createaccount"
                                    checked={createAccount}
                                    onChange={(e) => setCreateAccount(e.target.checked)}
                                  />
                                  <span>Create an account?</span>
                                </label>
                              </p>
                              <div className="create-account" style={{ display: createAccount ? "block" : "none" }}>
                                <p className="form-row validate-required">
                                  <label>
                                    Create account password{" "}
                                    <span className="required" title="required">
                                      *
                                    </span>
                                  </label>
                                  <span className="input-wrapper password-input">
                                    <input
                                      type="password"
                                      className="input-text"
                                      name="account_password"
                                      autoComplete="new-password"
                                    />
                                  </span>
                                </p>
                                <div className="clear" />
                              </div>
                            </div>
                          </div>
                          <div className="shipping-fields">
                            <p className="form-row form-row-wide ship-to-different-address">
                              <label className="checkbox" style={{ cursor: "pointer", display: "flex", gap: "8px", alignItems: "center" }}>
                                <input
                                  className="input-checkbox"
                                  type="checkbox"
                                  name="ship_to_different_address"
                                  checked={shipToDifferent}
                                  onChange={(e) => setShipToDifferent(e.target.checked)}
                                />
                                <span>Ship to a different address?</span>
                              </label>
                            </p>
                            <div className="shipping-address" style={{ display: shipToDifferent ? "block" : "none" }}>
                              <p className="form-row form-row-first validate-required">
                                <label>First name</label>
                                <span className="input-wrapper">
                                  <input type="text" className="input-text" name="shipping_first_name" />
                                </span>
                              </p>
                              <p className="form-row form-row-last validate-required">
                                <label>Last name</label>
                                <span className="input-wrapper">
                                  <input type="text" className="input-text" name="shipping_last_name" />
                                </span>
                              </p>
                              <p className="form-row address-field validate-required form-row-wide">
                                <label>Street address</label>
                                <span className="input-wrapper">
                                  <input
                                    type="text"
                                    className="input-text"
                                    name="shipping_address_1"
                                    placeholder="House number and street name"
                                  />
                                </span>
                              </p>
                              <p className="form-row address-field validate-required form-row-wide">
                                <label>Town / City</label>
                                <span className="input-wrapper">
                                  <input type="text" className="input-text" name="shipping_city" />
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className="additional-fields">
                            <p className="form-row notes">
                              <label>
                                Order notes <span className="optional">(optional)</span>
                              </label>
                              <span className="input-wrapper">
                                <textarea
                                  name="order_comments"
                                  className="input-text"
                                  placeholder="Notes about your order, e.g. special notes for delivery."
                                  rows={2}
                                  cols={5}
                                  value={orderComments}
                                  onChange={(e) => setOrderComments(e.target.value)}
                                />
                              </span>
                            </p>
                          </div>
                        </div>

                        {/* RIGHT COLUMN: ORDER REVIEW */}
                        <div className="col-xl-4 col-lg-5 col-md-12 col-12">
                          <div className="checkout-review-order">
                            <div className="checkout-review-order-table">
                              <h3 className="review-order-title">Product</h3>
                              <div className="cart-items">
                                {cartItems.map((item) => (
                                  <div key={item.id} className="cart-item">
                                    <div className="info-product">
                                      <div className="product-thumbnail">
                                        <img
                                          width={600}
                                          height={600}
                                          src={item.img}
                                          alt={item.name}
                                        />
                                      </div>
                                      <div className="product-name">
                                        {item.name}
                                        <strong className="product-quantity">
                                          QTY : {item.quantity}
                                        </strong>
                                      </div>
                                    </div>
                                    <div className="product-total">
                                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <div className="cart-subtotal">
                                <h2>Subtotal</h2>
                                <div className="subtotal-price">
                                  <span>${cartTotal.toFixed(2)}</span>
                                </div>
                              </div>
                              <div className="shipping-totals shipping">
                                <h2>Shipping</h2>
                                <div data-title="Shipping">
                                  <ul className="shipping-methods custom-radio">
                                    <li>
                                      <label>Free shipping</label>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="order-total">
                                <h2>Total</h2>
                                <div className="total-price">
                                  <strong>
                                    <span>${cartTotal.toFixed(2)}</span>
                                  </strong>
                                </div>
                              </div>
                            </div>
                            <div id="payment" className="checkout-payment">
                              <ul className="payment-methods methods custom-radio">
                                <li className="payment-method">
                                  <input
                                    type="radio"
                                    className="input-radio"
                                    name="payment_method"
                                    value="cod"
                                    checked={paymentMethod === "cod"}
                                    onChange={() => setPaymentMethod("cod")}
                                  />
                                  <label onClick={() => setPaymentMethod("cod")} style={{ cursor: "pointer" }}>Cash on delivery</label>
                                  <div className="payment-box" style={{ display: paymentMethod === "cod" ? "block" : "none" }}>
                                    <p>Pay with cash upon delivery.</p>
                                  </div>
                                </li>
                                <li className="payment-method">
                                  <input
                                    type="radio"
                                    className="input-radio"
                                    name="payment_method"
                                    value="bacs"
                                    checked={paymentMethod === "bacs"}
                                    onChange={() => setPaymentMethod("bacs")}
                                  />
                                  <label onClick={() => setPaymentMethod("bacs")} style={{ cursor: "pointer" }}>Direct bank transfer</label>
                                  <div className="payment-box" style={{ display: paymentMethod === "bacs" ? "block" : "none" }}>
                                    <p>
                                      Make your payment directly into our bank account. Please use your Order ID as the payment reference.
                                    </p>
                                  </div>
                                </li>
                                <li className="payment-method">
                                  <input
                                    type="radio"
                                    className="input-radio"
                                    name="payment_method"
                                    value="paypal"
                                    checked={paymentMethod === "paypal"}
                                    onChange={() => setPaymentMethod("paypal")}
                                  />
                                  <label onClick={() => setPaymentMethod("paypal")} style={{ cursor: "pointer" }}>PayPal</label>
                                  <div className="payment-box" style={{ display: paymentMethod === "paypal" ? "block" : "none" }}>
                                    <p>Pay via PayPal; you can pay with credit cards.</p>
                                  </div>
                                </li>
                              </ul>
                              <div className="form-row place-order">
                                <button
                                  type="submit"
                                  className="button alt"
                                  name="checkout_place_order"
                                  value="Place order"
                                >
                                  Place order
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}