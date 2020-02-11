import React, { useState, useEffect } from "react";
import { Card, Modal } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import AsyncSelect from "react-select/async";

import api from "../api";
import { setProfile, setRegisterForm } from "../actions";
// import PrimaryButton, { StyledButton } from "../components/PrimaryButton";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import CreateOrganizationModal from "../components/register/CreateOrganizationModal";
// import {
//   StyledContainer,
//   StyledCard,
//   StyledCardTop,
//   StyledCardBody,
//   StyledCardLeft,
//   LoginImg,
//   StledImageText,
//   StyledCardRight,
//   StyledRightHeading,
//   StyledFormEmail,
//   StyledForgotPassword,
//   StyledFormEmailInput,
//   StyledFormEmailLabel,
//   StyledFormPassword,
//   StyledFormPasswordInput,
//   StyledFormPasswordLabel,
//   StyledFormConfirmPassword,
//   StyledFormConfirmPasswordInput,
//   StyledFormConfirmPasswordLabel,
//   StyledHaveNotSigned,
//   StyledLoginButton,
//   StyledSignUpLink
// } from "../styles";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const data = useSelector(state => state.auth.registerFormValues);

  const [currentPage, setCurrentPage] = useState(0);

  const [showOrganizationModal, setShowOrganizationModal] = useState(false);
  const [organization, setOrganization] = useState("");
  const [permissionMatrix, setPermissionMatrix] = useState([]);

  const handleHideOrganizationModal = () => {
    setShowOrganizationModal(false);
  };

  const userSchema = Yup.object().shape({
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

  const profileSchema = Yup.object().shape({
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
      })
  });

  const organizationSchema = Yup.object().shape({
    name: Yup.string().required()
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

  const handleFormData = values => {
    // dispatch(setRegisterForm(values));
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    console.log(currentPage, data);
  }, [currentPage, data]);

  const handleSubmit = async values => {
    dispatch(setRegisterForm(values));
    // const { email, password, name, username } = data;
    // try {
    //   await api.post("/api/auth/signup", {
    //     email,
    //     password
    //   });
    //   await api.post("/api/auth/login", {
    //     email,
    //     password
    //   });
    //   const res = await api.post("/api/profile", {
    //     name,
    //     username,
    //     email,
    //     organization: organization._id
    //   });
    //   if (res.data.success) {
    //     dispatch(setProfile(res.data.profile));
    //     history.push("/dashboard");
    //   } else {
    //     toast.error("Could not sign you up");
    //   }
    // } catch (err) {
    //   toast.error("Internal Server error");
    // }
  };

  const handleChangeRole = (value, index) => {
    const newPermissionMatrix = [...permissionMatrix];
    newPermissionMatrix[index].role = value;
    setPermissionMatrix(newPermissionMatrix);
  };

  const handleChangePermissions = (e, index) => {
    const value = [...e.target.options]
      .filter(o => o.selected)
      .map(o => o.value);
    const newPermissionMatrix = [...permissionMatrix];
    newPermissionMatrix[index].permissions = value;
    setPermissionMatrix(newPermissionMatrix);
  };

  const handleAddItem = () => {
    const newPermissionMatrix = [...permissionMatrix];
    newPermissionMatrix.push({ role: "", permissions: [] });
    setPermissionMatrix(newPermissionMatrix);
  };

  const handleCreateOrganization = async values => {
    console.log(values);
    const { name } = values;
    try {
      const data = {
        name,
        permissionMatrix
      };
      const res = await api.post("/api/organization", data);
      setOrganization(res.data.organization);
      toast.success("Organization created successfully");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const renderPermissions = () => {
    return permissionMatrix.map((_, index) => (
      <div>
        <input
          onChange={e => handleChangeRole(e.target.value, index)}
          name="role"
          placeholder="role"
        />
        <select
          name="permissions"
          placeholder="permissions"
          multiple
          onChange={e => handleChangePermissions(e, index)}
        >
          <option value="create-project">Create Project</option>
          <option value="edit-project">Edit Project</option>
          <option value="edit-permissions">Edit Permissions</option>
          <option value="delete-project">Delete Project</option>
          <option value="create-task">Create Task</option>
          <option value="edit-task">Edit Task</option>
          <option value="delete-task">Delete Task</option>
          <option value="mark-task-complete">Mark Task Complete</option>
          <option value="mark-task-testing">Mark Task Testing</option>
          <option value="mark-task-deployed">Mark Task Deployed</option>
          <option value="mark-task-incomplete">Mark Task Incomplete</option>
        </select>
        <ErrorMessage name="name" component="div" />
      </div>
    ));
  };

  return (
    <>
      <StyledContainer>
        <StyledHero>
          <StyledHeroText>
            The only management app you’ll ever need.
          </StyledHeroText>
        </StyledHero>

        {currentPage === 0 && (
          <>
            <Formik
              onSubmit={handleFormData}
              initialValues={{
                email: "",
                password: "",
                confirmPassword: ""
              }}
              validationSchema={userSchema}
            >
              {({ isSubmitting }) => (
                <StyledFormContainer>
                  <StyledHeading>Sign up to Matter</StyledHeading>
                  <StyledForm>
                    <StyledFieldContainer>
                      <StyledLabel htmlFor="email">Email</StyledLabel>
                      <br />
                      <StyledField
                        name="email"
                        type="email"
                        placeholder="email@email.com"
                      />
                      <ErrorMessage name="email" component="div" />
                    </StyledFieldContainer>
                    <StyledFieldContainer>
                      <StyledLabel htmlFor="password">Password</StyledLabel>
                      <br />
                      <StyledField
                        name="password"
                        type="password"
                        placeholder="top secret password"
                      />
                      <ErrorMessage name="password" component="div" />
                    </StyledFieldContainer>
                    <StyledFieldContainer>
                      <StyledLabel htmlFor="confirmPassword">
                        Confirm Password
                      </StyledLabel>
                      <br />
                      <StyledField
                        name="confirmPassword"
                        type="password"
                        placeholder="top secret password"
                      />
                      <ErrorMessage name="confirmPassword" component="div" />
                    </StyledFieldContainer>
                    <StyledFieldContainer>
                      <StyledButton type="submit">Continue</StyledButton>
                    </StyledFieldContainer>
                    <p>
                      Already signed up?{" "}
                      <StyledLink to="/signin">Sign in here</StyledLink>
                    </p>
                  </StyledForm>
                </StyledFormContainer>
              )}
            </Formik>
          </>
        )}
        {currentPage === 1 && (
          <>
            <Formik
              onSubmit={handleFormData}
              initialValues={{
                name: "",
                username: "",
                isOwner: false
              }}
              validationSchema={profileSchema}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div>
                    <label htmlFor="name">Name</label>
                    <Field name="name" placeholder="name" />
                    <ErrorMessage name="name" component="div" />
                  </div>
                  <div>
                    <label htmlFor="username">Username</label>
                    <Field name="username" placeholder="username" />
                    <ErrorMessage name="username" component="div" />
                  </div>
                  <div>
                    <label htmlFor="isOwner">
                      Are you owner of an organization?
                    </label>
                    <Field type="checkbox" name="isOwner" />
                    <ErrorMessage name="isOwner" component="div" />
                  </div>
                  <button
                    style={{ width: "100%" }}
                    disabled={isSubmitting}
                    type="submit"
                  >
                    Create Profile
                  </button>
                </Form>
              )}
            </Formik>
          </>
        )}
        {currentPage === 2 && data.isOwner && (
          <>
            <Formik
              onSubmit={handleCreateOrganization}
              initialValues={{
                name: ""
              }}
              validationSchema={organizationSchema}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div>
                    <label htmlFor="name">Name</label>
                    <Field name="name" placeholder="name" />
                    <ErrorMessage name="name" component="div" />
                  </div>
                  <div>
                    <label htmlFor="permissions">Permissions</label>
                    <div>{renderPermissions()}</div>
                    <div onClick={handleAddItem}>+</div>
                  </div>
                  <button
                    style={{ width: "100%" }}
                    disabled={isSubmitting}
                    type="submit"
                  >
                    Create Profile
                  </button>
                </Form>
              )}
            </Formik>
          </>
        )}
      </StyledContainer>
    </>
  );
};

export default RegisterPage;

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: auto;

  @media only screen and (min-width: 768px) {
    grid-template-columns: 70% 30%;
  }
`;

const StyledHero = styled.div`
  height: 50vh;
  color: #000;
  padding: 2em;
  background: linear-gradient(
      180deg,
      rgba(172, 107, 255, 0.9) 0%,
      rgba(172, 107, 255, 0.9) 0.01%,
      rgba(172, 107, 255, 0) 100%
    ),
    url(${require("../assets/login.jpg")});
  background-size: cover;

  @media only screen and (min-width: 768px) {
    height: 100vh;
  }
`;

const StyledHeroText = styled.h1`
  font-size: 48px;
  font-weight: bold;
  line-height: 1.6em;

  @media only screen and (min-width: 768px) {
    font-size: 72px;
    width: 40%;
  }
`;

const StyledFormContainer = styled.div`
  height: 50vh;
  color: #fff;
  padding: 2em;
  display: grid;
  align-items: center;
  justify-items: center;

  @media only screen and (min-width: 768px) {
    height: 100vh;
  }
`;

const StyledForm = styled(Form)`
  width: 100%;
`;

const StyledFieldContainer = styled.div`
  margin-bottom: 1em;
`;

const StyledHeading = styled.h1`
  font-weight: bold;
  text-shadow: 0px 6px 4px rgba(0, 0, 0, 0.5);
`;

const StyledLabel = styled.label`
  margin-bottom: 0px;
`;

const StyledField = styled(Field)`
  width: 100%;
  background: #525252;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  border: none;
  padding: 0.5em;
  color: #fff;

  &::placeholder {
    color: #a3a3a3;
  }
`;

const StyledButton = styled.button`
  border: none;
  background-color: #c394ff;
  font-weight: 700;
  width: 100%;
  color: #000;
  text-transform: uppercase;
  padding: 0.5em;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  margin-top: 20px;

  &:hover {
    box-shadow: none;
    background-color: #dabcff;
    transform: translateY(1px);
  }
`;

const StyledLink = styled(Link)`
  color: #dabcff;

  &:hover {
    color: #fff;
    text-decoration: none;
  }
  // const StyledCard = styled(Card)
`;
//   width: 40%;
// `;

const StyledIsOwner = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;
`;

const StyledCheckbox = styled.input`
  width: 20px;
  height: 20px;
  border: 2px solid #ffffff;
  box-sizing: border-box;
  margin-right: 20px;
  background-color: transparent;
`;

const StyledText = styled.span`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 29px;

  color: #ffffff;
`;
