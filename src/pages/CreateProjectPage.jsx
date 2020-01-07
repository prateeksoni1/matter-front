import React, { useState } from "react";
import Layout from "../components/Layout";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import { Form, Col, Button } from "react-bootstrap";
import styled from "styled-components";
import AsyncSelect from "react-select/async";
import * as Yup from "yup";
import api from "../api";
import PrimaryButton from "../components/PrimaryButton";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleLeft,
  faArrowCircleRight
} from "@fortawesome/free-solid-svg-icons";

const CreateProjectPage = () => {
  const profile = useSelector(state => state.auth.profile);

  const [contributors, setContributors] = useState([
    {
      profile,
      role: "member"
    }
  ]);

  const validationSchema = Yup.object().shape({
    projectName: Yup.string()
      .required("Project Name cannot be empty")
      .min(4)
      .test("project", "Project already exists", async function(value) {
        try {
          const res = await api.get("/api/project/projects", {
            params: { name: value }
          });
          if (res.data.success) return false;
          return true;
        } catch (err) {
          return false;
        }
      })
  });

  const onSubmit = async values => {
    const { projectName, description } = values;
    const data = {
      projectName,
      description,
      contributors
    };

    if (!contributors.find(contributor => contributor.role === "admin")) {
      return toast.error("Atleast one admin is required");
    }

    try {
      await api.post("/api/project", data);
      toast.success("Project created successfully");
    } catch (err) {
      toast.error("Error creating project");
    }
  };

  const renderMembers = () => {
    return contributors.map((contributor, index) => {
      return (
        <StyledMemberContainer>
          <Col
            xs={7}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start"
            }}
          >
            <span>
              {contributor.profile.name} | @{contributor.profile.username}
            </span>
          </Col>

          <Col xs={5}>
            <StyledFormSelect
              as="select"
              onChange={e => handleRoleSelect(e.target.value, index)}
            >
              <StyledOption value="member" defaultChecked>
                Member
              </StyledOption>
              <StyledOption value="admin">Admin</StyledOption>
              <StyledOption value="developer">Developer</StyledOption>
              <StyledOption value="maintainer">Maintainer</StyledOption>
              <StyledOption value="qa">QA</StyledOption>
            </StyledFormSelect>
          </Col>
        </StyledMemberContainer>
      );
    });
  };

  const fetchMembers = async inputValue => {
    const res = await api.get("/api/profile/profiles", {
      params: { search: inputValue }
    });
    const profiles = res.data.profiles;
    return profiles.map(profile => ({
      label: profile.name,
      value: profile
    }));
  };

  const loadOptions = async (inputValue, callback) => {
    const profiles = await fetchMembers(inputValue);
    callback(profiles);
  };

  const handleMemberSelect = (option, actions) => {
    if (actions.action === "select-option") {
      setContributors([
        ...contributors,
        { profile: option.value, role: "member" }
      ]);
    }
  };

  const handleRoleSelect = (role, index) => {
    const newContributors = [...contributors];
    newContributors[index].role = role;
    setContributors(newContributors);
  };

  return (
    <Layout heading="Create Project">
      <Formik
        onSubmit={onSubmit}
        initialValues={{
          projectName: "",
          description: ""
        }}
        validationSchema={validationSchema}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          errors
        }) => (
          <Form onSubmit={handleSubmit} className="pb-3">
            <Form.Row>
              <StyledCol md={6}>
                <Form.Group>
                  <Form.Label>Project Name</Form.Label>
                  <Form.Control
                    name="projectName"
                    placeholder="Your project name"
                    onChange={handleChange}
                    onBlue={handleBlur}
                    value={values.projectName}
                    isInvalid={touched && errors.projectName}
                    required
                    style={{
                      borderRadius: 0,
                      backgroundColor: "#1E1E1E",
                      color: "#fff"
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.projectName}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    name="description"
                    placeholder="Your project description"
                    as="textarea"
                    rows="5"
                    onChange={handleChange}
                    onBlue={handleBlur}
                    value={values.description}
                    style={{
                      borderRadius: 0,
                      backgroundColor: "#1E1E1E",
                      color: "#fff"
                    }}
                  />
                </Form.Group>
                <Form.Row className="mt-3">
                  <Col>
                    <StyledProjectButton size="lg">
                      <FontAwesomeIcon icon={faArrowCircleLeft} />
                      <span className="ml-2">Go Back</span>
                    </StyledProjectButton>
                  </Col>
                  <Col>
                    <StyledProjectButton size="lg" type="submit">
                      <span className="mr-2">Create</span>
                      <FontAwesomeIcon icon={faArrowCircleRight} />
                    </StyledProjectButton>
                  </Col>
                </Form.Row>
              </StyledCol>
              <StyledCol md={5} className="ml-auto">
                <Form.Group>
                  <Form.Label>Add members</Form.Label>
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
                    loadOptions={loadOptions}
                    controlShouldRenderValue={false}
                    placeholder="Search members"
                    onChange={handleMemberSelect}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Members List</Form.Label>
                  <StyledMembersContainer>
                    {renderMembers()}
                  </StyledMembersContainer>
                </Form.Group>
              </StyledCol>
            </Form.Row>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default CreateProjectPage;

const StyledMembersContainer = styled.div`
  padding: 0.5rem;
  background-color: #1e1e1e;
  border: 1px solid #ced4da;
`;

const StyledMemberContainer = styled(Form.Row)`
  padding: 0.5rem;
  background-color: #1e1e1e;
`;

const StyledFormSelect = styled(Form.Control)`
  background-color: #000;
  color: inherit;
  width: 100%;
  padding: 0.5rem;
`;

const StyledOption = styled.option`
  background-color: #000;

  &:disabled {
    background-color: #000;
  }
`;

const StyledProjectButton = styled(Button)`
  background-color: #000;
  color: #fff;
  width: 100%;
  border-radius: 0px;
  border: 0px;
  text-transform: uppercase;

  &:hover {
    background-color: #ac6bff;
    color: #000;
  }
`;

const StyledCol = styled(Col)`
  margin-left: 2rem;
  margin-right: 2rem;
`;
