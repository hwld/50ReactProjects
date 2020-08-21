import { GatsbyNode } from "gatsby";
import {
  ContentfulFeatureConnection,
  ContentfulFeature,
} from "../types/graphql-types";
import path = require("path");

type Result = {
  allContentfulFeature: ContentfulFeatureConnection;
};

export type FeatureContext = {
  feature: ContentfulFeature;
};

const query = `
  query {
    allContentfulFeature {
      edges {
        node {
          slug
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`;

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions: { createPage },
}) => {
  const result = await graphql<Result>(query);

  result.data.allContentfulFeature.edges.forEach(({ node }) => {
    createPage<FeatureContext>({
      path: `/features/${node.slug}`,
      component: path.resolve("./src/templates/feature.tsx"),
      context: { feature: node },
    });
  });
};
