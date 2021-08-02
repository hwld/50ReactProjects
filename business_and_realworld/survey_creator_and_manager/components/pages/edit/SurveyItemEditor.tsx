import { Box, Button, Flex, Input, Switch, Text } from "@chakra-ui/react";
import React, { ChangeEventHandler, forwardRef, useMemo } from "react";
import { SurveyItem, SurveyItemType } from "../../../type/survey";
import { assertNever } from "../../../utils/asertNever";
import { MotionBox, MotionBoxProps } from "../../common/MotionBox";
import { EditChoices } from "./EditChoices";
import { SurveyItemTypeSelect } from "./SurveyItemTypeSelect";

type Props = {
  className?: string;
  item: SurveyItem;
  onChangeItem: (item: SurveyItem) => void;
  onDeleteItem: (itemId: string) => void;
  setError: (isError: boolean) => void;
} & MotionBoxProps;

const Component = forwardRef<HTMLDivElement, Props>(function SurveyItemEditor(
  { className, item, onChangeItem, onDeleteItem, setError, ...boxProps },
  ref
) {
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
          ...item,
          type,
          choices: ["選択肢1"],
        });
        break;
      }
      case "Checkbox": {
        onChangeItem({
          ...item,
          type,
          choices: ["選択肢1"],
        });
        break;
      }
      case "TextInput": {
        onChangeItem({
          ...item,
          type,
        });
        break;
      }
      default: {
        assertNever(type);
      }
    }
  };

  const handleChangeRequired = () => {
    onChangeItem({ ...item, required: !item.required });
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
    <MotionBox
      p={10}
      boxShadow="md"
      bgColor="gray.700"
      borderRadius="10px"
      {...boxProps}
      ref={ref}
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
        <Flex mt={5} justify="space-between" align="center">
          <Button colorScheme="red" w="100px" onClick={handleDeleteItem}>
            削除
          </Button>
          <Flex align="center">
            <Text>必須</Text>
            <Switch
              ml={2}
              isChecked={item.required}
              onChange={handleChangeRequired}
            />
          </Flex>
        </Flex>
      </Box>
    </MotionBox>
  );
});

export const SurveyItemEditor = Component;
