import React from "react";
import { Modal, Form, Col } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { StyledButton } from "../../styles";
import api from "../../api";
import { toast } from "react-toastify";

const AddTaskModal = ({ type, handleHideModal, setRefresh }) => {
  const project = useSelector(state => state.project.currentProject);

  const onSubmit = async values => {
    const data = {
      ...values,
      type,
      projectId: project._id
    };
    try {
      await api.post("/api/project/task", data);
      setRefresh(true);
      handleHideModal();
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const renderContributorOptions = () => {
    return project.contributors.map(contributor => {
      return (
        <option value={contributor._id}>{contributor.profile.name}</option>
      );
    });
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required()
      .min(4),
    description: Yup.string(),
    priority: Yup.string().required(),
    assignedBy: Yup.string().required(),
    assignedTo: Yup.array().required()
  });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Add Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          onSubmit={onSubmit}
          initialValues={{
            title: "",
            description: "",
            priority: "1",
            assignedTo: [],
            assignedBy: project.contributors.find(
              contributor => contributor.role === "admin"
            )._id
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
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="title"
                  value={values.title}
                  isInvalid={touched.title && errors.title}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  name="description"
                  onBlur={handleBlur}
                  value={values.description}
                  isInvalid={touched.description && errors.description}
                  as="textarea"
                  rows="3"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Priority</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="priority"
                  value={values.priority}
                  isInvalid={touched.priority && errors.priority}
                  as="select"
                >
                  <option value={0}>Not Important - 0</option>
                  <option value={1}>Important - 1</option>
                  <option value={2}>High Priority - 2</option>
                  <option value={3}>Urgent - 3</option>
                </Form.Control>
              </Form.Group>
              <Form.Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Assigned to</Form.Label>
                    <Form.Control
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="assignedTo"
                      value={values.assignedTo}
                      isInvalid={touched.assignedTo && errors.assignedTo}
                      as="select"
                      multiple
                    >
                      {renderContributorOptions()}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Assigned By</Form.Label>
                    <Form.Control
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="assignedBy"
                      value={values.assignedBy}
                      isInvalid={touched.assignedBy && errors.assignedBy}
                      as="select"
                    >
                      {renderContributorOptions()}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Form.Row>
              <StyledButton type="submit" style={{ width: "100%" }}>
                Add Task
              </StyledButton>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </>
  );
};

export default AddTaskModal;
