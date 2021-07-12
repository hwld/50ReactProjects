import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Flex, IconButton, Input } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React, { ChangeEventHandler, useState } from "react";
import { v4 as uuid } from "uuid";
import { Survey, SurveyItem, SurveyRadioItem } from "../../type/survey";
import { SurveyItemCreator } from "./SurveyItemCreator";

type Props = {};

const Component: React.FC<Props> = ({}) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [items, setItems] = useState<SurveyItem[]>([]);

  const handleChangeTitle: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setTitle(value);
  };

  const handleChangeDescription: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setDescription(value);
  };

  const handleAddItem = () => {
    const radioItem: SurveyRadioItem = {
      // フロント側で仮のidをつける
      id: uuid(),
      type: "Radio",
      question: "",
      choices: ["選択肢1"],
    };
    setItems((items) => [...items, radioItem]);
  };

  const handleChangeItem = (newItem: SurveyItem) => {
    setItems((items) => {
      return items.map((item) => {
        if (newItem.id !== item.id) {
          return item;
        }

        return newItem;
      });
    });
  };

  const handleDeleteItem = (itemId: string) => {
    setItems((items) => items.filter((item) => item.id !== itemId));
  };

  const createSurvey = async () => {
    const survey: Survey = {
      id: "temp",
      title,
      description,
      items,
    };
    await fetch("/api/surveys", {
      method: "POST",
      body: JSON.stringify(survey),
    });

    router.push("/");
  };

  return (
    <Box minH="100vh" bgColor="gray.600">
      <Box h="70px">
        <Flex
          position="fixed"
          bgColor="gray.300"
          top={0}
          left={0}
          right={0}
          h="70px"
          zIndex="1"
          justifyContent="flex-end"
        >
          <Button
            colorScheme="blue"
            onClick={createSurvey}
            isDisabled={error}
            position="relative"
            right={0}
            mt={3}
            mr={3}
          >
            調査を作成
          </Button>
        </Flex>
      </Box>
      <Flex w="800px" mt={10} mx="auto">
        <Box flexGrow={1}>
          <Box bgColor="gray.700" p={10} borderRadius="10px" boxShadow="md">
            <Input
              placeholder="調査タイトル"
              value={title}
              variant="flushed"
              fontSize="3xl"
              h="50px"
              py={8}
              onChange={handleChangeTitle}
            />
            <Input
              mt={5}
              ml={3}
              placeholder="調査の説明"
              variant="flushed"
              w="80%"
              onChange={handleChangeDescription}
            />
          </Box>
          {items.map((item, index) => {
            return (
              <SurveyItemCreator
                my={3}
                boxShadow="md"
                bgColor="gray.700"
                borderRadius="10px"
                key={index}
                item={item}
                onChangeItem={handleChangeItem}
                onDeleteItem={handleDeleteItem}
                setError={setError}
              />
            );
          })}
        </Box>
        <Box
          bgColor="gray.300"
          w="50px"
          h="300px"
          position="sticky"
          top="80px"
          borderRadius="10px"
          ml={5}
          p={3}
        >
          <Center>
            <IconButton
              aria-label="項目を作成"
              icon={<AddIcon color="gray.100" boxSize="20px" />}
              alignItems="center"
              bgColor="gray.600"
              _hover={{ bgColor: "gray.700" }}
              _active={{ bgColor: "gray.800" }}
              borderRadius="50%"
              onClick={handleAddItem}
            />
          </Center>
        </Box>
      </Flex>
    </Box>
  );
};

export const SurveyCreator = Component;
