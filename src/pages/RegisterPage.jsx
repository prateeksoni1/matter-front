import React, { useState, useEffect } from "react";
import { Card, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import AsyncSelect from "react-select/async";

import api from "../api";
import { setProfile, setRegisterForm } from "../actions";
import PrimaryButton, { StyledButton } from "../components/PrimaryButton";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import CreateOrganizationModal from "../components/register/CreateOrganizationModal";

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
    dispatch(setRegisterForm(values));
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
    <StyledContainer>
      <StyledCard>
        <Card.Body>
          <Card.Title>Register to Matter</Card.Title>

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
                  <Form>
                    <div>
                      <label htmlFor="email">Email</label>
                      <Field type="email" name="email" placeholder="email" />
                      <ErrorMessage name="email" component="div" />
                    </div>
                    <div>
                      <label htmlFor="password">Password</label>
                      <Field type="password" name="password" />
                      <ErrorMessage name="password" component="div" />
                    </div>
                    <div>
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <Field type="password" name="confirmPassword" />
                      <ErrorMessage name="confirmPassword" component="div" />
                    </div>
                    <button
                      style={{ width: "100%" }}
                      disabled={isSubmitting}
                      type="submit"
                    >
                      Continue
                    </button>
                  </Form>
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
