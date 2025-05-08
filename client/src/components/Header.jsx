import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/logo.png";
import { FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Navbar className="w-100" style={{
      backgroundColor: "#E2FFED"
    }} expand="md">
      <Container>
        <Navbar.Brand className="w-100">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center w-100">
            <div className="d-flex gap-3 gap-md-5 align-items-center mb-2 mb-md-0">
              <img src={logo} width={120} height={70} className="d-inline-block align-top" alt="logo" />
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <ul className="navbar-nav me-auto mb-2 mb-md-0">
                  <li className="nav-item">
                    <Link className="nav-link text-dark" to="/">
                      Menu 1
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-dark" to="/">
                      Menu 2
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-dark" to="/">
                      Menu 3
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-dark" to="/">
                      Menu 4
                    </Link>
                  </li>
                </ul>
              </Navbar.Collapse>
            </div>

            {/* Right Section */}
            <div className="d-flex gap-1 flex-column align-items-end text-end">
              <div className="d-flex align-items-center gap-3 gap-md-4">
                <FaBell className="text-body-secondary fs-5" />
                <img
                  src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
                  alt="profile"
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <Link to="/" className="text-decoration-none">
                  <span className="text-dark" style={{ fontSize: "1rem" }}>
                    Login / Signup
                  </span>
                </Link>
              </div>
              <h6 className="text-dark mt-1" style={{ fontSize: "0.7rem" }}>
                Kindly login or signup to proceed
              </h6>
            </div>
          </div>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;
