import React, { useState } from "react";
import { Container, Row, Col, Image, Dropdown, Modal, Button } from "react-bootstrap";
import { BellFill } from "react-bootstrap-icons"; // Assuming react-bootstrap-icons is installed
import { useAuth } from "../../reactContext/AuthContext"; // Assuming this path is correct

function Header({handleShow}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShowModal = () => setShow(true);
  const { user, logout } = useAuth();
  
  const avatarUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHSTQLezhAjhf515pGBYHvboyfK5BjmZ_RZQ&s"; // Placeholder avatar URL

  return (
    <>
<nav className="navbar navbar-expand-lg navbar-lg">
  <div className="container-fluid">
    <button
      onClick={handleShow}
      className="navbar-toggler ms-auto"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
  </div>
</nav>

       

    <Container fluid className=" bg-white" > 
      <Row className="d-flex justify-content-between align-items-center flex-wrap"> 

        <Col xs="auto" className="text-start mb-2 mb-md-0"> {/* Center text on mobile, left align on desktop */}
          <h3
            className="mb-1 fw-bold text-dark"
            style={{ fontSize: "1.5rem", wordWrap: "break-word" }} // Slightly larger font for prominence
          >
            Hi {user?.name || "User"}!
          </h3>
          <p className="mb-0 text-muted fw-light small d-none d-md-block"> {/* Changed text-dark to text-muted for softer look */}
            Kindly fill your details and make the complete.
          </p>
        </Col>

        {/* Right Section: Bell Icon and User Dropdown */}
        <Col xs="auto" className="d-flex justify-content-end align-items-center mt-2 mt-md-0">
          {/* Bell Icon - visible only on medium and larger screens */}
          <div className="position-relative me-3 d-none d-md-block">
            <BellFill size={22} className="text-secondary" /> {/* Adjusted size and color */}
            <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
              <span className="visually-hidden">unread messages</span>
            </span>
          </div>

          {/* User Dropdown */}
          <Dropdown align="end"> {/* Align dropdown menu to the end */}
            <Dropdown.Toggle as="div" className="d-flex align-items-center cursor-pointer p-1 rounded-pill bg-light-subtle"> {/* Combined toggle for better alignment */}
              {/* Avatar Image (visible on md and above) */}
              <Image
                src={avatarUrl}
                roundedCircle
                className="me-2 d-none d-md-inline-block" // Use d-inline-block for proper spacing
                style={{
                  width: "36px", // Slightly larger avatar
                  height: "36px",
                  objectFit: "cover",
                }}
                alt="User Avatar"
              />

              <span
                className="me-2 d-inline-flex d-md-none bg-secondary text-white rounded-circle justify-content-center align-items-center"
                style={{
                  width: "36px", 
                  height: "36px",
                  fontSize: "1.1rem",
                }}
              >
                {user?.email?.[0]?.toUpperCase() || "U"}
              </span>

             
              <span
                className="text-dark me-1 text-truncate d-none d-sm-block" 
                style={{
                  maxWidth: "120px", 
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                title={user?.email}
              >
                {user?.name || "User"}
              </span>
            
            </Dropdown.Toggle>

            <Dropdown.Menu  className="dropdown-logout-item">
              <Dropdown.Item 
             className="text-center dropdown-logout-item"
              onClick={handleShowModal} >Logout</Dropdown.Item>
              
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
    
    </Container>
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
    <Modal.Header closeButton>

        </Modal.Header>
        <Modal.Body className="text-center">
         Do you want to logout?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={logout}>Logout</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Header;
