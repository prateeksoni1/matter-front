import React, { useState } from "react";
import { Row, Col, Modal } from "react-bootstrap";
import { StyledButton } from "../../styles";
import AddFeatureModal from "./AddFeatureModal";

const Features = () => {
  const [showAddFeatureModal, setShowAddFeatureModal] = useState(false);

  const handleHideModal = () => setShowAddFeatureModal(false);

  return (
    <div>
      <Row>
        <Col md={3}>
          <StyledButton
            style={{ width: "100%" }}
            onClick={() => setShowAddFeatureModal(true)}
          >
            Add feature
          </StyledButton>
        </Col>
      </Row>
      <Modal centered show={showAddFeatureModal} onHide={handleHideModal}>
        <AddFeatureModal handleHideModal={handleHideModal} />
      </Modal>
    </div>
  );
};

export default Features;
