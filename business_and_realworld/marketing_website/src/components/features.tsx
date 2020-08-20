import React from "react";
import { Image } from "./image";
import styled from "styled-components";

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
  return (
    <FeaturesRoot>
      <Label>Features</Label>
      <FeaturesContainer>
        <div>
          <FeatureImage filename="feature1_speed" variant="fixed" />
          <div>Hight Speed</div>
        </div>
        <div>
          <FeatureImage filename="feature2_sturdy" variant="fixed" />
          <div>Heavy duty</div>
        </div>
        <div>
          <FeatureImage filename="feature3_transparency" variant="fixed" />
          <div>Transparent</div>
        </div>
      </FeaturesContainer>
    </FeaturesRoot>
  );
};
