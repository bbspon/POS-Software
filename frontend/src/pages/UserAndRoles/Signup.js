import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../../services/axiosInstance";
function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const response = await api.post("/api/auth/signup", formData);
      if (response.data.success) {
        setMessage("Signup successful!");
        setTimeout(() => {
          navigate("/login"); // Navigate to login after signup
        }, 1000); // 1 second delay for user feedback
      } else {
        setError(response.data.message || "Signup failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  const handleGoogleSignUp = () => {
    console.log("Google signup clicked!");
    // Add logic for Google signup
  };

  const handleFacebookSignUp = () => {
    console.log("Facebook signup clicked!");
    // Add logic for Facebook signup
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Sign Up</h2>

        {error && <p style={styles.error}>{error}</p>}
        {message && <p style={styles.success}>{message}</p>}

        <div style={styles.nameform}>
          <div style={styles.formGroup}>
            <label style={styles.label}>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              style={styles.input}
              placeholder="First Name"
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              style={styles.input}
              placeholder="Last Name"
            />
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            placeholder="Email"
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Mobile</label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            style={styles.input}
            placeholder="Mobile"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            placeholder="Password"
            required
          />
        </div>

        <button type="submit" style={styles.button}>
          Create Account
        </button>

        <p style={styles.orText}>or sign up with</p>

        <div style={styles.socialButtons}>
          <button
            type="button"
            onClick={handleGoogleSignUp}
            style={{ ...styles.socialButton, backgroundColor: "#DB4437" }}
          >
            <i className="fab fa-google" style={styles.icon}></i> Google
          </button>

          <button
            type="button"
            onClick={handleFacebookSignUp}
            style={{ ...styles.socialButton, backgroundColor: "#3b5998" }}
          >
            <i className="fab fa-facebook-f" style={styles.icon}></i> Facebook
          </button>
        </div>

        <p style={styles.footerText}>
          Already have an account?{" "}
          <a
            href="/login"
            onClick={() => navigate("/login")}
            style={styles.link}
          >
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
}

export default SignUp;

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f8f9fa",
    padding: "40px",

    paddingTop: "50px",
  },
  form: {
    backgroundColor: "#fff",
    padding: "30px",
    paddingTop: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    width: "100%",
    height: "80%",
    maxWidth: "500px",
    boxSizing: "border-box",
    overflowY: "scroll",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    color: "#343a40",
  },

  nameform: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "15px",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontSize: "14px",
    color: "#495057",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ced4da",
    borderRadius: "5px",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  orText: {
    textAlign: "center",
    margin: "15px 0",
    fontSize: "14px",
    color: "#888",
  },
  socialButtons: {
    display: "flex",
    justifyContent: "space-between",
  },
  socialButton: {
    width: "48%",
    padding: "10px",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "14px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginRight: "8px",
  },
  footerText: {
    marginTop: "20px",
    textAlign: "center",
    fontSize: "14px",
    color: "#495057",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: "10px",
  },
  success: {
    color: "green",
    textAlign: "center",
    marginBottom: "10px",
  },
};
