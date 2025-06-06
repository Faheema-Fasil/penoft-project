import React, { useEffect } from "react";

import Header from "../components/Header";
import LoginForm from "../components/LoginForm";
import Footer from "../components/Footer";
import { useAuth } from "../reactContext/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginPage({ reg }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

  return (
    <>

      <div >
        <LoginForm reg={reg} />
      </div>

    </>
  );
}

export default LoginPage;
