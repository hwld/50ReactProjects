import React from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";

type Props = {
  className?: string;
} & NextLinkProps &
  ChakraLinkProps;

const Component: React.FC<Props> = (props) => {
  return (
    <NextLink {...props}>
      <ChakraLink {...props} _hover={{ textDecor: "none" }}>
        {props.children}
      </ChakraLink>
    </NextLink>
  );
};

export const Link = Component;
