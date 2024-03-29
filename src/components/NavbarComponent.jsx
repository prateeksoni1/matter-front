import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import api from "../api";
import { logoutUser } from "../actions";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const NavbarComponent = () => {
  const dispatch = useDispatch();

  const profile = useSelector(state => state.auth.profile);

  const handleLogout = async () => {
    try {
      await api.get("/api/auth/logout");
      dispatch(logoutUser());
      toast.success("Logged out successfully");
    } catch (err) {
      toast.error("Internal server error");
    }
  };

  return (
    <StyledNavbar variant="dark">
      <StyledNavbarBrand>Matter</StyledNavbarBrand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/dashboard">
          Dashboard
        </Nav.Link>
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
