import React from "react";
import { Image } from "./image";

export const Features: React.FC = () => {
  return (
    <div>
      <div>Features</div>
      <Image filename="feature1_speed" />
      <Image filename="feature2_sturdy" />
      <Image filename="feature3_transparency" />
    </div>
  );
};
