import styled from "styled-components";
import { Button, Card } from "react-bootstrap";

export const StyledButton = styled(Button)`
  background-color: #000;
  color: #fff;
  border-radius: 0px;
  border: 0px;
  text-transform: uppercase;

  &:hover {
    ${props =>
      !props.disabled &&
      ` 
    background-color: #ac6bff;
    color: #000;`}
  }
`;

export const StyledContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledCard = styled(Card)`
  width: 100%;
  height: 100%;
  border: 0;
`;

export const StyledCardTop = styled.span`
  background-color: #000;
  padding: 12px;
  color: #fff;
  font-size: 24px;
  font-weight: 700;
`;

export const StyledCardBody = styled.div`
  display: flex;
  height: 100%;
  background-color: #000;
`;

export const StyledCardLeft = styled.div`
  width: 65%;
  position: relative;
`;

export const LoginImg = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
      180deg,
      rgba(172, 107, 255, 0.9) 0%,
      rgba(172, 107, 255, 0.9) 0.01%,
      rgba(172, 107, 255, 0) 100%
    ),
    url(${require("../assets/login.jpg")});
  background-size: cover;
`;

export const StledImageText = styled.p`
  width: 45%;
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 38px;
  line-height: 46px;
  color: #000000;
  padding: 1em 1em;
`;

export const StyledCardRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 35%;
  padding: 0px 3em;
  background-color: #1e1e1e;
`;

export const StyledRightHeading = styled.p`
  text-align: center;
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 59px;
  color: #ffffff;
  text-shadow: 0px 6px 4px rgba(0, 0, 0, 0.6);
`;

export const StyledFormEmail = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledFormPassword = styled.div`
  display: flex;
  flex-direction: column;
`;
export const StyledFormEmailLabel = styled.label`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  color: #ffffff;
  margin: 0;
`;

export const StyledFormPasswordLabel = styled.label`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  color: #ffffff;
  margin: 10px 0 0 0;
`;

export const StyledFormEmailInput = styled.input`
  background: #525252;
  box-shadow: 0px 6px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  border: 0;
  padding: 3px 10px;
  color: #fff;
`;

export const StyledFormPasswordInput = styled.input`
  background: #525252;
  box-shadow: 0px 6px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  border: none;
  padding: 3px 10px;
  color: #fff;
`;

export const StyledForgotPassword = styled.a`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 29px;
  color: #a3a3a3 !important;
`;

export const StyledLoginButton = styled.button`
  border: none;
  background-color: #c394ff;
  font-weight: 700;
  color: #000;
  text-transform: uppercase;
  padding: 0.3em 0px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
  border-radius: 3px;

  &:hover {
    box-shadow: none;
    background-color: #dabcff;
    transform: translateY(1px);
  }
`;

export const StyledHaveNotSigned = styled.p`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 34px;
  color: #a3a3a3;
`;

export const StyledSignUpLink = styled.a`
  font-size: 12px;
  margin-left: 5px;
`;
