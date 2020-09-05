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
        <input type="hidden" name="name" />
        <input type="hidden" name="email" />
        <textarea name="comment" hidden></textarea>
      </form>
    </>
  );
};

export default Home;
