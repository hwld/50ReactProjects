import React from "react";
import { Product } from "../components/product";
import styled from "styled-components";
import { Features } from "../components/features";

const PageRoot = styled.div`
  text-align: center;
`;

const StyledProduct = styled(Product)`
  margin: 10px;
  height: 50vh;
`;

const Home: React.FC = () => {
  return (
    <PageRoot>
      <StyledProduct />
      <Features />
    </PageRoot>
  );
};

export default Home;
