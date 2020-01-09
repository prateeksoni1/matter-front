import styled from "styled-components";
import { Button } from "react-bootstrap";

export const StyledButton = styled(Button)`
  background-color: #000;
  color: #fff;
  /* width: 100%; */
  border-radius: 0px;
  border: 0px;
  text-transform: uppercase;

  &:hover {
    background-color: #ac6bff;
    color: #000;
  }
`;
