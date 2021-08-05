import { AddIcon } from "@chakra-ui/icons";
import { Center, IconButton } from "@chakra-ui/react";
import React from "react";
import { MotionBox, MotionBoxProps } from "../../common/MotionBox";

type Props = { addSurveyItem: () => void } & MotionBoxProps;

const Component = React.forwardRef<HTMLDivElement, Props>(
  function SurveyEditorMenu({ addSurveyItem, ...props }, ref) {
    return (
      <MotionBox
        ml={5}
        p={3}
        position="relative"
        w="50px"
        bgColor="gray.300"
        borderRadius="10px"
        {...props}
        ref={ref}
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
  }
);

export const SurveyEditorMenu = Component;
