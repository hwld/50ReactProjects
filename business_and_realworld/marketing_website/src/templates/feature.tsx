import React from "react";
import { FeatureContext } from "../../gatsby-node";
import styled from "styled-components";

const Root = styled.div`
  display: grid;
  place-items: center;
`;

const Content = styled.div`
  text-align: center;
  word-wrap: break-word;
  width: 80%;
`;

type FeatureProps = {
  pathContext: FeatureContext;
};

const Feature: React.FC<FeatureProps> = ({ pathContext }) => {
  const contentHtml = pathContext.feature.description.childMarkdownRemark.html;
  return (
    <Root>
      <Content dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </Root>
  );
};

export default Feature;
