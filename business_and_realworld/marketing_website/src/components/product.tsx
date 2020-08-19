import React from "react";
import { Image } from "./image";
import styled from "styled-components";

const ProductRoot = styled.div`
  display: grid;
  place-items: center;
`;

const ProductImage = styled(Image)`
  width: 100%;
`;

const ProductName = styled.div`
  font-size: 3rem;
`;

export const Product: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <ProductRoot className={className}>
      <ProductName>DRONE</ProductName>
      <ProductImage filename="product" variant="fluid" />
    </ProductRoot>
  );
};
