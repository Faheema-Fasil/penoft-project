import React from 'react'
import { Container, Row, Col, Image, Dropdown } from 'react-bootstrap';
import { BellFill } from 'react-bootstrap-icons';
import { useAuth } from '../../reactContext/AuthContext';
function Header() {
const {user,logout}=useAuth()
  return (
    <>
     <Container fluid className="py-3 bg-white">
      <Row className="align-items-center">
        <Col md="auto">
          <h3 className="mb-0 fw-bold text-dark">Hi {user?.email}!</h3>
          <p className="mb-0 small text-dark fw-light">Kindly fill your details and make the complete.</p>
        </Col>
        <Col className="d-flex justify-content-end align-items-center">
          <div className="position-relative me-3">
            <BellFill size={30} className="" />
            <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
              <span className="visually-hidden">unread messages</span>
            </span>
          </div>
          <Dropdown>
            <Dropdown.Toggle as={Image} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHSTQLezhAjhf515pGBYHvboyfK5BjmZ_RZQ&s" roundedCircle className="me-2" style={{ width: '30px', height: '30px', objectFit: 'cover' }} />
            <Dropdown.Toggle as="span" className="text-dark me-1" id="dropdown-basic">
            {user?.email}
            </Dropdown.Toggle>


            <Dropdown.Menu align="end">
              <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Settings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item  onClick={logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
    </Container>
    </>
  )
}

export default Header
