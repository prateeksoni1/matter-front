import React from "react";
import { Modal, Row, Col, Dropdown, DropdownButton } from "react-bootstrap";
import styled from "styled-components";
import { useSelector } from "react-redux";
import api from "../../api";
import { PERMISSIONS_PER_STATUS, PRIORITIES } from "../../utils/constants";

const TaskDetailModal = ({ task, handleHideModal, setRefresh }) => {
  const { title, description, assignedTo, assignedBy, priority, status } = task;

  const permissions = useSelector(state => state.project.permissions);
  const project = useSelector(state => state.project.currentProject);

  const renderAssignedToList = () => {
    return assignedTo.map(contributor => (
      <StyledMember>{contributor.profile.name}</StyledMember>
    ));
  };

  const handleMenuClick = async status => {
    await api.put(`/api/project/task/${task._id}`, {
      projectId: project._id,
      status,
      permission: PERMISSIONS_PER_STATUS[status]
    });
    setRefresh(true);
  };

  return (
    <StyledContainer>
      <StyledHeader>
        <div>{title}</div>
        <DropdownButton title="Settings">
          <Dropdown.Item>Edit</Dropdown.Item>
          <Dropdown.Item
            onClick={() => handleMenuClick("COMPLETE")}
            disabled={!permissions.includes(PERMISSIONS_PER_STATUS.COMPLETE)}
          >
            Mark as Complete
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => handleMenuClick("DEPLOYED")}
            disabled={!permissions.includes(PERMISSIONS_PER_STATUS.DEPLOYED)}
          >
            Mark as Deployed
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => handleMenuClick("TESTING")}
            disabled={!permissions.includes(PERMISSIONS_PER_STATUS.TESTING)}
          >
            Mark as Testing
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => handleMenuClick("INCOMPLETE")}
            disabled={!permissions.includes(PERMISSIONS_PER_STATUS.INCOMPLETE)}
          >
            Mark as Incomplete
          </Dropdown.Item>
        </DropdownButton>
      </StyledHeader>
      <StyledBody>
        <StyledDescription>{description}</StyledDescription>
        <StyledRow>
          <Col xs={2}>
            <StyledLabel>Assigned to: </StyledLabel>
          </Col>
          <Col xs={10}>{renderAssignedToList()}</Col>
        </StyledRow>
        <StyledRow>
          <Col xs={2}>
            <StyledLabel>Assigned by: </StyledLabel>
          </Col>
          <Col xs={10}>
            <StyledMember>{assignedBy.profile.name}</StyledMember>
          </Col>
        </StyledRow>
        <StyledRow>
          <Col xs={2}>
            <StyledLabel>Priority: </StyledLabel>
          </Col>
          <Col xs={10}>
            <StyledMember bg={PRIORITIES[priority].color}>
              {PRIORITIES[priority].label}
            </StyledMember>
          </Col>
        </StyledRow>
        <StyledRow>
          <Col xs={2}>
            <StyledLabel>Status: </StyledLabel>
          </Col>
          <Col xs={10}>
            <StyledStatusContainer>
              {status.toUpperCase()}
            </StyledStatusContainer>
          </Col>
        </StyledRow>
      </StyledBody>
    </StyledContainer>
  );
};

export default TaskDetailModal;

const StyledContainer = styled.div`
  background-color: #1e1e1e;
  color: #fff;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.25);
`;

const StyledHeader = styled(Modal.Header)`
  background-color: #000;
`;

const StyledBody = styled(Modal.Body)`
  padding: 1rem;
`;

const StyledDescription = styled.div`
  margin: 1rem 0px;
`;

const StyledMember = styled.span`
  background-color: ${props => props.bg || "#000"};
  color: ${props => (props.bg ? "#000" : "#fff")};
  padding: 0.4rem 0.4rem;
`;

const StyledLabel = styled.span`
  /* margin-right: 0.4rem; */
`;

const StyledRow = styled(Row)`
  margin-bottom: 1rem;
`;

const StyledStatusContainer = styled.span`
  background-color: #ac6bff;
  color: #000;
  padding: 0.4rem 0.4rem;
`;
