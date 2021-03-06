import { Box, BoxProps, Button, Input } from "@chakra-ui/react";
import React, { ChangeEventHandler, useMemo } from "react";
import { SurveyItem, SurveyItemType } from "../../../type/survey";
import { assertNever } from "../../../utils/asertNever";
import { EditChoices } from "./EditChoices";
import { SurveyItemTypeSelect } from "./SurveyItemTypeSelect";

type Props = {
  className?: string;
  item: SurveyItem;
  onChangeItem: (item: SurveyItem) => void;
  onDeleteItem: (itemId: string) => void;
  setError: (isError: boolean) => void;
} & BoxProps;

const Component: React.FC<Props> = ({
  className,
  item,
  onChangeItem,
  onDeleteItem,
  setError,
  ...boxProps
}) => {
  const handleDeleteItem = () => {
    onDeleteItem(item.id);
  };

  const handleChangeQuestion: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    onChangeItem({ ...item, question: value });
  };

  const handleChangeItemType = (type: SurveyItemType) => {
    switch (type) {
      case "Radio": {
        onChangeItem({
          id: item.id,
          type,
          question: item.question,
          description: item.description,
          choices: ["選択肢1"],
        });
        break;
      }
      case "Checkbox": {
        onChangeItem({
          id: item.id,
          type,
          question: item.question,
          description: item.description,
          choices: ["選択肢1"],
        });
        break;
      }
      case "TextInput": {
        onChangeItem({
          id: item.id,
          type,
          question: item.question,
          description: item.description,
        });
        break;
      }
      default: {
        assertNever(type);
      }
    }
  };

  const option = useMemo(() => {
    const handleChangeChoices = (choices: string[]) => {
      switch (item.type) {
        case "Radio":
        case "Checkbox": {
          onChangeItem({ ...item, choices });
          break;
        }
        default: {
          return;
        }
      }
    };

    switch (item.type) {
      case "Radio":
      case "Checkbox": {
        return (
          <EditChoices
            type={item.type}
            mt={5}
            ml={5}
            choices={item.choices}
            onChangeChoices={handleChangeChoices}
            setError={setError}
          />
        );
      }
      case "TextInput": {
        // 何も表示しない
        break;
      }
      default: {
        assertNever(item);
      }
    }
  }, [item, onChangeItem, setError]);

  return (
    <Box
      p={10}
      boxShadow="md"
      bgColor="gray.700"
      borderRadius="10px"
      {...boxProps}
    >
      <Box>
        <Box>
          <Input
            placeholder="質問"
            _placeholder={{ color: "gray.500" }}
            borderColor="gray.300"
            variant="flushed"
            size="lg"
            onChange={handleChangeQuestion}
          />
        </Box>
        <Box>
          <SurveyItemTypeSelect mt={5} onChange={handleChangeItemType} />
        </Box>
        {option}
        <Button mt={5} colorScheme="red" w="100px" onClick={handleDeleteItem}>
          削除
        </Button>
      </Box>
    </Box>
  );
};

export const SurveyItemCreator = Component;
