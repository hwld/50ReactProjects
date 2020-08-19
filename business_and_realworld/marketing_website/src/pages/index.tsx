import React from "react";
import { Product } from "../components/product";
import styled from "styled-components";
import { Features } from "../components/features";

const PageRoot = styled.div``;

const StyledProduct = styled(Product)`
  margin: 30px;
`;

const StyledFeatures = styled(Features)``;

const Home: React.FC = () => {
  return (
    <PageRoot>
      <StyledProduct />
      <Features />
    </PageRoot>
  );
};

export default Home;
