import React from "react";

import Header from "../components/Header";
import LoginForm from "../components/LoginForm";
import Footer from "../components/Footer";

function LoginPage({ reg }) {
  return (
    <>
      <Header />
      <div>
        <LoginForm reg={reg} />
      </div>
      <Footer />
    </>
  );
}

export default LoginPage;
