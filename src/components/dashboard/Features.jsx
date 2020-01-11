import React, { useState } from "react";
import { Row, Col, Modal } from "react-bootstrap";
import { StyledButton } from "../../styles";
import AddFeatureModal from "./AddFeatureModal";

const Features = () => {
  const [showAddFeatureModal, setShowAddFeatureModal] = useState(false);
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
      <Modal
        centered
        show={showAddFeatureModal}
        onHide={() => setShowAddFeatureModal(false)}
      >
        <AddFeatureModal />
      </Modal>
    </div>
  );
};

export default Features;
