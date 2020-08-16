import React from "react";
import Img from "gatsby-image";
import { useStaticQuery, graphql } from "gatsby";
import { ImagesQuery } from "../../types/graphql-types";

type ImageProps = {
  className?: string;
  filename:
    | "feature1_speed"
    | "feature2_sturdy"
    | "feature3_transparency"
    | "product";
};

export const Image: React.FC<ImageProps> = ({ className, filename }) => {
  const data: ImagesQuery = useStaticQuery(graphql`
    query Images {
      allFile {
        edges {
          node {
            relativePath
            name
            childImageSharp {
              fixed(width: 1200) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  `);

  const image = data.allFile.edges.find((n) =>
    n.node.relativePath.includes(filename)
  );
  if (!image) {
    return null;
  }

  return <Img className={className} fixed={image.node.childImageSharp.fixed} />;
};
