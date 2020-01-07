import React from "react";
import NavbarComponent from "./NavbarComponent";
import styled from "styled-components";

const Layout = ({ heading, children }) => {
  return (
    <>
      <NavbarComponent />
      <StyledContainer>
        <h1>{heading}</h1>
        <StyledContentContainer>{children}</StyledContentContainer>
      </StyledContainer>
    </>
  );
};

export default Layout;

const StyledContainer = styled.div`
  margin: 2rem;
  color: #fff;
`;

const StyledContentContainer = styled.div`
  background-color: #525252;
  padding: 1rem;
`;
