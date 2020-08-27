import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  font-weight: bold;
  font-size: 14px;
  outline: none;
  width: 200px;
  height: 50px;
  color: #ffffffff;
  background-color: #7f5af0ff;
  border: none;
  border-radius: 10px;

  &:hover {
    cursor: pointer;
    background-color: #7f5af0aa;
    color: #ffffffaa;
  }
`;

export const ContactButton: React.FC = () => {
  return <StyledButton type="button">Contact us</StyledButton>;
};
