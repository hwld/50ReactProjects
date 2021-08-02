import { Box, Button, Flex } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useRef, useState } from "react";
import { useMenuTop } from "../../../hooks/useMenuTop";
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

  const appHeaderHeight = 70;
  const menuMargin = 20;
  const menuTopMargin = appHeaderHeight + menuMargin;
  const menuHeight = 300;
  const { menuTop, updateMenuTop, changeMenuTopUsingViewTop } = useMenuTop({
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

  // 最後の要素を削除したときに、その一つ前の要素にフォーカスを当てるために使用する
  const secondToLastRef = useRef<HTMLDivElement | null>(null);
  const handleDeleteLast = (itemId: string) => {
    //secondToLastRef.current?.focus();
    deleteItem(itemId);
  };

  const oldInterSectionObserver = useRef<IntersectionObserver>();
  const handleBlur = () => {
    oldInterSectionObserver.current?.disconnect();
  };
  const handleFocus: React.FocusEventHandler<HTMLDivElement> = ({
    currentTarget,
  }) => {
    // focusされた要素がviewPortに100％表示されたときにmenuを移動させる
    const observer = new IntersectionObserver(
      (entries) => {
        const menuViewTop = entries[0].target.getBoundingClientRect().top;
        changeMenuTopUsingViewTop(menuViewTop);
      },
      { rootMargin: `-${menuTopMargin}px 0px 0px 0px`, threshold: 1 }
    );
    observer.observe(currentTarget);
    oldInterSectionObserver.current = observer;

    const menuViewTop = currentTarget.getBoundingClientRect().top;
    changeMenuTopUsingViewTop(menuViewTop);
  };

  // スクロールとMenuTopを連動させる
  useEffect(() => {
    let timerId: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(timerId);
      timerId = setTimeout(() => updateMenuTop(), 50);
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [updateMenuTop]);

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
            ref={survey.items.length === 1 ? secondToLastRef : undefined}
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
                  key={item.id}
                  ref={
                    index === survey.items.length - 2
                      ? secondToLastRef
                      : undefined
                  }
                  tabIndex={-1}
                  my={3}
                  item={item}
                  onChangeItem={changeItem}
                  onDeleteItem={
                    index === survey.items.length - 1
                      ? handleDeleteLast
                      : deleteItem
                  }
                  setError={setError}
                  borderWidth="2px"
                  borderColor="transparent"
                  _focusWithin={{ borderColor: "blue.500" }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  layout
                  exit={{ opacity: 0 }}
                />
              );
            })}
          </AnimatePresence>
        </Box>

        <SurveyEditorMenu
          height={menuHeight}
          top={menuTop}
          addSurveyItem={addItem}
        />
      </Flex>
    </Box>
  );
};

export const SurveyEditor = Component;
