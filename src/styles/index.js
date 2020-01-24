import styled from "styled-components";
import { Button } from "react-bootstrap";

export const StyledButton = styled(Button)`
  background-color: #000;
  color: #fff;
  border-radius: 0px;
  border: 0px;
  text-transform: uppercase;

  &:hover {
    ${props =>
      !props.disabled &&
      ` 
    background-color: #ac6bff;
    color: #000;`}
  }
`;
