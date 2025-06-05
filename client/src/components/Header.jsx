// Header.jsx
import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/logo.png"; 
import { FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Dropdown, DropdownButton } from "react-bootstrap";

function Header() {
  return (
    <Navbar className="w-100 py-3" style={{
      backgroundColor: "#E2FFED",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)" 
    }} expand="lg"> 
      <Container fluid className="px-3 px-md-5"> 
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img src={logo} width={100} height={60} className="d-inline-block align-top" alt="logo" /> 
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">

          <ul className="navbar-nav me-auto mb-2 mb-lg-0 "> {/* Added margin-left for larger screens */}
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

          {/* Right Section */}
          <div  >
            <div className="d-flex align-items-center gap-3">
              <FaBell className="text-body-secondary fs-5" />
              <img
                src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
                alt="profile"
                style={{
                  width: 35, // Slightly larger profile image
                  height: 35,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <DropdownButton id="login-signup-dropdown" title="Login / Signup " variant="none" className="border-0 p-0 custom-dropdown-toggle"> {/* Added custom class for potential styling */}
                <Dropdown.Item as={Link} to="/">Login</Dropdown.Item> {/* Use Link for navigation */}
                <Dropdown.Item as={Link} to="/register" className="border-top">Register</Dropdown.Item> {/* Use Link for navigation */}
              </DropdownButton>
            </div>
            <div className="text-dark  m-0" style={{ fontSize: "0.8rem" }}> 
              Kindly login or signup to proceed
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;