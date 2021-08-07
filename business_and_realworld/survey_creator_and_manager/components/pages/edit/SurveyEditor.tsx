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
  const { menuTop, handleBlur, handleFocus, setMenuTop } =
    useSurveyEditorMenuTop({
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

  const didDeleteLast = useRef<{ nextMenuTop: number } | null>(null);
  const handleDeleteLast = (itemId: string) => {
    didDeleteLast.current = {
      nextMenuTop:
        (secondToLastRef.current?.getBoundingClientRect().top ?? 0) +
        window.scrollY -
        menuTopMargin,
    };

    deleteItem(itemId);
  };

  const didDeleteNonLast = useRef<{ oldScrollY: number } | null>(null);
  const handleDelete = (itemId: string) => {
    didDeleteNonLast.current = { oldScrollY: window.scrollY };
    deleteItem(itemId);
  };

  const handleExitComplete = () => {
    if (didDeleteLast.current) {
      setMenuTop(didDeleteLast.current.nextMenuTop);
      didDeleteLast.current = null;
    }
    if (didDeleteNonLast.current) {
      setMenuTop((top) => {
        return top + (window.scrollY - didDeleteNonLast.current!.oldScrollY);
      });
      didDeleteNonLast.current = null;
    }
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
          <AnimatePresence onExitComplete={handleExitComplete}>
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
