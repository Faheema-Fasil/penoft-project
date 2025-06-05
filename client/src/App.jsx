import React from "react";
import LoginPage from "./pages/LoginPage";
import MyProfilePage from "./pages/MyProfilePage";
import DashBoardPage from "./pages/DashBoardPage";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "./admin/AdminLayout";
import NotFound from "./pages/NotFound";
import ForgetPassword from "./pages/ForgetPassword";
import { Slide, ToastContainer } from "react-toastify";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import AuthLayout from "./AuthLayout/AuthLayout";

function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Slide}
      />
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="/myprofile" element={<MyProfilePage />} />
          <Route path="/dashboard" element={<DashBoardPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route element={<AuthLayout/>}>

        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<LoginPage reg />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/resetpassword" element={<ResetPasswordPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
