import React, {  } from "react";
import { useAuth } from "../../reactContext/AuthContext";
import {
  FaTh,
  FaMapMarkerAlt,
  FaArchive,
  FaWarehouse,
  FaLink,
  FaMedal,
  FaDownload,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import logo from "../../assets/log.ico";
import { Link, useLocation } from "react-router-dom";

import { Button } from "react-bootstrap";

function Sidebar({handleClose}) {
  const {logout}=useAuth();
  const location = useLocation();


  return (
    <>





      <div className={`d-flex flex-column ps-1   justify-content-evenly`} style={{ width: "250px",height:"100vh"}}>
        <div className="p-3">
          <Link onClick={handleClose} to="/myprofile">
            <img src={logo} alt="Logo" className="img-fluid" style={{ maxWidth: "100px" }} />
          </Link>
        </div>
        <ul className="nav nav-pills flex-column  ">
          <li className="nav-item">
            <Link onClick={handleClose}
            
              to="/dashboard"

              className={`btn nav-link fs-6  d-flex align-items-center text-dark ${location.pathname === "/dashboard" ? "bg-success text-light" : ""}`}

            >
              <FaTh className={"me-3"} />
              <span className={`${location.pathname === "/dashboard" ? "bg-success text-light" : ""}`}>Dashboard</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link onClick={handleClose}
              to="*"
              className={`btn nav-link fs-6 d-flex align-items-center text-dark ${location.pathname === "*" ? "bg-success" : ""}`}
            >
              <FaMapMarkerAlt className="me-3" />
              <span>Menu 02</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link onClick={handleClose}
              to="*"
              className={`btn nav-link fs-6  d-flex align-items-center text-dark ${location.pathname === "*" ? "bg-success" : ""}`}
            >
              <FaArchive className="me-3" />
              <span>Menu 03</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link onClick={handleClose}
              to="*"
              className={`btn nav-link fs-6  d-flex align-items-center text-dark ${location.pathname === "*" ? "bg-success" : ""}`}
            >
              <FaWarehouse className="me-3" />
              <span>Menu 04</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link onClick={handleClose}
              to="*"
              className={`btn nav-link fs-6  d-flex align-items-center text-dark ${location.pathname === "*" ? "bg-success" : ""}`}
            >
              <FaLink className="me-3" />
              <span>Menu 05</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link onClick={handleClose}
              to="*"
              className={`btn nav-link fs-6  d-flex align-items-center text-dark ${location.pathname === "*" ? "bg-success" : ""}`}
            >
              <FaMedal className="me-3" />
              <span>Menu 06</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link onClick={handleClose}
              to="*"
              className={`btn nav-link fs-6  d-flex align-items-center text-dark ${location.pathname === "*" ? "bg-success" : ""}`}
            >
              <FaDownload className="me-3" />
              <span>Downloads</span>
            </Link>
          </li>
        </ul>

        <div className="px-3  gap-3 ">
          <Link onClick={handleClose} to="/myprofile" className={`btn text-dark d-flex align-items-center w-100  ${location.pathname === "/myprofile" ? "bg-success" : ""}`}>
            <FaUser className="me-2" />
            <span>My Profile</span>
          </Link>
          <ul className="nav nav-pills flex-column">
            <li className="nav-item">
              <Link onClick={handleClose}
                to="*"
                className={`btn nav-link d-flex align-items-center text-dark py-2 ${location.pathname === "/settings" ? "bg-success" : ""}`}
              >
                <FaCog className="me-2" />
                <span>Settings</span>
              </Link>
            </li>
            <li className="nav-item">
              <Button onClick={logout}
               
                className={`btn nav-link d-flex align-items-center text-dark py-2 `}
              >
                <FaSignOutAlt className="me-2" />
                <span >Logout</span>
              </Button>
            </li>
          </ul>
          <div className="px-3 mt-3 text-dark text-center  ">
            <p style={{ fontSize: "12px", fontFamily: "fantasy" }}> Ver 1.21</p>
          </div>
        </div>
      </div>

    </>
  );
}

export default Sidebar;

