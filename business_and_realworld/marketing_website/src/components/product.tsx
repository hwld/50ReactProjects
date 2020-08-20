import React from "react";
import Img, { GatsbyImageFluidProps } from "gatsby-image";
import styled from "styled-components";
import { useStaticQuery, graphql } from "gatsby";
import { ProductQuery } from "../../types/graphql-types";

const ProductRoot = styled.div`
  display: grid;
  place-items: center;
`;

// 型を指定しないとpropsの型情報が無くなる
const ProductImage: React.FC<GatsbyImageFluidProps> = styled(Img)`
  width: 80%;
  height: 80%;
`;

const ProductName = styled.div`
  font-size: 3rem;
`;

export const Product: React.FC<{ className?: string }> = ({ className }) => {
  const data: ProductQuery = useStaticQuery(graphql`
    query Product {
      contentfulProduct {
        name
        image {
          fluid(maxWidth: 1300, quality: 100) {
            ...GatsbyContentfulFluid
          }
        }
      }
    }
  `);

  return (
    <ProductRoot className={className}>
      <ProductName>{data.contentfulProduct.name}</ProductName>
      <ProductImage fluid={data.contentfulProduct.image.fluid} />
    </ProductRoot>
  );
};
