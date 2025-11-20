import React from "react";
import { FaCarCrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";

const Menu = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center">
          <FaCarCrash style={{ color: "yellow", fontSize: "32px", marginRight: "10px",}}/>
          Автомобільний каталог Назара
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>
              Головна
            </Nav.Link>
            <Nav.Link as={NavLink} to="/add">
              Додати авто
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
