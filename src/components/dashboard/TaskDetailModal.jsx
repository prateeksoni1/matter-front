import React from "react";
import { Modal } from "react-bootstrap";

const TaskDetailModal = ({ task, handleHideModal, setRefresh }) => {
  return (
    <>
      <Modal.Header>{task.title}</Modal.Header>
    </>
  );
};

export default TaskDetailModal;
