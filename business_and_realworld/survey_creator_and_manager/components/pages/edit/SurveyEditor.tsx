import { Box, Button, Flex } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/dist/client/router";
import React, { useRef, useState } from "react";
import { useCallbackRefForDelayedUnmount } from "../../../hooks/useCallbackRefForDelayedUnmount";
import { useSurvey } from "../../../hooks/useSurvey";
import { useSurveyEditorMenuTop } from "../../../hooks/useSurveyEditorMenuTop";
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

  const appHeaderHeight = 70;
  const menuMargin = 20;
  const menuTopMargin = appHeaderHeight + menuMargin;
  const menuHeight = 200;
  const {
    menuTop,
    handleBlur,
    handleFocus,
    changeMenuTopAtNextScroll,
    updateMenuTopAtNextScroll,
  } = useSurveyEditorMenuTop({
    menuHeight,
    menuTopMargin,
    menuBottomMargin: menuMargin,
  });

  const handleCreateSurvey = async () => {
    await fetch(`/api/surveys/${survey.id}`, {
      method: "PUT",
      body: JSON.stringify(survey),
    });

    router.push("/");
  };

  const secondToLastRef = useRef<HTMLDivElement | null>(null);
  const secondToLastCallbackRef =
    useCallbackRefForDelayedUnmount(secondToLastRef);

  const handleDeleteLast = (itemId: string) => {
    // 最後の要素を削除するとdocumentの高さが変わって、scroll eventが発生するので最後から2番目の要素のtopにmenuを合わせる
    changeMenuTopAtNextScroll(
      (secondToLastRef.current?.getBoundingClientRect().top ?? 0) +
        window.scrollY -
        menuTopMargin
    );
    deleteItem(itemId);
  };

  const handleDelete = (itemId: string) => {
    // 最後の要素以外の削除でscroll eventが発生することがあるので、その時はスクロールされただけmenuを移動させる。
    updateMenuTopAtNextScroll(window.scrollY);
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
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            <SurveyHeaderInput
              title={survey.title}
              description={survey.description}
              onChangeTitle={changeTitle}
              onChangeDescription={changeDescription}
            />
          </Box>
          <AnimatePresence>
            {survey.items.map((item, index) => {
              return (
                <SurveyItemEditor
                  ref={
                    index === survey.items.length - 2
                      ? secondToLastCallbackRef
                      : undefined
                  }
                  key={item.id}
                  tabIndex={-1}
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
                  onFocus={handleFocus}
                  onBlur={handleBlur}
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
