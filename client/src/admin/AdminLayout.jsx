import React, { useEffect, useState } from "react";
import Header from "../components/admin/Header";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Sidebar from "../components/admin/Sidebar";

import { Offcanvas } from "react-bootstrap";
import { useAuth } from "../reactContext/AuthContext";

function AdminLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="d-flex flex-row mb-0 me-0">
      <Offcanvas style={{width:"fit-content"}} show={show} onHide={handleClose} placement="start" responsive="lg">
        <Sidebar handleClose={handleClose} />
      </Offcanvas>

      {/* Main Content Area */}
      <div className="d-flex flex-column w-100 min-vh-100 p-2">
        <Header handleShow={handleShow} />

        <div className="flex-grow-1 outlet-wrapper overflow-auto">
          <Outlet />
        </div>
<div style={{margin:"none"}}>

        <Footer />
</div>
      </div>
    </div>
  );
}

export default AdminLayout;
