import React from "react";
import Img, { GatsbyImageFluidProps } from "gatsby-image";
import styled from "styled-components";
import { useStaticQuery, graphql } from "gatsby";
import { ProductQuery } from "../../types/graphql-types";

const ProductRoot = styled.div`
  display: grid;
  place-items: center;
  text-align: center;
`;

const ProductName = styled.div`
  font-size: 3rem;
`;

const ProductDescription = styled.div`
  font-size: 2rem;
`;

// 型を指定しないとpropsの型情報が無くなる
const ProductImage: React.FC<GatsbyImageFluidProps> = styled(Img)`
  width: 80%;
  height: 80%;
`;

export const Product: React.FC<{ className?: string }> = ({ className }) => {
  const data: ProductQuery = useStaticQuery(graphql`
    query Product {
      contentfulProduct {
        name
        description {
          description
        }
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
      <ProductDescription>
        {data.contentfulProduct.description.description}
      </ProductDescription>
      <ProductImage fluid={data.contentfulProduct.image.fluid} />
    </ProductRoot>
  );
};
