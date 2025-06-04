import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null); 
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    userType: "", 
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, password, userType } = registerData;

    if (!name || !email || !password || !userType) {
      alert("All fields are required for registration.");
      return;
    }

    try {
      const res = await API.post("/api/users/register", { name, email, password, userType });
      console.log(res.data);
      
      alert("Registration successful. Please login.");
      navigate("/");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Registration failed");
    }
  };
  const login = (userData, token) => {
    setUser({ ...userData, token });
  };
  


    const logout = () => {
      setUser(null);
      localStorage.removeItem('authToken'); 

      localStorage.removeItem('user');
      navigate("/");
    };


  return (
    <AuthContext.Provider value={{ user, login, logout, handleRegister, registerData, setRegisterData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
