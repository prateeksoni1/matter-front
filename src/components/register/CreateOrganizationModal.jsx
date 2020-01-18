import React, { useState } from "react";
import { Modal, Form, Table } from "react-bootstrap";
import { Formik } from "formik";

const CreateOrganizationModal = ({ handleHideOrganizationModal }) => {
  const [rows, setRows] = useState([]);

  const renderRows = () => {
    return rows.map(row => (
      <tr>
        <td>
          <input />
        </td>
        <td>
          <input />
        </td>
        <td>
          <input />
        </td>
        <td>
          <input />
        </td>
        <td>
          <input />
        </td>
        <td>
          <input />
        </td>
        <td>
          <input />
        </td>
        <td>
          <input />
        </td>
        <td>
          <input />
        </td>
        <td>
          <input />
        </td>
      </tr>
    ));
  };

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        role: "",
        permissions: []
      }
    ]);
  };

  const onSubmit = values => {
    console.log(values);
  };

  return (
    <>
      <Modal.Header>Create Organization Now</Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ name: "", permissionMatrix: "" }}
          onSubmit={onSubmit}
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
                <Form.Label>Name</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  handleBlur={handleBlur}
                  value={values.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Role\Permission</th>
                      <th>Edit Permissions</th>
                      <th>Create Project</th>
                      <th>Delete Project</th>
                      <th>Edit Project</th>
                      <th>Create Task</th>
                      <th>Edit Task</th>
                      <th>Delete Task</th>
                      <th>Mark Task Incomplete</th>
                      <th>Mark Task Complete</th>
                      <th>Mark Task Testing</th>
                      <th>Mark Task Deployed</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <button onClick={handleAddRow}>Add</button>
                    </tr>
                  </tbody>
                </Table>
              </Form.Group>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </>
  );
};

export default CreateOrganizationModal;
