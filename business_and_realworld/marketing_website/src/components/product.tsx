import React from "react";
import { Image } from "./image";
import styled from "styled-components";

const ProductImage = styled(Image)`
  margin: 0 auto;
  width: 100%;
`;

const ProductName = styled.div`
  text-align: center;
  font-size: 3rem;
`;

export const Product: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={className}>
      <ProductName>DRONE</ProductName>
      <ProductImage filename="product" />
    </div>
  );
};
