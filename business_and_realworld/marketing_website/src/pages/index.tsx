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
      <form
        name="contact"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        hidden
      >
        <input name="name1" />
        <input name="email" />
        <input name="name2" />
        <input name="name3" />
        <input name="name4" />
      </form>
    </>
  );
};

export default Home;
