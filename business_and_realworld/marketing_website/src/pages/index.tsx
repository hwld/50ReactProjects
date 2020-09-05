import React from "react";
import { Product } from "../components/product";
import styled from "styled-components";
import { Features } from "../components/features";
import { Layout } from "../components/layout";

const StyledProduct = styled(Product)`
  margin-bottom: 30px;
`;

const Home: React.FC = () => {
  return (
    <>
      <Layout>
        <StyledProduct />
        <Features />
      </Layout>
    </>
  );
};

export default Home;
