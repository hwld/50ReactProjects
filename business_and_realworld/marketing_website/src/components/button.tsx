import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  font-weight: bold;
  font-size: 1.2rem;
  outline: none;
  color: #ffffffff;
  background-color: #7f5af0ff;
  border: none;
  border-radius: 10px;
  padding: 6px 16px;

  &:hover,
  &:focus {
    cursor: pointer;
    background-color: #7f5af0aa;
    color: #ffffffaa;
  }
`;

const ButtonContent = styled.span``;

export const Button: React.FC<{ className?: string; onClick?: () => void }> = ({
  children,
  className,
  onClick,
}) => {
  return (
    <StyledButton tabIndex={0} className={className} onClick={onClick}>
      <ButtonContent>{children}</ButtonContent>
    </StyledButton>
  );
};
