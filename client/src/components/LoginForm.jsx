import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../reactContext/AuthContext";

function LoginForm() {
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password || !userType) {
      alert("Cannot login! Please provide essential details.");
    } else {
      login(email, password, userType);
      navigate("/myprofile");
    }
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        minHeight: "70vh",
      }}
    >
      <div
        className="w-100 login-form"
        style={{
          maxWidth: 900,
          border: "1.5px solid #b6f7d6",
          borderRadius: 8,
          background: "#f2fffa",
          }}
      >
        <form
          className="mx-auto"
          style={{ maxWidth: 500, background: "#fff", border: "1px solid #26b44d", borderRadius: 8, padding: 32 }}
          onSubmit={handleLogin}
        >
          <h3 className="fw-bold text-dark text-left mb-4">Admin Login</h3>
          <div className="mb-3">
            <input
              type="text"
              className="form-control border-success"
              placeholder="Enter Email ID/username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control border-success"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <select
              className="form-select border-success"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="">Choose Category (Admin, Super Admin, etc)</option>
              <option value="Admin">Admin</option>
              <option value="Super Admin">Super Admin</option>
            </select>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="form-check">
              <input
                className="form-check-input b"
                type="checkbox"
                checked={checked}
                onChange={() => setChecked(!checked)}
                id="rememberMe"
                style={{ borderColor: "gray" }}
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember Me
              </label>
            </div>
            <span className="text-danger" style={{ cursor: "pointer" }}>
              Forgot Password?
            </span>
          </div>
          <button type="submit" className="btn btn-success w-100 fw-bold" style={{ height: 45 }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
