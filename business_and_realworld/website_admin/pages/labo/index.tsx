import { Button, Center, VStack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useQuery } from "react-query";

const fetcher = async () => {
  return Math.floor(Math.random() * 1000);
};

const Child: React.FC = () => {
  const { data } = useQuery("key", fetcher, {
    refetchOnMount: false,
    cacheTime: 1000,
  });

  return (
    <VStack bg="gray.500" boxSize="300px" p={3} mt={3}>
      <Text>Child: {data}</Text>
    </VStack>
  );
};

const Parent: React.FC = () => {
  const { data } = useQuery("key", fetcher, {
    refetchOnMount: false,
    cacheTime: 1000,
  });
  const [isOpen, setIsOpen] = useState(false);

  return (
    <VStack bg="gray.400" boxSize="400px" p={3} mt={3}>
      <Text>Parent: {data}</Text>
      <Button
        onClick={() => {
          setIsOpen((s) => !s);
        }}
      >
        Click
      </Button>
      {isOpen && <Child />}
    </VStack>
  );
};

const New: React.FC = () => {
  const { data } = useQuery("key", fetcher, {
    refetchOnMount: false,
    cacheTime: 1000,
  });

  return (
    <VStack bg="gray.400" boxSize="400px" p={3} mt={3}>
      <Text>New: {data}</Text>
    </VStack>
  );
};

export default function LaboPage(): JSX.Element {
  const [isDisplay, setisDisplay] = useState(false);
  const [isDisplay2, setIsDisplay2] = useState(false);

  return (
    <Center>
      <VStack bg="gray.300" boxSize="500px" mt={10} p={3}>
        <Button onClick={() => setisDisplay((s) => !s)}>CLICK</Button>
        {isDisplay && <Parent />}
      </VStack>
      <VStack bg="gray.300" boxSize="500px" mt={10} ml={1} p={3}>
        <Button onClick={() => setIsDisplay2((s) => !s)}>Click</Button>
        {isDisplay2 && <New />}
      </VStack>
    </Center>
  );
}
