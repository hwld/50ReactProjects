import React from "react";
import Img from "gatsby-image";
import { Image } from "./image";
import styled from "styled-components";
import { graphql, useStaticQuery, Link } from "gatsby";
import { FeaturesQuery } from "../../types/graphql-types";

const FeaturesRoot = styled.div`
  text-align: center;
`;

const Label = styled.div`
  font-size: 2rem;
`;

const FeaturesContainer = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const FeatureImage = styled(Image)``;

export const Features: React.FC = () => {
  const data: FeaturesQuery = useStaticQuery(graphql`
    query Features {
      allContentfulFeature {
        edges {
          node {
            name
            slug
            image {
              fixed(width: 400, height: 260) {
                ...GatsbyContentfulFixed
              }
            }
          }
        }
      }
    }
  `);

  return (
    <FeaturesRoot>
      <Label>Features</Label>
      <FeaturesContainer>
        {data.allContentfulFeature.edges.map(({ node }) => (
          <Link to={`/features/${node.slug}`} key={node.slug}>
            <Img fixed={node.image.fixed} />
            <div>{node.name}</div>
          </Link>
        ))}
      </FeaturesContainer>
    </FeaturesRoot>
  );
};
