import {
  Button,
  Flex,
  Input,
  Text,
  Image,
  Heading,
  Box,
} from "@chakra-ui/react";
import React from "react";

export const HomeMain: React.FC = () => {
  const speakers = [
    { name: "Sample" },
    { name: "Sample" },
    { name: "Sample" },
    { name: "Sample" },
    { name: "Sample" },
    { name: "Sample" },
    { name: "Sample" },
    { name: "Sample" },
  ];

  return (
    <Box maxW="1300px" mx="auto">
      <Flex
        mt="30px"
        p="50px"
        w="100%"
        justify="center"
        align="center"
        direction="column"
      >
        <Heading size="4xl" color="yellow.300">
          🍌BananaConf
        </Heading>
        <Text
          mt="5"
          fontSize="2xl"
          maxW="600px"
          align="center"
          color="yellow.200"
        >
          A conference about bananas for hot monkeys.
          <br /> Discovery of new banana species, new banana dishes, new banana
          benefits.
        </Text>
      </Flex>

      <Flex
        bg="gray.900"
        mt="30px"
        w="100%"
        direction="column"
        align="center"
        justify="center"
      >
        <Input
          mt={10}
          w="50%"
          placeholder="Name"
          borderRadius="0"
          focusBorderColor="yellow.300"
        />
        <Input
          mt={5}
          w="50%"
          placeholder="Email-address"
          borderRadius="0"
          focusBorderColor="yellow.300"
        />
        <Button
          bg="yellow.300"
          _hover={{ bg: "yellow.200" }}
          _active={{ bg: "yellow.400" }}
          color="black"
          pb="2px"
          mt={5}
          mb={10}
          borderRadius="0"
        >
          Buy a Ticket
        </Button>
      </Flex>

      <Text mt="50px" textAlign="center" fontSize="4xl" fontWeight="bold">
        Speakers
      </Text>
      <Flex mt="5px" w="100%" wrap="wrap" justify="center">
        {speakers.map(({ name }, i) => {
          return (
            <Flex
              direction="column"
              align="center"
              justify="center"
              boxSize="300px"
              m="3"
              key={i}
            >
              <Image
                border="2px"
                borderRadius="full"
                borderColor="white"
                boxSize="250px"
                src="https://cdn.dribbble.com/users/418188/screenshots/3719574/whizzly_mascot_logo_design_tubik.png?compress=1&resize=400x300"
              />
              <Text fontSize="xl">{`${name}${i}`}</Text>
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
};
