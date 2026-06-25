import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckoutSuccess() {
  const navigate = useNavigate();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const orderStr = localStorage.getItem("lastOrder");
    if (orderStr) {
      try {
        setOrder(JSON.parse(orderStr));
      } catch {
        // ignore
      }
    }
  }, []);

  if (!order) {
    return (
      <div style={{ padding: "100px 0", textAlign: "center" }}>
        <h3>Không tìm thấy thông tin đơn hàng!</h3>
        <button 
          onClick={() => navigate("/")} 
          style={{ marginTop: "20px", padding: "10px 20px", backgroundColor: "#333", color: "#fff", border: "none", cursor: "pointer" }}
        >
          Quay lại trang chủ
        </button>
      </div>
    );
  }

  return (
    <div id="site-main" className="site-main">
      <div id="main-content" className="main-content">
        <div id="primary" className="content-area">
          <div id="content" className="site-content" role="main">
            <div className="section-padding">
              <div className="section-container" style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px", backgroundColor: "#ffffff", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", borderRadius: "4px" }}>
                
                {/* Header Success Section */}
                <div style={{ textAlign: "center", marginBottom: "40px" }}>
                  <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "80px", height: "80px", borderRadius: "50%", backgroundColor: "#e6f7ff", marginBottom: "20px" }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2b929f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <h2 style={{ fontSize: "28px", color: "#2b929f", fontWeight: "bold", margin: "0 0 10px 0" }}>Đặt Hàng Thành Công!</h2>
                  <p style={{ color: "#666666", fontSize: "15px", margin: "0" }}>Cảm ơn bạn đã mua sắm tại Mojuri. Đơn hàng của bạn đã được tiếp nhận và đang xử lý.</p>
                </div>

                {/* Summary Box */}
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "15px", backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "4px", marginBottom: "30px", border: "1px solid #eeeeee" }}>
                  <div>
                    <span style={{ fontSize: "12px", color: "#999999", textTransform: "uppercase", display: "block" }}>Mã đơn hàng</span>
                    <strong style={{ fontSize: "14px", color: "#000000" }}>{order.orderId}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: "12px", color: "#999999", textTransform: "uppercase", display: "block" }}>Ngày đặt</span>
                    <strong style={{ fontSize: "14px", color: "#000000" }}>{order.date}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: "12px", color: "#999999", textTransform: "uppercase", display: "block" }}>Phương thức thanh toán</span>
                    <strong style={{ fontSize: "14px", color: "#000000" }}>{order.paymentMethod}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: "12px", color: "#999999", textTransform: "uppercase", display: "block" }}>Tổng cộng</span>
                    <strong style={{ fontSize: "16px", color: "#d2691e", fontWeight: "bold" }}>${order.total.toFixed(2)}</strong>
                  </div>
                </div>

                {/* Grid for Shipping Info and Order Comments */}
                <div className="row" style={{ marginBottom: "30px" }}>
                  <div className="col-md-6 col-12" style={{ marginBottom: "20px" }}>
                    <h4 style={{ borderBottom: "2px solid #2b929f", paddingBottom: "8px", marginBottom: "15px", fontWeight: "bold", color: "#000000" }}>Thông Tin Giao Hàng</h4>
                    <p style={{ margin: "4px 0", color: "#333333" }}><strong>Họ tên:</strong> {order.customer.lastName} {order.customer.firstName}</p>
                    <p style={{ margin: "4px 0", color: "#333333" }}><strong>Số điện thoại:</strong> {order.customer.phone}</p>
                    <p style={{ margin: "4px 0", color: "#333333" }}><strong>Địa chỉ:</strong> {order.customer.address}, {order.customer.city}</p>
                    <p style={{ margin: "4px 0", color: "#333333" }}><strong>Email:</strong> {order.customer.email}</p>
                  </div>
                  <div className="col-md-6 col-12" style={{ marginBottom: "20px" }}>
                    <h4 style={{ borderBottom: "2px solid #2b929f", paddingBottom: "8px", marginBottom: "15px", fontWeight: "bold", color: "#000000" }}>Ghi Chú Đơn Hàng</h4>
                    <p style={{ color: "#555555", fontStyle: order.comments ? "normal" : "italic" }}>
                      {order.comments || "Không có ghi chú nào cho đơn hàng này."}
                    </p>
                  </div>
                </div>

                {/* Items details table */}
                <h4 style={{ borderBottom: "2px solid #2b929f", paddingBottom: "8px", marginBottom: "15px", fontWeight: "bold", color: "#000000" }}>Chi Tiết Sản Phẩm</h4>
                <div className="table-responsive" style={{ marginBottom: "40px" }}>
                  <table className="table" style={{ width: "100%" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid #eeeeee" }}>
                        <th style={{ padding: "10px 0", textAlign: "left", color: "#666666" }}>Sản phẩm</th>
                        <th style={{ padding: "10px 0", textAlign: "center", color: "#666666" }}>Đơn giá</th>
                        <th style={{ padding: "10px 0", textAlign: "center", color: "#666666" }}>Số lượng</th>
                        <th style={{ padding: "10px 0", textAlign: "right", color: "#666666" }}>Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item: any) => (
                        <tr key={item.id} style={{ borderBottom: "1px solid #f9f9f9" }}>
                          <td style={{ padding: "15px 0", display: "flex", alignItems: "center", gap: "15px" }}>
                            <img src={item.img} alt={item.name} style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "2px", border: "1px solid #eee" }} />
                            <span style={{ color: "#000000", fontWeight: "500" }}>{item.name}</span>
                          </td>
                          <td style={{ padding: "15px 0", textAlign: "center", color: "#333333" }}>${item.price.toFixed(2)}</td>
                          <td style={{ padding: "15px 0", textAlign: "center", color: "#333333" }}>{item.quantity}</td>
                          <td style={{ padding: "15px 0", textAlign: "right", fontWeight: "bold", color: "#000" }}>${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Continue Shopping Buttons */}
                <div style={{ textAlign: "center" }}>
                  <button 
                    onClick={() => navigate("/shop-grid-left")} 
                    style={{ 
                      padding: "12px 30px", 
                      backgroundColor: "#2b929f", 
                      color: "#ffffff", 
                      border: "none", 
                      borderRadius: "2px", 
                      fontSize: "14px", 
                      fontWeight: "bold", 
                      cursor: "pointer", 
                      textTransform: "uppercase",
                      boxShadow: "0 4px 10px rgba(43, 146, 159, 0.2)"
                    }}
                  >
                    Tiếp tục mua sắm
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
