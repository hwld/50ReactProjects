import React from "react";
import NextImage, { ImageProps as NextImageProps } from "next/image";
import { chakra, ChakraComponent } from "@chakra-ui/system";
import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";

// widthとheightはchakraとバッティングするので別のprops名をつける
type Props = Omit<NextImageProps, "width" | "height"> & {
  imageWidth: number;
  imageHeight: number;
};

const NextImageWithChakra: ChakraComponent<React.FC<Props>> = chakra(
  ({ imageWidth, imageHeight, ...props }) => {
    return <NextImage {...props} height={imageHeight} width={imageWidth} />;
  }
);

const Component: React.FC<Props> = ({
  className,
  imageWidth,
  imageHeight,
  ...props
}) => {
  return (
    <Box className={className}>
      <NextImageWithChakra
        {...props}
        imageWidth={imageWidth}
        imageHeight={imageHeight}
      />
    </Box>
  );
};

export const ComponentWithChakra = chakra(Component);

// NextImageは div > image という構成になっていて、classNameはimageに渡されるのでdivにスタイルを当てるためにemotionを利用する
export const Image = styled(ComponentWithChakra)`
  & > div {
    border-radius: inherit;
  }
`;
