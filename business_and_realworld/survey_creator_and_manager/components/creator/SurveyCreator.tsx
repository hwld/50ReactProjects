import { Box, Button, Input, Text } from "@chakra-ui/react";
import React, { ChangeEventHandler, useState } from "react";
import { v4 as uuid } from "uuid";
import { SurveyItem, SurveyRadioItem } from "../../type/survey";
import { SurveyItemCreator } from "./SurveyItemCreator";

type Props = {};

const Component: React.FC<Props> = ({}) => {
  const [error, setError] = useState(false);
  const [title, setTitle] = useState("");
  const [items, setItems] = useState<SurveyItem[]>([]);

  const handleChangeTitle: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setTitle(value);
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

  const createSurvey = () => {
    console.log(title, items);
  };

  return (
    <Box>
      <Box m={3}>
        <Text>調査タイトル:</Text>
        <Input value={title} onChange={handleChangeTitle} />
      </Box>
      {items.map((item, index) => {
        return (
          <SurveyItemCreator
            key={index}
            item={item}
            onChangeItem={handleChangeItem}
            onDeleteItem={handleDeleteItem}
            setError={setError}
          />
        );
      })}
      <Box w="100%" h="64px" />
      <Box p={3} position="fixed" bottom="0" right="0" left="0">
        <Button colorScheme="blue" onClick={handleAddItem}>
          質問を作成
        </Button>
        <Button
          ml={3}
          colorScheme="blue"
          onClick={createSurvey}
          isDisabled={error}
        >
          調査を作成
        </Button>
      </Box>
    </Box>
  );
};

export const SurveyCreator = Component;
