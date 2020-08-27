import React from "react";
import { FeatureContext } from "../../gatsby-node";
import styled from "styled-components";
import { Layout } from "../components/layout";

const Root = styled.div`
  display: grid;
  place-items: center;
`;

const Content = styled.div`
  text-align: center;
  word-break: break-all;
  word-wrap: break-word;
  width: 80%;
`;

type FeatureProps = {
  pathContext: FeatureContext;
};

const Feature: React.FC<FeatureProps> = ({ pathContext }) => {
  const contentHtml = pathContext.feature.description.childMarkdownRemark.html;
  return (
    <Layout>
      <Root>
        <Content dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </Root>
    </Layout>
  );
};

export default Feature;
