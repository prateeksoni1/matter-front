import React, { useState } from "react";
import { Modal, Form, Table } from "react-bootstrap";
import { Formik } from "formik";
import api from "../../api";
import { StyledButton } from "../../styles";
import * as Yup from "yup";
import { toast } from "react-toastify";

const CreateOrganizationModal = ({
  handleHideOrganizationModal,
  setOrganization
}) => {
  const [rows, setRows] = useState([]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required()
  });

  const handleAddRole = () => {
    setRows([
      ...rows,
      {
        role: "",
        permissions: []
      }
    ]);
  };

  const onSubmit = async values => {
    const { name } = values;
    try {
      const data = {
        name,
        permissionMatrix: rows
      };
      const res = await api.post("/api/organization", data);
      setOrganization(res.data.organization);
      toast.success("Organization created successfully");
      handleHideOrganizationModal();
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleChangeRole = (e, index) => {
    const newRows = [...rows];
    newRows[index].role = e.target.value;
    setRows(newRows);
  };

  const handleChangePermission = (e, permission, index) => {
    const newRows = [...rows];
    const { checked } = e.target;
    if (checked) newRows[index].permissions.push(permission);
    else {
      newRows[index].permissions = newRows[index].permissions.filter(
        item => item !== permission
      );
    }
    setRows(newRows);
  };

  const renderRows = () => {
    return rows.map((_, index) => (
      <tr>
        <td>
          <Form.Control
            placeholder="Role"
            onChange={e => handleChangeRole(e, index)}
          />
        </td>
        <td>
          <Form.Check
            type="checkbox"
            onChange={e => handleChangePermission(e, "create-project", index)}
          />
        </td>
        <td>
          <Form.Check
            type="checkbox"
            onChange={e => handleChangePermission(e, "edit-project", index)}
          />
        </td>
        <td>
          <Form.Check
            type="checkbox"
            onChange={e => handleChangePermission(e, "edit-permissions", index)}
          />
        </td>
        <td>
          <Form.Check
            type="checkbox"
            onChange={e => handleChangePermission(e, "delete-project", index)}
          />
        </td>
        <td>
          <Form.Check
            type="checkbox"
            onChange={e => handleChangePermission(e, "create-task", index)}
          />
        </td>
        <td>
          <Form.Check
            type="checkbox"
            onChange={e => handleChangePermission(e, "edit-task", index)}
          />
        </td>
        <td>
          <Form.Check
            type="checkbox"
            onChange={e => handleChangePermission(e, "delete-task", index)}
          />
        </td>
        <td>
          <Form.Check
            type="checkbox"
            onChange={e =>
              handleChangePermission(e, "mark-task-complete", index)
            }
          />
        </td>
        <td>
          <Form.Check
            type="checkbox"
            onChange={e =>
              handleChangePermission(e, "mark-task-testing", index)
            }
          />
        </td>
        <td>
          <Form.Check
            type="checkbox"
            onChange={e =>
              handleChangePermission(e, "mark-task-deployed", index)
            }
          />
        </td>
        <td>
          <Form.Check
            type="checkbox"
            onChange={e =>
              handleChangePermission(e, "mark-task-incomplete", index)
            }
          />
        </td>
      </tr>
    ));
  };

  return (
    <>
      <Modal.Header>Create Organization Now</Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ name: "" }}
          onSubmit={onSubmit}
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
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
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
                      <td>Role\Permissions</td>
                      <td>Create Project</td>
                      <td>Edit Project</td>
                      <td>Edit Permissions</td>
                      <td>Delete Project</td>
                      <td>Create Task</td>
                      <td>Edit Task</td>
                      <td>Delete Task</td>
                      <td>Mark Task Complete</td>
                      <td>Mark Task Testing</td>
                      <td>Mark Task Deployed</td>
                      <td>Mark Task Incomplete</td>
                    </tr>
                  </thead>
                  <tbody>{renderRows()}</tbody>
                </Table>
                <StyledButton onClick={handleAddRole}>Add a role</StyledButton>
              </Form.Group>
              <Form.Group>
                <StyledButton type="submit">Create Organization</StyledButton>
              </Form.Group>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </>
  );
};

export default CreateOrganizationModal;
