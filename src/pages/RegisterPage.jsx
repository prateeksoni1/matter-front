import React, { useState } from "react";
import { Card, Form, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import AsyncSelect from "react-select/async";

import api from "../api";
import { setProfile } from "../actions";
import PrimaryButton, { StyledButton } from "../components/PrimaryButton";
import { toast } from "react-toastify";
import { Formik } from "formik";
import CreateOrganizationModal from "../components/register/CreateOrganizationModal";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [showOrganizationModal, setShowOrganizationModal] = useState(false);
  const [organization, setOrganization] = useState("");

  const handleHideOrganizationModal = () => {
    setShowOrganizationModal(false);
  };

  const onSubmit = async values => {
    const { name, username, email, password } = values;
    try {
      await api.post("/api/auth/signup", {
        email,
        password
      });
      await api.post("/api/auth/login", {
        email,
        password
      });
      const res = await api.post("/api/profile", {
        name,
        username,
        email,
        organization: organization._id
      });
      if (res.data.success) {
        dispatch(setProfile(res.data.profile));
        history.push("/dashboard");
      } else {
        toast.error("Could not sign you up");
      }
    } catch (err) {
      toast.error("Internal Server error");
    }
  };

  const schema = Yup.object().shape({
    name: Yup.string()
      .required()
      .min(4),
    username: Yup.string()
      .required()
      .test("username-test", "Username is already taken", async function(
        value
      ) {
        try {
          const res = await api.get(`/api/profile/${value}`);
          if (res.data.success) return false;
          return true;
        } catch (err) {
          return false;
        }
      }),
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string()
      .min(6)
      .required(),
    confirmPassword: Yup.string()
      .min(6, "Passwords do not match")
      .required()
      .test("password-match", "Passwords do not match", function(value) {
        return this.parent.password === value;
      })
  });

  const fetchOrganizations = async inputValue => {
    const res = await api.get("/api/organization", {
      params: { search: inputValue }
    });
    const organizations = res.data.organizations;
    return organizations.map(organization => ({
      label: organization.name,
      value: organization
    }));
  };

  const loadOptions = async (inputValue, callback) => {
    const profiles = await fetchOrganizations(inputValue);
    callback(profiles);
  };

  return (
    <StyledContainer>
      <StyledCard>
        <Card.Body>
          <Card.Title>Register to Matter</Card.Title>
          <Formik
            onSubmit={onSubmit}
            initialValues={{
              name: "",
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
              isOwner: false
            }}
            validationSchema={schema}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              errors
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    placeholder="Your full name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.name && errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="username">
                  <Form.Label>Username</Form.Label>

                  <Form.Control
                    placeholder="Your unique username"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.username && errors.username}
                    isValid={touched.username && !errors.username}
                  />
                  <Form.Control.Feedback type="valid">
                    Looks good!
                  </Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="isOwner">
                  <Form.Check
                    label="Are you the owner?"
                    value={values.isOwner}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Group>
                {values.isOwner ? (
                  <Form.Group>
                    {organization ? (
                      <div>{organization.name}</div>
                    ) : (
                      <StyledButton
                        onClick={() => setShowOrganizationModal(true)}
                      >
                        Add your organization
                      </StyledButton>
                    )}
                  </Form.Group>
                ) : (
                  <Form.Group controlId="organization">
                    <Form.Label>Select Organization</Form.Label>
                    <AsyncSelect
                      theme={theme => ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                          ...theme.colors,
                          primary25: "#AC6BFF",
                          primary: "black",
                          neutral0: "#1E1E1E"
                        }
                      })}
                      cacheOptions
                      name="organization"
                      onChange={organization =>
                        setOrganization(organization.value)
                      }
                      loadOptions={loadOptions}
                      placeholder="Search organizations"
                    />
                  </Form.Group>
                )}
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    placeholder="email@email.com"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.email && errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                  <Form.Text>
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    placeholder="top secret password"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.password && errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    placeholder="Same password as above"
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={
                      touched.confirmPassword && errors.confirmPassword
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>
                <PrimaryButton type="submit" style={{ width: "100%" }}>
                  Register
                </PrimaryButton>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </StyledCard>
      <Modal
        centered
        size="xl"
        show={showOrganizationModal}
        onHide={handleHideOrganizationModal}
      >
        <CreateOrganizationModal
          handleHideOrganizationModal={handleHideOrganizationModal}
          setOrganization={setOrganization}
        />
      </Modal>
    </StyledContainer>
  );
};

export default RegisterPage;

const StyledContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledCard = styled(Card)`
  width: 40%;
`;
