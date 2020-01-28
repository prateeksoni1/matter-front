import React from "react";
import styled from "styled-components";

const HomePage = () => {
  return (
    <StyledHomePage>
      <StyledLeft>
        <div>
          <StyledLogo src={{ Image }} />
          <StyledLeftName>Matter</StyledLeftName>
          <StyledLeftText>a better tool to track your projects</StyledLeftText>
        </div>
        <StyledLeftButton>Get Started Now</StyledLeftButton>
      </StyledLeft>
      <StyledMid></StyledMid>
      <StyledRight>
        <StyledRightLinks href="/register">Register</StyledRightLinks>
        <StyledRightLinks href="/register">Login</StyledRightLinks>
      </StyledRight>
    </StyledHomePage>
  );
};

export default HomePage;

const StyledHomePage = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #000;
  display: flex;
  flex-direction: row;
  color: #fff;
`;

const StyledLeft = styled.div`
  width: 55%;
  padding: 24px 30px 24px 66px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 900px) {
    position: relative;
    top: 50px;
    height: 90%;
  }
`;

const StyledLogo = styled.img`
  width: 50px;
  height: 50px;
`;

const StyledLeftName = styled.p`
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 70px;
  color: #ffffff;
`;

const StyledLeftText = styled.p`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 25px;
  color: #9f9f9f;
  margin: 0;
`;

const StyledLeftButton = styled.button`
  width: 200px;
  padding: 12px;
  background-color: #ac6bff;
  border: none;
  outline: none;
`;

const StyledMid = styled.span`
  width: 10%;
  height: 100%;
  background-color: #ac6bff;
  @media (max-width: 900px) {
    display: none;
  }
`;

const StyledRight = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 12px auto 0 auto;
  height: 200px;
  width: 300px;
  @media (max-width: 900px) {
    position: relative;
    right: 15%;
    padding-left: 2rem;
  }
`;

const StyledRightLinks = styled.a`
  color: #fff;
  font-size: 23px;
  font-weight: 700;
  text-decoration: none;
  @media (max-width: 900px) {
    margin-right: 18px;
  }

  &:hover {
    text-decoration: none;
    color: #ac6bff;
    transition: 0.4s ease-in;
  }
`;
