import React from "react";
import styled from "styled-components";
import { ContactButton } from "./contact-button";

const LayoutRoot = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 30px;
  box-sizing: border-box;
  overflow-y: scroll;
`;

const Content = styled.div`
  flex: 1;
`;

const Footer = styled.div`
  margin-top: 10px;
  padding: 10px 0px;
  display: flex;
  justify-content: center;
  background-color: rgb(77, 77, 77);
`;

export const Layout: React.FC = ({ children }) => {
  return (
    <LayoutRoot>
      <Content>{children}</Content>
      <Footer>
        <ContactButton />
      </Footer>
    </LayoutRoot>
  );
};
