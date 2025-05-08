import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate=useNavigate()
  const [user, setUser] = useState({
    email:"",
    password:""

  });

  const login = (email, password) => {
    if (!email||!password) {
        alert("please provide essential data")
    }
    const userData = { email, password };
    setUser(userData);
  };

  const logout = () => {
    navigate('/')
    setUser(null)};


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);