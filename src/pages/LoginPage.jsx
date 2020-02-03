import React, { useState } from "react";
import { Card, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import api from "../api";
import { setProfile } from "../actions";
import PrimaryButton from "../components/PrimaryButton";
import { toast } from "react-toastify";
import {
  StyledContainer,
  StyledCard,
  StyledCardTop,
  StyledCardBody,
  StyledCardLeft,
  LoginImg,
  StledImageText,
  StyledCardRight,
  StyledRightHeading,
  StyledFormEmail,
  StyledForgotPassword,
  StyledFormEmailInput,
  StyledFormEmailLabel,
  StyledFormPassword,
  StyledFormPasswordInput,
  StyledFormPasswordLabel,
  StyledHaveNotSigned,
  StyledLoginButton,
  StyledSignUpLink
} from "../styles";
const LoginPage = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: ""
  });

  const [validate, setValidate] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async e => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      return setValidate(true);
    }

    const { email, password } = formValues;
    try {
      await api.post("/api/auth/login", {
        email,
        password
      });
      const res = await api.get("/api/profile");
      if (res.data.success) {
        dispatch(setProfile(res.data.profile));
        history.push("/dashboard");
      } else {
        toast.error("Could not login");
      }
    } catch (err) {
      toast.error("Invalid Email or password");
    }
  };

  const onChange = (property, value) => {
    setFormValues({
      ...formValues,
      [property]: value
    });
  };

  return (
    <StyledContainer>
      <StyledCard>
        <StyledCardTop>Matter</StyledCardTop>
        <StyledCardBody>
          <StyledCardLeft>
            <LoginImg>
              <StledImageText>
                The only management app you’ll ever need.
              </StledImageText>
            </LoginImg>
          </StyledCardLeft>
          <StyledCardRight>
            <StyledRightHeading>Sign In To Matter</StyledRightHeading>
            <form>
              <StyledFormEmail>
                <StyledFormEmailLabel>Email</StyledFormEmailLabel>
                <StyledFormEmailInput type="text"></StyledFormEmailInput>
              </StyledFormEmail>
              <StyledFormPassword>
                <StyledFormPasswordLabel>Password</StyledFormPasswordLabel>
                <StyledFormPasswordInput type="text"></StyledFormPasswordInput>
              </StyledFormPassword>
              <StyledForgotPassword>Forgot Password</StyledForgotPassword>
            </form>
            <StyledLoginButton>Login</StyledLoginButton>
            <StyledHaveNotSigned>
              Haven’t signed up yet?
              <StyledSignUpLink>Signup here</StyledSignUpLink>
            </StyledHaveNotSigned>
          </StyledCardRight>
        </StyledCardBody>
        {/* <Card.Title>Login to Matter</Card.Title>
        <StyledForm noValidate validated={validate} onSubmit={onSubmit}>
          <StyledFormGroup controlId="email">
            <StyledFormLabel>Email</StyledFormLabel>
            <StyledFormControl
              required
              type="email"
              placeholder="email@email.com"
              onChange={e => onChange("email", e.target.value)}
            />
            <StyledFormControlFeedback type="invalid">
              Invalid email
            </StyledFormControlFeedback>
            <StyledFormText>
              We'll never share your email with anyone else.
            </StyledFormText>
          </StyledFormGroup>
          <StyledFormGroup controlId="password">
            <StyledFormLabel>Password</StyledFormLabel>
            <StyledFormControl
              required
              type="password"
              placeholder="secret password"
              onChange={e => onChange("password", e.target.value)}
            />
            <StyledFormText>Minimum 6 characters.</StyledFormText>
          </StyledFormGroup>
          <PrimaryButton type="submit" style={{ width: "100%" }}>
            Login
          </PrimaryButton>
        </StyledForm>
        </CardBody> */}
      </StyledCard>
    </StyledContainer>
  );
};

export default LoginPage;
