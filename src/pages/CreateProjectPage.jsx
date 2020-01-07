import React, { useState } from "react";
import Layout from "../components/Layout";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import { Form, Col } from "react-bootstrap";
import styled from "styled-components";
import AsyncSelect from "react-select/async";
import api from "../api";

const CreateProjectPage = () => {
  const profile = useSelector(state => state.auth.profile);

  const [contributors, setContributors] = useState([
    {
      profile,
      role: "admin"
    }
  ]);

  const onSubmit = values => {
    console.log(values);
  };

  const renderMembers = () => {
    return contributors.map(contributor => {
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
            <StyledFormSelect as="select">
              <StyledOption disabled selected>
                Select a role
              </StyledOption>
              <StyledOption value="admin">Admin</StyledOption>
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
      value: profile.name
    }));
  };

  const loadOptions = async (inputValue, callback) => {
    const profiles = await fetchMembers(inputValue);
    callback(profiles);
  };

  return (
    <Layout heading="Create Project">
      <Formik
        onSubmit={onSubmit}
        initialValues={{
          name: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: ""
        }}
        // validationSchema={schema}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          errors
        }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Row>
              <Col>
                <Form.Group>
                  <Form.Label>Project Name</Form.Label>
                  <Form.Control
                    name="projectName"
                    placeholder="Your project name"
                    style={{
                      borderRadius: 0,
                      backgroundColor: "#1E1E1E",
                      color: "#fff"
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    name="description"
                    placeholder="Your project description"
                    as="textarea"
                    rows="5"
                    style={{
                      borderRadius: 0,
                      backgroundColor: "#1E1E1E",
                      color: "#fff"
                    }}
                  />
                </Form.Group>
              </Col>
              <Col>
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
                  />
                </Form.Group>
                <StyledMembersContainer>
                  {renderMembers()}
                </StyledMembersContainer>
              </Col>
            </Form.Row>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default CreateProjectPage;

const StyledMembersContainer = styled.div`
  padding: 1rem;
  background-color: #000;
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
