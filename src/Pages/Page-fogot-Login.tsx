import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function FogotLogin() {
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/my-account");
    }
  }, [navigate]);

  // Form States
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  // Status States
  const [error, setError] = useState<string | null>(null);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Đăng nhập thất bại");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Đăng nhập không thành công. Vui lòng kiểm tra lại.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: registerName,
          email: registerEmail,
          password: registerPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Đăng ký thất bại");
      }

      setSuccess("Đăng ký tài khoản thành công! Bây giờ bạn có thể đăng nhập.");
      setRegisterName("");
      setRegisterEmail("");
      setRegisterPassword("");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Đăng ký không thành công. Vui lòng thử lại.";
      setRegisterError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div id="site-main" className="site-main">
        <div id="main-content" className="main-content">
          <div id="primary" className="content-area">
            <div id="title" className="page-title">
              <div className="section-container">
                <div className="content-title-heading">
                  <h1 className="text-title-heading">Login / Register</h1>
                </div>
                <div className="breadcrumbs">
                  <a href="/">Home</a>
                  <span className="delimiter" />
                  Login / Register
                </div>
              </div>
            </div>
            <div id="content" className="site-content" role="main">
              <div className="section-padding">
                <div className="section-container p-l-r">
                  <div className="page-login-register">
                    <div className="row justify-content-center">
                      {!isRegisterMode ? (
                        <div className="col-lg-6 col-md-8 col-sm-12">
                          <div className="box-form-login">
                            <h2>Login</h2>
                            {error && (
                              <div className="alert alert-danger" style={{ padding: "10px", marginBottom: "15px" }}>
                                {error}
                              </div>
                            )}
                            <div className="box-content">
                              <div className="form-login">
                                <form onSubmit={handleLoginSubmit} className="login">
                                  <div className="username">
                                    <label>
                                      Email address <span className="required">*</span>
                                    </label>
                                    <input
                                      type="email"
                                      required
                                      className="input-text"
                                      name="username"
                                      id="username"
                                      value={loginEmail}
                                      onChange={(e) => setLoginEmail(e.target.value)}
                                    />
                                  </div>
                                  <div className="password">
                                    <label htmlFor="password">
                                      Password <span className="required">*</span>
                                    </label>
                                    <input
                                      required
                                      className="input-text"
                                      type="password"
                                      name="password"
                                      value={loginPassword}
                                      onChange={(e) => setLoginPassword(e.target.value)}
                                    />
                                  </div>
                                  <div className="rememberme-lost">
                                    <div className="remember-me">
                                      <input
                                        name="rememberme"
                                        type="checkbox"
                                        defaultValue="forever"
                                      />
                                      <label className="inline">Remember me</label>
                                    </div>
                                    <div className="lost-password">
                                      <a href="/forgot-password">
                                        Lost your password?
                                      </a>
                                    </div>
                                  </div>
                                  <div className="button-login" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                    <button
                                      type="submit"
                                      className="button"
                                      disabled={loading}
                                      style={{ opacity: loading ? 0.7 : 1 }}
                                    >
                                      {loading ? "Logging in..." : "Login"}
                                    </button>
                                    <div 
                                      onClick={() => setIsRegisterMode(true)}
                                      style={{ 
                                        textAlign: "center", 
                                        marginTop: "15px", 
                                        cursor: "pointer", 
                                        textDecoration: "underline",
                                        fontWeight: "500",
                                        color: "#d2691e"
                                      }}
                                    >
                                      Don't have an account? Register here
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="col-lg-6 col-md-8 col-sm-12">
                          <div className="box-form-login">
                            <h2 className="register">Register</h2>
                            {registerError && (
                              <div className="alert alert-danger" style={{ padding: "10px", marginBottom: "15px" }}>
                                {registerError}
                              </div>
                            )}
                            {success && (
                              <div className="alert alert-success" style={{ padding: "10px", marginBottom: "15px" }}>
                                {success}
                              </div>
                            )}
                            <div className="box-content">
                              <div className="form-register">
                                <form onSubmit={handleRegisterSubmit} className="register">
                                  <div className="name">
                                    <label>
                                      Full Name <span className="required">*</span>
                                    </label>
                                    <input
                                      type="text"
                                      required
                                      className="input-text"
                                      name="name"
                                      value={registerName}
                                      onChange={(e) => setRegisterName(e.target.value)}
                                    />
                                  </div>
                                  <div className="email">
                                    <label>
                                      Email address <span className="required">*</span>
                                    </label>
                                    <input
                                      type="email"
                                      required
                                      className="input-text"
                                      name="email"
                                      value={registerEmail}
                                      onChange={(e) => setRegisterEmail(e.target.value)}
                                    />
                                  </div>
                                  <div className="password">
                                    <label>
                                      Password <span className="required">*</span>
                                    </label>
                                    <input
                                      type="password"
                                      required
                                      className="input-text"
                                      name="password"
                                      value={registerPassword}
                                      onChange={(e) => setRegisterPassword(e.target.value)}
                                    />
                                  </div>
                                  <div className="button-register" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                    <button
                                      type="submit"
                                      className="button"
                                      disabled={loading}
                                      style={{ opacity: loading ? 0.7 : 1 }}
                                    >
                                      {loading ? "Registering..." : "Register"}
                                    </button>
                                    <div 
                                      onClick={() => setIsRegisterMode(false)}
                                      style={{ 
                                        textAlign: "center", 
                                        marginTop: "15px", 
                                        cursor: "pointer", 
                                        textDecoration: "underline",
                                        fontWeight: "500",
                                        color: "#d2691e"
                                      }}
                                    >
                                      Already have an account? Sign in
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* #content */}
          </div>
          {/* #primary */}
        </div>
        {/* #main-content */}
      </div>
    </>
  );
}