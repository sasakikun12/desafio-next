import styled from "styled-components";
import Cookies from "js-cookie";
import {
  Navbar as Nav,
  Nav as Menu,
  Container,
  NavDropdown,
} from "react-bootstrap";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const NavbarBrand = styled(Nav.Brand)`
  font-weight: 500;
  color: #601349;
  font-size: 28px;
`;

const Navbar = () => {
  const [label, setLabel] = useState("");
  const router = useRouter();

  const handleSignOut = () => {
    Cookies.remove("token");
    Cookies.remove("username");
    router.push("/login");
  };

  useEffect(() => {
    setLabel(Cookies.get("username"));
  }, []);

  return (
    <Nav expand="lg" className="justify-content-between border-bottom">
      <Container fluid>
        <NavbarBrand href="#">Controle de produtos e vendas</NavbarBrand>
        <Nav.Toggle aria-controls="basic-navbar-nav" />
        <Nav.Collapse id="basic-navbar-nav">
          <Menu className="me-auto">
            <NavDropdown title={label} id="basic-nav-dropdown">
              <NavDropdown.Item onClick={handleSignOut}>Sair</NavDropdown.Item>
            </NavDropdown>
          </Menu>
        </Nav.Collapse>
      </Container>
    </Nav>
  );
};

export default Navbar;
