import React from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";

const PrimaryButton = ({ children, ...props }) => {
  return (
    <StyledButton variant="light" {...props}>
      {children}
    </StyledButton>
  );
};

export default PrimaryButton;

export const StyledButton = styled(Button)`
  background-color: #ac6bff;
  color: #000;
  border: 0px;
  border-radius: 0px;
`;
