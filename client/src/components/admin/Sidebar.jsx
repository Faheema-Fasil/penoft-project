import React from "react";
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
  FaTimes,
} from "react-icons/fa";

import logo from "../../assets/log.ico";
import { Link, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";

function Sidebar({ handleClose }) {
  const { logout } = useAuth();
  const location = useLocation();

  // Helper for active nav
  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar-custom">
      {/* Close Button (mobile only) */}
      <Button variant="link" onClick={handleClose} className="sidebar-close-btn d-lg-none" aria-label="Close sidebar">
        <FaTimes size={22} />
      </Button>

      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}>
        <div className="sidebar-logo">
          <Link onClick={handleClose} to="/myprofile">
            <img src={logo} alt="Logo" className="img-fluid" style={{ maxWidth: "100px" }} />
          </Link>
        </div>
        <ul className="sidebar-nav m-3">
          <li>
            <Link onClick={handleClose} to="/dashboard" className={isActive("/dashboard") ? "active" : ""}>
              <FaTh className="me-3" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link onClick={handleClose} to="*">
              <FaMapMarkerAlt className="me-3" />
              Menu 02
            </Link>
          </li>
          <li>
            <Link onClick={handleClose} to="*">
              <FaArchive className="me-3" />
              Menu 03
            </Link>
          </li>
          <li>
            <Link onClick={handleClose} to="*">
              <FaWarehouse className="me-3" />
              Menu 04
            </Link>
          </li>
          <li>
            <Link onClick={handleClose} to="*">
              <FaLink className="me-3" />
              Menu 05
            </Link>
          </li>
          <li>
            <Link onClick={handleClose} to="*">
              <FaMedal className="me-3" />
              Menu 06
            </Link>
          </li>
          <li>
            <Link onClick={handleClose} to="*">
              <FaDownload className="me-3" />
              Downloads
            </Link>
          </li>
        </ul>
      </div>

      <div className="sidebar-bottom">
        <Link onClick={handleClose} to="/myprofile" className={isActive("/myprofile") ? "active" : ""}>
          <FaUser className="me-2" />
          My Profile
        </Link>
        <ul>
          <li>
            <Link onClick={handleClose} to="*">
              <FaCog className="me-2" />
              Settings
            </Link>
          </li>
          <li>
            <Link
              onClick={() => {
                handleClose();
                logout();
              }}
              to="*"
            >
              <FaSignOutAlt className="me-2" />
              <span>Logout</span>
            </Link>
          </li>
        </ul>
        <div className="sidebar-version">
          <p>Ver 1.21</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
