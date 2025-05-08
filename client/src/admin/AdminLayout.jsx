import React from "react";
import Header from "../components/admin/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Sidebar from "../components/admin/Sidebar";

function AdminLayout() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="px-4 d-flex w-100 flex-column justify-content-between align-items-center">
        <Header />
        <div className="flex-grow-1 w-100">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default AdminLayout;

