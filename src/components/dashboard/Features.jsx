import React, { useState, useEffect } from "react";
import { Row, Col, Modal } from "react-bootstrap";
import { StyledButton } from "../../styles";
import AddTaskModal from "./AddTaskModal";
import { useSelector } from "react-redux";
import api from "../../api";
import Task from "./Task";
import TaskDetailModal from "./TaskDetailModal";

const Features = () => {
  const [showAddFeatureModal, setShowAddFeatureModal] = useState(false);
  const [showFeatureDetailModal, setShowFeatureDetailModal] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [features, setFeatures] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState();
  const handleHideFeatureModal = () => setShowAddFeatureModal(false);
  const handleHideFeatureDetailModal = () => setShowFeatureDetailModal(false);

  const project = useSelector(state => state.project.currentProject);
  const permissions = useSelector(state => state.project.permissions);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get(`/api/project/tasks`, {
        params: { projectId: project._id, type: "feature" }
      });
      setFeatures(res.data.features);
    };
    if (refresh) {
      fetchData();
      setRefresh(false);
    }
  }, [project._id, refresh]);

  const renderFeatures = () => {
    return features.map(feature => (
      <Col
        md={3}
        onClick={() => {
          setSelectedFeature(feature);
          setShowFeatureDetailModal(true);
        }}
      >
        <Task task={feature} />
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
            onClick={() => setShowAddFeatureModal(true)}
          >
            Add feature
          </StyledButton>
        </Col>
        <Col md={9}>
          <Row>{renderFeatures()}</Row>
        </Col>
      </Row>
      <Modal
        centered
        show={showAddFeatureModal}
        onHide={handleHideFeatureModal}
      >
        <AddTaskModal
          type="feature"
          handleHideModal={handleHideFeatureModal}
          setRefresh={setRefresh}
        />
      </Modal>
      <Modal
        centered
        show={showFeatureDetailModal}
        onHide={handleHideFeatureDetailModal}
      >
        <TaskDetailModal
          task={selectedFeature}
          handleHideModal={handleHideFeatureDetailModal}
          setRefresh={setRefresh}
        />
      </Modal>
    </div>
  );
};

export default Features;
