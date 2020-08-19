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
  variant: "fixed" | "fluid";
};

export const Image: React.FC<ImageProps> = ({
  className,
  filename,
  variant,
}) => {
  const data: ImagesQuery = useStaticQuery(graphql`
    query Images {
      allFile {
        edges {
          node {
            relativePath
            name
            childImageSharp {
              fluid(maxWidth: 1300, quality: 100) {
                ...GatsbyImageSharpFluid
                ...GatsbyImageSharpFluidLimitPresentationSize
              }
              fixed(width: 400, height: 260) {
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

  return (
    <Img
      className={className}
      fluid={variant === "fluid" && image.node.childImageSharp.fluid}
      fixed={variant == "fixed" && image.node.childImageSharp.fixed}
    />
  );
};
