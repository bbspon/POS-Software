import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import api from "../../services/axiosInstance";

function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { email, password } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await api.post("/api/auth/login", { email, password });
      if (response.data.success && response.data.token) {
        localStorage.setItem("admin_token", response.data.token);
        navigate("/"); // Change to your admin dashboard route
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const handleGoogleSignIn = () => {
    console.log("Google Sign-In clicked!");
    navigate("/google-auth"); // Example navigation for Google OAuth
  };

  return (
    <>
      <div style={styles.logInContainer}>
        <Sidebar />
        <div style={styles.signInContainer}>
          <div style={styles.signInBox}>
            <h2 style={styles.h2}>Sign In</h2>
            {error && <p style={styles.error}>{error}</p>}
            <form onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label htmlFor="email" style={styles.label}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="password" style={styles.label}>
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>

              <button type="submit" style={styles.submitBtn}>
                Sign In
              </button>
            </form>

            <p style={styles.p}>or</p>

            <p style={styles.p}>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                style={{
                  ...styles.submitBtn,
                  backgroundColor: "#fff",
                  color: "#555",
                  border: "1px solid #ddd",
                }}
              >
                Sign in with Google
              </button>
            </p>

            <p style={styles.p}>
              Don’t have an account?{" "}
              <a
                href="/signup"
                onClick={() => navigate("/signup")}
                style={styles.a}
              >
                Create Account
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;

const styles = {
  logInContainer: {
    display: "flex",
    width: "100vw",
    height: "100vh",
  },
  signInContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    backgroundColor: "#f0f2f5",
    padding: "0 10px",
  },
  signInBox: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
    boxSizing: "border-box",
  },
  h2: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    color: "#131921",
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    fontSize: "14px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    fontSize: "16px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    boxSizing: "border-box",
  },
  submitBtn: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#f0c14b",
    border: "1px solid #a88734",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    color: "#111",
    transition: "background-color 0.3s ease",
  },
  p: {
    textAlign: "center",
    fontSize: "14px",
  },
  a: {
    color: "#007bff",
    textDecoration: "none",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px",
    textAlign: "center",
  },
};
