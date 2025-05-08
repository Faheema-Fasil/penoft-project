import React, { useState } from "react";
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

function Sidebar() {
  const location = useLocation();
  const [clicked, setClicked] = useState(false);
  const handleCliked = () => setClicked(true);
  return (
    <>
      <div className="d-flex gap-5 flex-column bg-light shadow-sm" style={{ width: "300px", height: "100vh" }}>
        <div className="p-3">
          <Link to="/myprofile">
            <img src={logo} alt="Logo" className="img-fluid" style={{ maxWidth: "100px" }} />
          </Link>
        </div>
        <ul className="nav nav-pills flex-column  ">
          <li className="nav-item">
            <Link
              to="/dashboard"
              className={`btn nav-link fs-6  d-flex align-items-center text-dark ${location.pathname === "/dashboard" ? "bg-success" : ""}`}
              onClick={handleCliked}
            >
              <FaTh className="me-3" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/menu02"
              className={`btn nav-link fs-6 d-flex align-items-center text-dark ${location.pathname === "/menu02" ? "bg-success" : ""}`}
            >
              <FaMapMarkerAlt className="me-3" />
              <span>Menu 02</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/menu03"
              className={`btn nav-link fs-6  d-flex align-items-center text-dark ${location.pathname === "/menu03" ? "bg-success" : ""}`}
            >
              <FaArchive className="me-3" />
              <span>Menu 03</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/menu04"
              className={`btn nav-link fs-6  d-flex align-items-center text-dark ${location.pathname === "/menu04" ? "bg-success" : ""}`}
            >
              <FaWarehouse className="me-3" />
              <span>Menu 04</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/menu05"
              className={`btn nav-link fs-6  d-flex align-items-center text-dark ${location.pathname === "/menu05" ? "bg-success" : ""}`}
            >
              <FaLink className="me-3" />
              <span>Menu 05</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/menu06"
              className={`btn nav-link fs-6  d-flex align-items-center text-dark ${location.pathname === "/menu06" ? "bg-success" : ""}`}
            >
              <FaMedal className="me-3" />
              <span>Menu 06</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/downloads"
              className={`btn nav-link fs-6  d-flex align-items-center text-dark ${location.pathname === "/downloads" ? "bg-success" : ""}`}
            >
              <FaDownload className="me-3" />
              <span>Downloads</span>
            </Link>
          </li>
        </ul>

        <div className="px-3 gap-3 mt-auto">
          <Link to="/myprofile" className={`btn text-dark d-flex align-items-center w-100  `}>
            <FaUser className="me-2" />
            <span>My Profile</span>
          </Link>
          <ul className="nav nav-pills flex-column">
            <li className="nav-item">
              <Link
                to="/settings"
                className={`btn nav-link d-flex align-items-center text-dark py-2 ${location.pathname === "/settings" ? "bg-success" : ""}`}
              >
                <FaCog className="me-2" />
                <span>Settings</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/logout"
                className={`btn nav-link d-flex align-items-center text-dark py-2 ${location.pathname === "/logout" ? "bg-success" : ""}`}
              >
                <FaSignOutAlt className="me-2" />
                <span>Logout</span>
              </Link>
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

