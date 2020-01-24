import React, { useState, useEffect } from "react";
import { Row, Col, Modal } from "react-bootstrap";
import { StyledButton } from "../../styles";
import AddTaskModal from "./AddTaskModal";
import { useSelector } from "react-redux";
import api from "../../api";
import Task from "./Task";
import TaskDetailModal from "./TaskDetailModal";

const Bugs = () => {
  const [showAddBugModal, setShowAddBugModal] = useState(false);
  const [showBugDetailModal, setShowBugDetailModal] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [bugs, setBugs] = useState([]);
  const [selectedBug, setSelectedBug] = useState();
  const handleHideBugsModal = () => setShowAddBugModal(false);
  const handleHideBugDetailModal = () => setShowBugDetailModal(false);

  const project = useSelector(state => state.project.currentProject);
  const permissions = useSelector(state => state.project.permissions);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get(`/api/project/tasks`, {
        params: { projectId: project._id, type: "bug" }
      });
      setBugs(res.data.bugs);
    };
    if (refresh) {
      fetchData();
      setRefresh(false);
    }
  }, [project._id, refresh]);

  const renderBugs = () => {
    return bugs.map(bug => (
      <Col
        md={3}
        onClick={() => {
          setSelectedBug(bug);
          setShowBugDetailModal(true);
        }}
      >
        <Task task={bug} />
      </Col>
    ));
  };

  return (
    <div>
      <Row>
        <Col md={3}>
          <StyledButton
            style={{ width: "100%" }}
            disabled={!permissions.includes("create-task")}
            onClick={() => setShowAddBugModal(true)}
          >
            Add Bug
          </StyledButton>
        </Col>
        <Col md={9}>
          <Row>{renderBugs()}</Row>
        </Col>
      </Row>
      <Modal centered show={showAddBugModal} onHide={handleHideBugsModal}>
        <AddTaskModal
          type="bug"
          handleHideModal={handleHideBugsModal}
          setRefresh={setRefresh}
        />
      </Modal>
      <Modal
        centered
        show={showBugDetailModal}
        onHide={handleHideBugDetailModal}
      >
        <TaskDetailModal
          task={selectedBug}
          handleHideModal={handleHideBugDetailModal}
          setRefresh={setRefresh}
        />
      </Modal>
    </div>
  );
};

export default Bugs;
