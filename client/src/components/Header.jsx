import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/log.ico';
import { FaBell } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <Navbar className="bg-primary-subtle w-100">
      <Container>
        <Navbar.Brand className="w-100">
          <div className="d-flex justify-content-between align-items-center w-100">
            
            {/* Left Section */}
            <div className="d-flex gap-5 align-items-center">
              <img
                src={logo}
                width={80}
                height={40}
                className="d-inline-block align-top"
                alt="logo"
              />
              <Link className="text-decoration-none text-dark" to="/">Menu 1</Link>
              <Link className="text-decoration-none text-dark" to="/">Menu 2</Link>
              <Link className="text-decoration-none text-dark" to="/">Menu 3</Link>
              <Link className="text-decoration-none text-dark" to="/">Menu 4</Link>
            </div>

            {/* Right Section */}
            <div className="d-flex gap-1 flex-column align-items-end text-end">
              <div className="d-flex align-items-center gap-4 ">
                <FaBell className="text-body-secondary fs-5" />
                <img
                  src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
                  alt="profile"
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
              <Link to="/" className="text-decoration-none">
                <span className="text-dark" style={{ fontSize: '1rem' }}>Login / Signup</span>
              </Link>
              </div>
              <h6 className="text-dark mt-1" style={{ fontSize: '0.7rem' }}>
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
