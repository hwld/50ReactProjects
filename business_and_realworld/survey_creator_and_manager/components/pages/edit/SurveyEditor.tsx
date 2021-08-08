import { Box, Button, Flex } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/dist/client/router";
import React, { useRef, useState } from "react";
import { useCallbackRefForDelayedUnmount } from "../../../hooks/useCallbackRefForDelayedUnmount";
import { useListMenuTop } from "../../../hooks/useListMenuTop";
import { useSurvey } from "../../../hooks/useSurvey";
import { Survey } from "../../../type/survey";
import { Header } from "../../common/Header";
import { SurveyEditorMenu } from "./SurveyEditorMenu";
import { SurveyHeaderInput } from "./SurveyHeaderInput";
import { SurveyItemEditor } from "./SurveyItemEditor";

type Props = { initialSurvey: Survey };

const Component: React.FC<Props> = ({ initialSurvey }) => {
  const {
    survey,
    changeTitle,
    changeDescription,
    addItem,
    deleteItem,
    changeItem,
  } = useSurvey(initialSurvey);

  const router = useRouter();
  const [error, setError] = useState(false);

  const secondToLastItemRef = useRef<HTMLDivElement | null>(null);
  const secondToLastCallbackRef =
    useCallbackRefForDelayedUnmount(secondToLastItemRef);

  const appHeaderHeight = 70;
  const menuMargin = 20;
  const menuTopMargin = appHeaderHeight + menuMargin;
  const menuHeight = 200;
  const {
    menuTop,
    handleBlurItem,
    handleFocusItem,
    handleBeforeDeleteLastItem,
    handleBeforeDeleteNonLastItem,
    handleAfterDeleteItem,
  } = useListMenuTop({
    menuHeight,
    menuTopMargin,
    menuBottomMargin: menuMargin,
    secondToLastItemRef,
  });

  const handleCreateSurvey = async () => {
    await fetch(`/api/surveys/${survey.id}`, {
      method: "PUT",
      body: JSON.stringify(survey),
    });

    router.push("/");
  };

  const handleDeleteLast = (itemId: string) => {
    handleBeforeDeleteLastItem();
    deleteItem(itemId);
  };

  const handleDelete = (itemId: string) => {
    handleBeforeDeleteNonLastItem();
    deleteItem(itemId);
  };

  return (
    <Box minH="100vh" bgColor="gray.600">
      <Header justifyContent="flex-end" h={`${appHeaderHeight}px`}>
        <Button
          mt={3}
          mr={3}
          position="relative"
          right={0}
          colorScheme="blue"
          isDisabled={error}
          onClick={handleCreateSurvey}
        >
          調査を作成
        </Button>
      </Header>
      <Flex mt={`${menuMargin}px`} mx="auto" w="800px">
        <Box flexGrow={1}>
          <Box
            tabIndex={-1}
            p={10}
            bgColor="gray.700"
            borderRadius="10px"
            boxShadow="md"
            borderWidth="2px"
            borderColor="transparent"
            _focusWithin={{ borderColor: "blue.500" }}
            onFocus={handleFocusItem}
            onBlur={handleBlurItem}
            ref={
              survey.items.length === 1 ? secondToLastCallbackRef : undefined
            }
          >
            <SurveyHeaderInput
              title={survey.title}
              description={survey.description}
              onChangeTitle={changeTitle}
              onChangeDescription={changeDescription}
            />
          </Box>
          <AnimatePresence onExitComplete={handleAfterDeleteItem}>
            {survey.items.map((item, index) => {
              return (
                <SurveyItemEditor
                  ref={
                    index === survey.items.length - 2
                      ? secondToLastCallbackRef
                      : undefined
                  }
                  key={item.id}
                  my={3}
                  item={item}
                  onChangeItem={changeItem}
                  onDeleteItem={
                    index === survey.items.length - 1
                      ? handleDeleteLast
                      : handleDelete
                  }
                  setError={setError}
                  borderWidth="2px"
                  borderColor="transparent"
                  _focusWithin={{ borderColor: "blue.500" }}
                  onFocus={handleFocusItem}
                  onBlur={handleBlurItem}
                  layout="position"
                  exit={{ opacity: 0 }}
                />
              );
            })}
          </AnimatePresence>
        </Box>

        <SurveyEditorMenu
          h={`${menuHeight}px`}
          animate={{ top: menuTop }}
          addSurveyItem={addItem}
        />
      </Flex>
    </Box>
  );
};

export const SurveyEditor = Component;
