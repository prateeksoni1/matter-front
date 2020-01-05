import React from "react";
import { Navbar, Nav, Dropdown, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import api from "../api";
import { setProfile } from "../actions";
import { toast } from "react-toastify";

const NavbarComponent = () => {
  const dispatch = useDispatch();

  const profile = useSelector(state => state.auth.profile);

  const handleLogout = async () => {
    try {
      await api.get("/api/auth/logout");
      dispatch(setProfile(null));
      toast.success("Logged out successfully");
    } catch (err) {
      toast.error("Internal server error");
    }
  };

  return (
    <StyledNavbar variant="dark">
      <StyledNavbarBrand>Matter</StyledNavbarBrand>
      <Nav className="mr-auto">
        <NavDropdown title="My projects">
          <NavDropdown.Item>1</NavDropdown.Item>
          <NavDropdown.Item>1</NavDropdown.Item>
          <NavDropdown.Item>1</NavDropdown.Item>
          <NavDropdown.Item>1</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Nav className="ml-auto">
        <Nav.Link>{profile.name}</Nav.Link>
        <Nav.Link>|</Nav.Link>
        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
      </Nav>
    </StyledNavbar>
  );
};

export default NavbarComponent;

const StyledNavbar = styled(Navbar)`
  background-color: #000;
  text-transform: uppercase;
`;

const StyledNavbarBrand = styled(Navbar.Brand)`
  font-weight: 700;
  font-size: 32px;
  letter-spacing: 1.8px;
`;
