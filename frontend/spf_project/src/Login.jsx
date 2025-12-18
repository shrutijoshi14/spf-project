// /



import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // 🟩 CHANGED: make handleSubmit async to call backend API
  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    // Username validation
    if (!username.trim()) {
      newErrors.username = "Username is required";
    } else if (username.length < 5) {
      newErrors.username = "Username must be at least 5 characters";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);


    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch("http://localhost:5000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        // if (response.ok) {
        //   alert(`✅ ${data.message}`);
        //   navigate("/maindashboard"); // successful login
        // } else {
        //   alert(`❌ ${data.message}`);
        // }

        if (response.ok) {
          alert(`✅ ${data.message}`);
          localStorage.setItem("isAuthenticated", "true"); // ✅ user logged in
          navigate("/maindashboard");
        } else {
          alert(`❌ ${data.message}`);
        }



      } catch (error) {
        alert("⚠️ Unable to connect to server. Please try again later.");
        console.error("Login error:", error);
      }
    }
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center">
      <div className="login-card shadow p-4 rounded" style={{ width: "350px" }}>
        <img
          className="logo-circle"
          // 🟩 CHANGED: fix image path
          src="src\assets\WhatsApp Image 2025-09-17 at 3.09.47 PM.png"
          alt="Logo"
        />
        <h4 className="login-text text-center mb-3">Login</h4>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && (
              <small className="text-danger">{errors.username}</small>
            )}
          </div>

          {/* Password */}
          <div className="mb-3 position-relative">
            <label className="form-label">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "38px",
                cursor: "pointer",
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.password && (
              <small className="text-danger">{errors.password}</small>
            )}
          </div>

          {/* Buttons */}
          <div className="d-grid">
            <button type="submit" className="btn btn-primary mb-2">
              Login
            </button>

            <button
              type="button"
              className="btn btn-link mb-2"
              style={{ textDecoration: "none" }}
              onClick={() => alert("Redirect to Forgot Password Page")}
            >
              Forgot Password?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
