import React, { useState } from "react";
import { Card, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import api from "../api";
import { setProfile } from "../actions";
import PrimaryButton from "../components/PrimaryButton";
import { toast } from "react-toastify";

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
        <Card.Body>
          <Card.Title>Login to Matter</Card.Title>
          <Form noValidate validated={validate} onSubmit={onSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="email@email.com"
                onChange={e => onChange("email", e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Invalid email
              </Form.Control.Feedback>
              <Form.Text>
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="secret password"
                onChange={e => onChange("password", e.target.value)}
              />
              <Form.Text>Minimum 6 characters.</Form.Text>
            </Form.Group>
            <PrimaryButton type="submit" style={{ width: "100%" }}>
              Login
            </PrimaryButton>
          </Form>
        </Card.Body>
      </StyledCard>
    </StyledContainer>
  );
};

export default LoginPage;

const StyledContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledCard = styled(Card)`
  width: 20%;
`;
