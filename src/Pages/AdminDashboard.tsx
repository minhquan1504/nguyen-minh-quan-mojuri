import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  salePrice?: number;
  stock: number;
  description: string;
  thumbnail: string;
  slug?: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
};

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"products" | "users" | "contacts">("products");

  // Data states
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);

  // Loading/Error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form states (for Add/Edit product)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [prodName, setProdName] = useState("");
  const [prodCategory, setProdCategory] = useState("Earrings");
  const [prodPrice, setProdPrice] = useState("");
  const [prodSalePrice, setProdSalePrice] = useState("");
  const [prodStock, setProdStock] = useState("");
  const [prodDesc, setProdDesc] = useState("");
  const [prodThumbnail, setProdThumbnail] = useState("");

  // Authenticate Admin
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      navigate("/login");
      return;
    }
    try {
      const user = JSON.parse(userStr);
      if (user?.role !== "admin") {
        navigate("/");
      }
    } catch {
      navigate("/login");
    }
  }, [navigate]);

  const fetchTabData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (activeTab === "products") {
        const res = await fetch("http://localhost:3000/api/products?limit=100");
        const data = await res.json();
        if (res.ok) setProducts(data.items || []);
      } else if (activeTab === "users") {
        const res = await fetch("http://localhost:3000/api/users");
        const data = await res.json();
        if (res.ok) setUsers(data.items || []);
      } else if (activeTab === "contacts") {
        const res = await fetch("http://localhost:3000/api/contacts");
        const data = await res.json();
        if (res.ok) setContacts(data.items || []);
      }
    } catch {
      setError("Không thể kết nối đến máy chủ API.");
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  // Load active tab data
  useEffect(() => {
    fetchTabData();
  }, [fetchTabData]);

  // Product actions
  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setProdName("");
    setProdCategory("Earrings");
    setProdPrice("");
    setProdSalePrice("");
    setProdStock("");
    setProdDesc("");
    setProdThumbnail("/media/product/1.jpg");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setProdName(product.name);
    setProdCategory(product.category);
    setProdPrice(product.price.toString());
    setProdSalePrice(product.salePrice ? product.salePrice.toString() : "");
    setProdStock(product.stock.toString());
    setProdDesc(product.description);
    setProdThumbnail(product.thumbnail);
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);

    const payload = {
      name: prodName,
      category: prodCategory,
      price: Number(prodPrice),
      salePrice: prodSalePrice ? Number(prodSalePrice) : undefined,
      stock: Number(prodStock),
      description: prodDesc,
      thumbnail: prodThumbnail,
    };

    try {
      let res;
      if (editingProduct) {
        // Edit Product
        res = await fetch(`http://localhost:3000/api/products/${editingProduct.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        // Add Product
        res = await fetch("http://localhost:3000/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Lưu sản phẩm thất bại.");
      }

      setSuccess(editingProduct ? "Cập nhật sản phẩm thành công!" : "Thêm sản phẩm thành công!");
      setIsModalOpen(false);
      fetchTabData();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Lỗi khi lưu sản phẩm.";
      setError(message);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;
    setSuccess(null);
    setError(null);
    try {
      const res = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setSuccess("Xóa sản phẩm thành công!");
        fetchTabData();
      } else {
        setError("Không thể xóa sản phẩm.");
      }
    } catch {
      setError("Lỗi khi xóa sản phẩm.");
    }
  };

  // User actions
  const handleDeleteUser = async (id: string) => {
    if (id === "user_admin") return;
    if (!window.confirm("Bạn có chắc chắn muốn xóa tài khoản này?")) return;
    setSuccess(null);
    setError(null);
    try {
      const res = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setSuccess("Xóa tài khoản thành công!");
        fetchTabData();
      } else {
        setError("Không thể xóa tài khoản.");
      }
    } catch {
      setError("Lỗi khi xóa tài khoản.");
    }
  };

  return (
    <div id="site-main" className="site-main">
      <div id="main-content" className="main-content">
        <div id="primary" className="content-area">
          <div className="page-title" style={{ background: "#f8f9fa", padding: "40px 0 20px" }}>
            <div className="section-container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 15px" }}>
              <h1 style={{ fontSize: "28px", fontWeight: "600", color: "#222", marginBottom: "5px" }}>
                Admin Dashboard
              </h1>
              <div style={{ color: "#777", fontSize: "14px" }}>
                Hệ thống quản lý cửa hàng trang sức Mojuri
              </div>
            </div>
          </div>

          <div className="site-content" style={{ padding: "40px 0" }}>
            <div className="section-container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 15px" }}>
              
              {/* Tab Navigation */}
              <div style={{ display: "flex", borderBottom: "1px solid #ddd", marginBottom: "30px", gap: "20px" }}>
                <button
                  onClick={() => setActiveTab("products")}
                  style={{
                    padding: "12px 20px",
                    background: "none",
                    border: "none",
                    borderBottom: activeTab === "products" ? "3px solid #d2691e" : "3px solid transparent",
                    fontWeight: "600",
                    color: activeTab === "products" ? "#d2691e" : "#555",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    fontSize: "16px"
                  }}
                >
                  Quản lý Sản phẩm
                </button>
                <button
                  onClick={() => setActiveTab("users")}
                  style={{
                    padding: "12px 20px",
                    background: "none",
                    border: "none",
                    borderBottom: activeTab === "users" ? "3px solid #d2691e" : "3px solid transparent",
                    fontWeight: "600",
                    color: activeTab === "users" ? "#d2691e" : "#555",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    fontSize: "16px"
                  }}
                >
                  Quản lý Tài khoản
                </button>
                <button
                  onClick={() => setActiveTab("contacts")}
                  style={{
                    padding: "12px 20px",
                    background: "none",
                    border: "none",
                    borderBottom: activeTab === "contacts" ? "3px solid #d2691e" : "3px solid transparent",
                    fontWeight: "600",
                    color: activeTab === "contacts" ? "#d2691e" : "#555",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    fontSize: "16px"
                  }}
                >
                  Khách hàng Liên hệ ({contacts.length})
                </button>
              </div>

              {/* Status Alerts */}
              {success && (
                <div className="alert alert-success" style={{ padding: "12px", marginBottom: "20px", borderRadius: "4px" }}>
                  {success}
                </div>
              )}
              {error && (
                <div className="alert alert-danger" style={{ padding: "12px", marginBottom: "20px", borderRadius: "4px" }}>
                  {error}
                </div>
              )}

              {/* Main Content Area */}
              {loading ? (
                <div style={{ textAlign: "center", padding: "50px 0", color: "#777" }}>
                  Đang tải dữ liệu...
                </div>
              ) : (
                <>
                  {/* PRODUCTS TAB */}
                  {activeTab === "products" && (
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                        <h3 style={{ fontSize: "20px", fontWeight: "600" }}>Danh sách Sản phẩm</h3>
                        <button
                          onClick={handleOpenAddModal}
                          style={{
                            background: "#222",
                            color: "#fff",
                            border: "none",
                            padding: "10px 20px",
                            fontWeight: "600",
                            borderRadius: "4px",
                            cursor: "pointer"
                          }}
                        >
                          + Thêm sản phẩm
                        </button>
                      </div>

                      <div className="table-responsive" style={{ border: "1px solid #eee", borderRadius: "4px" }}>
                        <table className="table" style={{ width: "100%", borderCollapse: "collapse" }}>
                          <thead style={{ background: "#f9f9f9" }}>
                            <tr style={{ borderBottom: "2px solid #eee" }}>
                              <th style={{ padding: "12px", textAlign: "left" }}>Hình ảnh</th>
                              <th style={{ padding: "12px", textAlign: "left" }}>Tên sản phẩm</th>
                              <th style={{ padding: "12px", textAlign: "left" }}>Danh mục</th>
                              <th style={{ padding: "12px", textAlign: "left" }}>Giá gốc</th>
                              <th style={{ padding: "12px", textAlign: "left" }}>Giá khuyến mãi</th>
                              <th style={{ padding: "12px", textAlign: "left" }}>Kho hàng</th>
                              <th style={{ padding: "12px", textAlign: "center" }}>Hành động</th>
                            </tr>
                          </thead>
                          <tbody>
                            {products.length === 0 ? (
                              <tr>
                                <td colSpan={7} style={{ textAlign: "center", padding: "20px", color: "#777" }}>
                                  Chưa có sản phẩm nào.
                                </td>
                              </tr>
                            ) : (
                              products.map((prod) => (
                                <tr key={prod.id} style={{ borderBottom: "1px solid #eee" }}>
                                  <td style={{ padding: "12px" }}>
                                    <img
                                      src={prod.thumbnail}
                                      alt={prod.name}
                                      style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "4px" }}
                                    />
                                  </td>
                                  <td style={{ padding: "12px", fontWeight: "600" }}>{prod.name}</td>
                                  <td style={{ padding: "12px" }}>{prod.category}</td>
                                  <td style={{ padding: "12px" }}>${prod.price.toFixed(2)}</td>
                                  <td style={{ padding: "12px", color: "#d2691e" }}>
                                    {prod.salePrice ? `$${prod.salePrice.toFixed(2)}` : "-"}
                                  </td>
                                  <td style={{ padding: "12px" }}>{prod.stock}</td>
                                  <td style={{ padding: "12px", textAlign: "center" }}>
                                    <button
                                      onClick={() => handleOpenEditModal(prod)}
                                      style={{
                                        background: "#f0ad4e",
                                        color: "#fff",
                                        border: "none",
                                        padding: "6px 12px",
                                        borderRadius: "4px",
                                        marginRight: "8px",
                                        cursor: "pointer",
                                        fontWeight: "600"
                                      }}
                                    >
                                      Sửa
                                    </button>
                                    <button
                                      onClick={() => handleDeleteProduct(prod.id)}
                                      style={{
                                        background: "#d9534f",
                                        color: "#fff",
                                        border: "none",
                                        padding: "6px 12px",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                        fontWeight: "600"
                                      }}
                                    >
                                      Xóa
                                    </button>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* USERS TAB */}
                  {activeTab === "users" && (
                    <div>
                      <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "20px" }}>Danh sách Tài khoản</h3>
                      <div className="table-responsive" style={{ border: "1px solid #eee", borderRadius: "4px" }}>
                        <table className="table" style={{ width: "100%", borderCollapse: "collapse" }}>
                          <thead style={{ background: "#f9f9f9" }}>
                            <tr style={{ borderBottom: "2px solid #eee" }}>
                              <th style={{ padding: "12px", textAlign: "left" }}>User ID</th>
                              <th style={{ padding: "12px", textAlign: "left" }}>Tên người dùng</th>
                              <th style={{ padding: "12px", textAlign: "left" }}>Email</th>
                              <th style={{ padding: "12px", textAlign: "left" }}>Vai trò</th>
                              <th style={{ padding: "12px", textAlign: "left" }}>Ngày tạo</th>
                              <th style={{ padding: "12px", textAlign: "center" }}>Hành động</th>
                            </tr>
                          </thead>
                          <tbody>
                            {users.map((user) => (
                              <tr key={user.id} style={{ borderBottom: "1px solid #eee" }}>
                                <td style={{ padding: "12px", color: "#777", fontFamily: "monospace" }}>{user.id}</td>
                                <td style={{ padding: "12px", fontWeight: "600" }}>{user.name}</td>
                                <td style={{ padding: "12px" }}>{user.email}</td>
                                <td style={{ padding: "12px" }}>
                                  <span
                                    style={{
                                      background: user.role === "admin" ? "#d9534f" : "#5bc0de",
                                      color: "#fff",
                                      padding: "3px 8px",
                                      borderRadius: "10px",
                                      fontSize: "12px",
                                      fontWeight: "600"
                                    }}
                                  >
                                    {user.role}
                                  </span>
                                </td>
                                <td style={{ padding: "12px" }}>{new Date(user.createdAt).toLocaleDateString()}</td>
                                <td style={{ padding: "12px", textAlign: "center" }}>
                                  <button
                                    onClick={() => handleDeleteUser(user.id)}
                                    disabled={user.role === "admin"}
                                    style={{
                                      background: user.role === "admin" ? "#ccc" : "#d9534f",
                                      color: "#fff",
                                      border: "none",
                                      padding: "6px 12px",
                                      borderRadius: "4px",
                                      cursor: user.role === "admin" ? "not-allowed" : "pointer",
                                      fontWeight: "600"
                                    }}
                                  >
                                    Xóa
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* CONTACT MESSAGES TAB */}
                  {activeTab === "contacts" && (
                    <div>
                      <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "20px" }}>Danh sách Tin nhắn Liên hệ</h3>
                      <div className="table-responsive" style={{ border: "1px solid #eee", borderRadius: "4px" }}>
                        <table className="table" style={{ width: "100%", borderCollapse: "collapse" }}>
                          <thead style={{ background: "#f9f9f9" }}>
                            <tr style={{ borderBottom: "2px solid #eee" }}>
                              <th style={{ padding: "12px", textAlign: "left" }}>Họ tên</th>
                              <th style={{ padding: "12px", textAlign: "left" }}>Email</th>
                              <th style={{ padding: "12px", textAlign: "left" }}>Chủ đề</th>
                              <th style={{ padding: "12px", textAlign: "left" }}>Nội dung khiếu nại / liên hệ</th>
                              <th style={{ padding: "12px", textAlign: "left" }}>Thời gian</th>
                            </tr>
                          </thead>
                          <tbody>
                            {contacts.length === 0 ? (
                              <tr>
                                <td colSpan={5} style={{ textAlign: "center", padding: "20px", color: "#777" }}>
                                  Chưa nhận được tin nhắn liên hệ nào.
                                </td>
                              </tr>
                            ) : (
                              contacts.map((msg) => (
                                <tr key={msg.id} style={{ borderBottom: "1px solid #eee" }}>
                                  <td style={{ padding: "12px", fontWeight: "600" }}>{msg.name}</td>
                                  <td style={{ padding: "12px" }}>{msg.email}</td>
                                  <td style={{ padding: "12px", fontStyle: "italic" }}>{msg.subject}</td>
                                  <td style={{ padding: "12px", color: "#444", maxWidth: "400px", wordBreak: "break-all" }}>
                                    {msg.message}
                                  </td>
                                  <td style={{ padding: "12px", color: "#777" }}>
                                    {new Date(msg.createdAt).toLocaleString()}
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Add/Edit Product */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "8px",
              width: "100%",
              maxWidth: "600px",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 5px 15px rgba(0,0,0,0.3)"
            }}
          >
            <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "20px", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>
              {editingProduct ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}
            </h3>
            
            <form onSubmit={handleSaveProduct}>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>Tên sản phẩm *</label>
                <input
                  type="text"
                  required
                  value={prodName}
                  onChange={(e) => setProdName(e.target.value)}
                  style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
                />
              </div>

              <div style={{ display: "flex", gap: "15px", marginBottom: "15px" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>Danh mục *</label>
                  <select
                    value={prodCategory}
                    onChange={(e) => setProdCategory(e.target.value)}
                    style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
                  >
                    <option value="Rings">Rings</option>
                    <option value="Necklaces">Necklaces</option>
                    <option value="Earrings">Earrings</option>
                    <option value="Bracelets">Bracelets</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>Số lượng kho *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={prodStock}
                    onChange={(e) => setProdStock(e.target.value)}
                    style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "15px", marginBottom: "15px" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>Giá gốc ($) *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    step="0.01"
                    value={prodPrice}
                    onChange={(e) => setProdPrice(e.target.value)}
                    style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>Giá khuyến mãi ($)</label>
                  <input
                    type="number"
                    min={0}
                    step="0.01"
                    value={prodSalePrice}
                    onChange={(e) => setProdSalePrice(e.target.value)}
                    style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>URL Hình ảnh đại diện</label>
                <input
                  type="text"
                  value={prodThumbnail}
                  onChange={(e) => setProdThumbnail(e.target.value)}
                  style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>Mô tả sản phẩm *</label>
                <textarea
                  required
                  rows={4}
                  value={prodDesc}
                  onChange={(e) => setProdDesc(e.target.value)}
                  style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", borderTop: "1px solid #eee", paddingTop: "15px" }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    background: "#aaa",
                    color: "#fff",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "4px",
                    fontWeight: "600",
                    cursor: "pointer"
                  }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  style={{
                    background: "#d2691e",
                    color: "#fff",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "4px",
                    fontWeight: "600",
                    cursor: "pointer"
                  }}
                >
                  Lưu lại
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
