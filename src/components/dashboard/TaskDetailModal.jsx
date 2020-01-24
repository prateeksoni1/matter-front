import React from "react";
import { Modal } from "react-bootstrap";

const TaskDetailModal = ({ task, handleHideModal, setRefresh }) => {
  const { title, description, assignedTo, assignedBy, priority } = task;

  const renderAssignedToList = () => {
    return assignedTo.map(contributor => <div>{contributor.profile.name}</div>);
  };

  return (
    <>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Body>
        <div>{description}</div>
        <div>
          Assigned to: <br />
          {renderAssignedToList()}
        </div>
        <div>Assigned by: {assignedBy.profile.name}</div>
        <div>Priority: {priority}</div>
      </Modal.Body>
    </>
  );
};

export default TaskDetailModal;
