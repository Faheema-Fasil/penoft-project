import React, { useState } from "react";
import Header from "../components/admin/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Sidebar from "../components/admin/Sidebar";

import { Offcanvas} from "react-bootstrap";

function AdminLayout() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    
    
    
    <div className="d-flex flex-row ms-2 me-0">
    {/* Sidebar */}
    <Offcanvas show={show} onHide={handleClose} placement="start" responsive="md">
      <Sidebar handleClose={handleClose} />
    </Offcanvas>
  
    {/* Main Content Area */}
    <div className="d-flex flex-column w-100 min-vh-100 p-2">
      <Header handleShow={handleShow} />
      
      <div className="flex-grow-1 outlet-wrapper overflow-auto">
        <Outlet />
      </div>
  
      <Footer />
    </div>
  </div>
  
  );
}

export default AdminLayout;

