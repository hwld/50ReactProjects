import { AddIcon } from "@chakra-ui/icons";
import { Center, IconButton } from "@chakra-ui/react";
import React from "react";
import { MotionBox } from "../../common/MotionBox";

type Props = { height: number; top: number; addSurveyItem: () => void };

const Component: React.FC<Props> = ({ height, top, addSurveyItem }) => {
  return (
    <MotionBox
      ml={5}
      p={3}
      position="relative"
      w="50px"
      h={`${height}px`}
      bgColor="gray.300"
      borderRadius="10px"
      animate={{ top: `${top}px` }}
    >
      <Center>
        <IconButton
          alignItems="center"
          bgColor="gray.600"
          borderRadius="50%"
          _hover={{ bgColor: "gray.700" }}
          _active={{ bgColor: "gray.800" }}
          aria-label="項目を作成"
          icon={<AddIcon color="gray.100" boxSize="20px" />}
          onClick={addSurveyItem}
        />
      </Center>
    </MotionBox>
  );
};

export const SurveyEditorMenu = Component;
