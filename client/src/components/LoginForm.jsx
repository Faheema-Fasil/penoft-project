// LoginForm.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../reactContext/AuthContext"; // Assuming this path is correct
import API from '../Api/axios'; // Assuming this path is correct

function LoginForm({ reg }) {
  const [checked, setChecked] = useState(false);
  const isRegisterForm = reg ? true : false;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");
  const [password, setPassword] = useState("");
  const { login, handleRegister, setRegisterData } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password || !userType) {
        alert("Cannot login! Please provide essential details.");
        return;
      }
  
      const res = await API.post('/api/users/login', { email, password, userType });
  
      const { token, user } = res.data;
  
      // Save to localStorage or sessionStorage
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));
  
      alert("Login successful");
      console.log("token",token);
      console.log("user",user);
      
  
      // Save in context
      login(user, token);
  
      navigate("/myprofile");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Login failed");
    }
  };
  

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center" // Added vertical padding
      style={{
        minHeight: "calc(100vh - 150px)", 
        background: "#e9fcf4"
      }}
    >
      <div
        className="w-100 p-4 p-lg-2" 
        style={{
          maxWidth: "500px", 
          border: "1.5px solid #a3e6cb", 
          borderRadius: "12px", 
          background: "#ffffff", 
          boxShadow: "0 8px 16px rgba(0,0,0,0.1)" 
        }}
      >
        <form
          className="w-100 p-3" 
          style={{ background: "transparent", border: "none", padding: 0 }} 
          onSubmit={(e) => {
            if (isRegisterForm) {
              setRegisterData({ name, email, password, userType });
              handleRegister(e);
            } else {
              handleLogin(e);
            }
          }}
        >
          <h3 className="fw-bold text-dark mb-4">
            {isRegisterForm ? "Admin Register" : "Admin Login"}
          </h3>
          {
            isRegisterForm &&
            <div className="mb-3">
              <input
                type="text"
                className="form-control border-success" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
              />
            </div>
          }
          <div className="mb-3">
            <input
              type="email" 
              className="form-control  border-success"
              placeholder="Enter Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control  border-success"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <select
              className="form-select  border-success" 
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              required
            >
              <option value="">Choose Category (Admin, Super Admin, etc)</option>
              <option value="Admin">Admin</option>
              <option value="Super Admin">Super Admin</option>
            </select>
          </div>
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mb-4"> {/* Responsive layout for checkbox/forgot password */}
            {isRegisterForm ? "" : (
              <div className="form-check mb-2 mb-sm-0"> 
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                  id="rememberMe"
                  style={{ borderColor: "#26b44d" }} />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember Me
                </label>
              </div>
            )}
            <Link to={isRegisterForm ? "/" : "/forgot-password"} className="text-success text-decoration-none fw-semibold"> {/* Changed color to success, removed underline */}
              {isRegisterForm ? (
                "Already have an account? Login"
              ) : (
                ""
              )}
            </Link>
          </div>
          {isRegisterForm ? (
            <button type="submit" className="btn btn-success  w-100 fw-bold "> 
              Register
            </button>
          ) : (
            <button type="submit" className="btn btn-success  w-100 fw-bold py-3"> 
              Login
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default LoginForm;