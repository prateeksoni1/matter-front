import React from "react";
import { Modal, Form } from "react-bootstrap";
import { Formik } from "formik";

const AddFeatureModal = () => {
  const onSubmit = values => {
    console.log(values);
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Add Feature</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          onSubmit={onSubmit}
          initialValues={{
            title: "",
            description: "",
            priority: ""
          }}
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
                  value={values.title}
                  isInvalid={touched.title && errors.title}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  isInvalid={touched.description && errors.description}
                  as="textarea"
                  rows="3"
                />
              </Form.Group>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </>
  );
};

export default AddFeatureModal;
