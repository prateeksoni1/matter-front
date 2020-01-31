import React from "react";
import { Card } from "react-bootstrap";
import styled from "styled-components";
import moment from "moment";
import { PRIORITIES } from "../../utils/constants";

const Task = ({ task }) => {
  const { title, description, startedOn, priority } = task;
  return (
    <StyledCard bg={priority}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <div>{description}</div>
        <div>Started on: {moment(startedOn).format("DD-MM-YYYY")}</div>
        <div>Priority: {priority}</div>
      </Card.Body>
    </StyledCard>
  );
};

export default Task;

const StyledCard = styled(Card)`
  color: #000;
  background-color: ${props => PRIORITIES[props.bg].color};
  margin-bottom: 1em;
`;
