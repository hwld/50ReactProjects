import React, { useRef, ButtonHTMLAttributes } from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  outline: none;
  color: #ffffffff;
  background-color: #7f5af0ff;
  border: none;
  border-radius: 4px;
  margin: 8px;
  padding: 6px 16px;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.75;

  &:hover,
  &:focus {
    cursor: pointer;
    background-color: #7f5af0aa;
    color: #ffffffaa;
  }

  &:disabled {
    cursor: auto;
    background-color: #7f5af05f;
    color: #ffffff5f;
  }
`;

const ButtonContent = styled.span``;

export const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick = () => {},
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    buttonRef.current.blur();
    onClick(event);
  };

  return (
    <StyledButton
      {...props}
      ref={buttonRef}
      tabIndex={0}
      className={className}
      onClick={handleClick}
    >
      <ButtonContent>{children}</ButtonContent>
    </StyledButton>
  );
};
