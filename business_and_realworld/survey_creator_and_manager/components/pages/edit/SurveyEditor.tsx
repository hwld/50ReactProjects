import { Box, Button, Flex } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/dist/client/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSurvey } from "../../../hooks/useSurvey";
import {
  useSurveyEditorMenuTop,
  ViewTop,
} from "../../../hooks/useSurveyEditorMenuTop";
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
  const { menuTop, updateMenuTop, changeMenuTopUsingViewTop, setMenuTop } =
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

  // 連続してelementが渡されたときには、連続した数と同じnullを渡されて初めてrefをnullに設定する
  // elementが複数渡されるときには、対応する数-1のnullが渡されることを前提としているけど、間違ってるかも・・・
  const mountCount = useRef(0);
  const unmountCount = useRef(0);
  const secondToLastCallbackRef = useCallback((e: HTMLDivElement | null) => {
    if (e) {
      secondToLastRef.current = e;
      mountCount.current += 1;
    } else {
      unmountCount.current += 1;
      if (mountCount.current === unmountCount.current) {
        secondToLastRef.current = null;
        mountCount.current = 0;
        unmountCount.current = 0;
      }
    }
  }, []);

  const didDeleteLast = useRef(false);
  const oldSecondToLastTop = useRef<number | null>(null);
  const oldScrollY = useRef(0);
  const handleDeleteLast = (itemId: string) => {
    didDeleteLast.current = true;
    oldScrollY.current = window.scrollY;
    oldSecondToLastTop.current =
      secondToLastRef.current?.getBoundingClientRect().top ?? null;
    deleteItem(itemId);
  };
  const handleDelete = (itemId: string) => {
    deleteItem(itemId);
    oldScrollY.current = window.scrollY;
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
        if (!entries[0].isIntersecting) {
          return;
        }
        const menuViewTop: ViewTop = {
          type: "Viewport",
          value: entries[0].target.getBoundingClientRect().top,
        };
        changeMenuTopUsingViewTop(menuViewTop, {
          type: "Document",
          value: window.scrollY,
        });
      },
      { rootMargin: `-${menuTopMargin}px 0px 0px 0px`, threshold: 1 }
    );
    observer.observe(currentTarget);
    oldInterSectionObserver.current = observer;

    const menuViewTop: ViewTop = {
      type: "Viewport",
      value: currentTarget.getBoundingClientRect().top,
    };
    changeMenuTopUsingViewTop(menuViewTop, {
      type: "Document",
      value: window.scrollY,
    });
  };

  // スクロールとMenuTopを連動させる
  useEffect(() => {
    let timerId: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        // 最後の要素を削除した
        if (oldScrollY.current !== 0 && oldSecondToLastTop.current) {
          console.log("last");
          setMenuTop({
            type: "Document",
            value:
              oldSecondToLastTop.current + oldScrollY.current - menuTopMargin,
          });
          oldSecondToLastTop.current = null;
          oldScrollY.current = 0;
          return;
          // 最後の要素以外を削除したときにviewPortが変更されたとき
        } else if (oldScrollY.current !== 0) {
          setMenuTop((top) => ({
            type: "Document",
            value: top.value + (window.scrollY - oldScrollY.current),
          }));
          oldScrollY.current = 0;
        }
        updateMenuTop({ type: "Document", value: window.scrollY });
      }, 30);
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [
    changeMenuTopUsingViewTop,
    menuTop,
    menuTopMargin,
    setMenuTop,
    updateMenuTop,
  ]);

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
                  layout
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
