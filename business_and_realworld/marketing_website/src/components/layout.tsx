import React from "react";
import styled from "styled-components";
import { ContactButton } from "./contact-button";

const LayoutRoot = styled.div`
  padding: 30px;
`;

export const Layout: React.FC = ({ children }) => {
  return (
    <LayoutRoot>
      {children}
      <ContactButton />
    </LayoutRoot>
  );
};
