import { Button, Flex, FlexProps } from "@chakra-ui/react";
import React, { useState } from "react";
import { MdClear, MdPanoramaFishEye, MdReplay } from "react-icons/md";

type Props = { className?: string } & FlexProps;

const Component: React.FC<Props> = ({ className, ...styleProps }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Flex className={className} justify="center" align="center" {...styleProps}>
      {isOpen && (
        <Button
          colorScheme="blue"
          boxSize="70px"
          borderRadius="100%"
          mr={3}
          onClick={() => setIsOpen(false)}
        >
          <MdPanoramaFishEye size={30} />
        </Button>
      )}
      {!isOpen && (
        <Button
          colorScheme="green"
          boxSize="70px"
          onClick={() => setIsOpen(true)}
        >
          <MdReplay size={30} />
        </Button>
      )}
      {isOpen && (
        <Button
          colorScheme="red"
          boxSize="70px"
          borderRadius="100%"
          ml={3}
          onClick={() => setIsOpen(false)}
        >
          <MdClear size={30} />
        </Button>
      )}
    </Flex>
  );
};

export const OperationBar = Component;
