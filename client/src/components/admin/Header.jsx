import React from "react";
import { Container, Row, Col, Image, Dropdown } from "react-bootstrap";
import { BellFill } from "react-bootstrap-icons";
import { useAuth } from "../../reactContext/AuthContext";

function Header() {
  const { user, logout } = useAuth();
  const avatarUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHSTQLezhAjhf515pGBYHvboyfK5BjmZ_RZQ&s";

  return (
    <Container fluid className="py-3 bg-white border-bottom">
      <Row className="align-items-center">
        <Col xs={12} md={8}>
          <h3 className="mb-1 fw-bold text-dark" style={{ fontSize: "1.2rem" }}>
            Hi {user?.email}!
          </h3>
          <p className="mb-0 small text-dark fw-light">Kindly fill your details and make the complete.</p>
        </Col>

        <Col xs={12} md={4} className="d-flex justify-content-end align-items-center mt-0">
          <div className="position-relative me-3 d-none d-md-block">
            <BellFill size={24} />
            <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
              <span className="visually-hidden">unread messages</span>
            </span>
          </div>

          <Dropdown align="end">
            <Dropdown.Toggle
              as={Image}
              src={avatarUrl}
              roundedCircle
              className="me-2 d-none d-md-inline"
              style={{
                width: "32px",
                height: "32px",
                objectFit: "cover",
                cursor: "pointer",
              }}
            />
            <Dropdown.Toggle
              as="span"
              className="me-2 d-inline d-md-none bg-secondary text-white rounded-circle d-flex justify-content-center align-items-center"
              style={{
                width: "32px",
                height: "32px",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              {user?.email?.[0]?.toUpperCase() || "U"}
            </Dropdown.Toggle>

            <Dropdown.Toggle
              as="span"
              className="text-dark me-1 d-none d-md-inline"
              id="dropdown-basic"
              style={{ cursor: "pointer" }}
            >
              {user?.email}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Settings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
    </Container>
  );
}

export default Header;
