import { Box, Flex, FlexProps } from "@chakra-ui/react";
import React from "react";

type Props = FlexProps;

const Component: React.FC<Props> = ({ children, ...flexProps }) => {
  return (
    <Box h={flexProps.h ?? "70px"}>
      <Flex
        bgColor="gray.300"
        top={0}
        left={0}
        right={0}
        h="70px"
        zIndex="1"
        {...flexProps}
        position="fixed"
      >
        {children}
      </Flex>
    </Box>
  );
};

export const Header = Component;
