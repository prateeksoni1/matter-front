import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <StyledHomePage>
      <StyledNav>
        <div>
          <StyledLogo src={require("../assets/logo-only.png")} />
        </div>
        <StyledLinksContainer>
          <StyledLink to="/signup">Sign up</StyledLink>
          <StyledLink to="/signin">Sign in</StyledLink>
        </StyledLinksContainer>
      </StyledNav>
      <StyledHeaderContainer>
        <StyledLeftColumn>
          <StyledHeading>Matter</StyledHeading>
          <StyledContentContainer>
            <StyledSubHeading>Manage your Projects</StyledSubHeading>
            <StyledContent>
              An easy-to-use Project Manager app. Designed for organizations,
              with highly customizable settings as per your organization rules.
            </StyledContent>
            <StyledLightButton>Get Started Now</StyledLightButton>
          </StyledContentContainer>
        </StyledLeftColumn>
        <StyledRightColumn>
          <StyledImageOne src={require("../assets/create-project-card.png")} />
          <StyledImageTwo src={require("../assets/create-task-card.png")} />
        </StyledRightColumn>
      </StyledHeaderContainer>
      {/* <StyledLeft>
        <div>
          <StyledLogo src={require("../assets/logo-only.png")} />
          <StyledLeftName>Matter</StyledLeftName>
          <StyledLeftText>a better tool to track your projects</StyledLeftText>
        </div>
        <StyledLeftButton>Get Started Now</StyledLeftButton>
      </StyledLeft>
      <StyledRight>
        <StyledRightLinks href="/register">Register</StyledRightLinks>
        <StyledRightLinks href="/register">Login</StyledRightLinks>
      </StyledRight> */}
    </StyledHomePage>
  );
};

export default HomePage;

const StyledHomePage = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #000;
  /* display: flex;
  flex-direction: row; */
  color: #fff;
  padding: 2em 8em;
  display: flex;
  flex-direction: column;
  @media (max-width: 900px) {
    padding: 2em 3em;
  }
`;

const StyledNav = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledLinksContainer = styled.div`
  width: 15%;
  display: flex;
  justify-content: space-between;
  @media (max-width: 900px) {
    width: 48%;
  }
`;

const StyledLink = styled(Link)`
  text-transform: uppercase;
  color: #fff;
  text-decoration: none;

  &:hover {
    color: #c394ff;
    text-decoration: none;
    transition: 0.2s ease-in;
  }
`;

const StyledHeaderContainer = styled.div`
  padding-top: 2em;
  display: grid;
  /* grid-column-gap: 50px; */
  grid-template-columns: 60% 40%;
  @media (max-width: 900px) {
    padding-top: 0;
    grid-template-columns: 100%;
  }
`;

const StyledHeading = styled.h1`
  font-weight: bold;
  font-size: 116px;
  text-transform: uppercase;
  line-height: 176px;
  letter-spacing: 0.05em;

  color: rgba(195, 148, 255, 0.25);

  @media (max-width: 900px) {
    font-size: 54px;
    line-height: 118px;
  }
`;

const StyledContentContainer = styled.div`
  margin-top: -4.5em;
  margin-left: 1em;
`;

const StyledSubHeading = styled.h2`
  /* width: 100%; */
  font-size: 51px;
  font-weight: bold;
  line-height: 78px;

  /* identical to box height */

  letter-spacing: 0.05em;

  color: #ffffff;

  @media (max-width: 900px) {
    font-size: 23px;
    line-height: 60px;
  }
`;

const StyledContent = styled.p`
  font-size: 17px;
  line-height: 37px;
  letter-spacing: 0.05em;
  width: 70%;
  margin-bottom: 2em;
  color: #9f9f9f;
  @media (max-width: 900px) {
    font-size: 18px;
    line-height: 32px;
    width: 90%;
  }
`;

const StyledLightButton = styled.button`
  background: #c394ff;
  box-shadow: 0px 6px 4px rgba(50, 50, 50, 0.4);
  border-radius: 5px;
  padding: 1em 4em;
  border: 0px;
  @media (max-width: 900px) {
    padding: 1em 1em;
    /* line-height: 32px; */
    width: 66%;
  }
`;

const StyledLeftColumn = styled.div`
  /* width: 50%; */
`;

const StyledRightColumn = styled.div`
  /* width: 50%; */
  @media (max-width: 900px) {
    display: none;
  }
`;

const StyledImageOne = styled.img`
  /* height: 300px;
  border-radius: 5px;
  transform: rotate(-15deg); */
  height: 250px;
  border-radius: 5px;
  -webkit-transform: rotate(-15deg);
  -ms-transform: rotate(-15deg);
  transform: rotate(-10deg);
  margin: 0px 0 0 30px;
`;

const StyledImageTwo = styled.img`
  height: 250px;
  border-radius: 5px;
  transform: rotate(11deg) translate(-68px, 0px);
`;

// const StyledLeft = styled.div`
//   width: 55%;
//   padding: 24px 30px 24px 66px;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   @media (max-width: 900px) {
//     position: relative;
//     top: 50px;
//     height: 90%;
//   }
// `;

const StyledLogo = styled.img`
  width: 50px;
  height: 50px;
`;

// const StyledLeftName = styled.p`
//   font-family: Montserrat;
//   font-style: normal;
//   font-weight: bold;
//   font-size: 70px;
//   color: #ffffff;
// `;

// const StyledLeftText = styled.p`
//   font-family: Montserrat;
//   font-style: normal;
//   font-weight: normal;
//   font-size: 25px;
//   color: #9f9f9f;
//   margin: 0;
// `;

// const StyledLeftButton = styled.button`
//   width: 200px;
//   padding: 12px;
//   background-color: #ac6bff;
//   border: none;
//   outline: none;
// `;

// const StyledMid = styled.span`
//   width: 10%;
//   height: 100%;
//   background-color: #ac6bff;
//   @media (max-width: 900px) {
//     display: none;
//   }
// `;

// const StyledRight = styled.div`
//   display: flex;
//   justify-content: space-around;
//   margin: 12px auto 0 auto;
//   height: 200px;
//   width: 300px;
//   @media (max-width: 900px) {
//     position: relative;
//     right: 15%;
//     padding-left: 2rem;
//   }
// `;

// const StyledRightLinks = styled.a`
//   color: #fff;
//   font-size: 23px;
//   font-weight: 700;
//   text-decoration: none;
//   @media (max-width: 900px) {
//     margin-right: 18px;
//   }

//   &:hover {
//     text-decoration: none;
//     color: #ac6bff;
//     transition: 0.4s ease-in;
//   }
// `;
