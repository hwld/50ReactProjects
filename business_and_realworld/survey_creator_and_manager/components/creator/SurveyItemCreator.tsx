import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import React, { ChangeEventHandler, useMemo } from "react";
import { SurveyItem, SurveyItemType } from "../../type/survey";
import { assertNever } from "../../utils/asertNever";
import { EditChoices } from "./EditChoices";
import { SurveyItemTypeSelect } from "./SurveyItemTypeSelect";

type Props = {
  item: SurveyItem;
  onChangeItem: (item: SurveyItem) => void;
  onDeleteItem: (itemId: string) => void;
  setError: (isError: boolean) => void;
};

const Component: React.FC<Props> = ({
  item,
  onChangeItem,
  onDeleteItem,
  setError,
}) => {
  const handleClick = () => {
    onDeleteItem(item.id);
  };

  const handleChangeQuestion: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    onChangeItem({ ...item, question: value });
  };

  const changeItemType = (type: SurveyItemType) => {
    switch (type) {
      case "Radio":
        onChangeItem({
          id: item.id,
          type,
          question: item.question,
          description: item.description,
          choices: ["選択肢1"],
        });
        break;
      case "Checkbox":
        onChangeItem({
          id: item.id,
          type,
          question: item.question,
          description: item.description,
          choices: ["選択肢1"],
        });
        break;
      case "TextInput":
        onChangeItem({
          id: item.id,
          type,
          question: item.question,
          description: item.description,
        });
        break;
      default:
        assertNever(type);
    }
  };

  const option = useMemo(() => {
    const handleChangeChoices = (choices: string[]) => {
      switch (item.type) {
        case "Radio":
        case "Checkbox":
          onChangeItem({ ...item, choices });
          break;
      }
    };

    switch (item.type) {
      case "Radio":
        return (
          <EditChoices
            choices={item.choices}
            onChangeChoices={handleChangeChoices}
            setError={setError}
          />
        );
      case "Checkbox":
        return (
          <EditChoices
            choices={item.choices}
            onChangeChoices={handleChangeChoices}
            setError={setError}
          />
        );
      case "TextInput":
        // 何も表示しない
        break;
      default:
        assertNever(item);
    }
  }, [item, onChangeItem]);

  return (
    <Box mx={10} my={3} p={5} boxShadow="md" bgColor="gray.700">
      <Stack>
        <Box>
          <Text>質問</Text>
          <Input onChange={handleChangeQuestion} />
        </Box>
        <Box>
          <Text>種類</Text>
          <SurveyItemTypeSelect onChange={changeItemType} />
        </Box>
        {option}
        <Button colorScheme="red" w="100px" onClick={handleClick}>
          削除
        </Button>
      </Stack>
    </Box>
  );
};

export const SurveyItemCreator = Component;
