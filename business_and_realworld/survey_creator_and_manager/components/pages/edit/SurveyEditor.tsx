import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Flex, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSurvey } from "../../../hooks/useSurvey";
import { Survey } from "../../../type/survey";
import { Header } from "../../common/Header";
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
  const editorTopMargin = 20;
  const headerInputTop = appHeaderHeight + editorTopMargin;
  const [menuTop, setMenuTop] = useState(0);
  const menuHeight = 300;

  // 最後の要素を削除したときに、その一つ前の要素にフォーカスを当てるために使用する
  const secondToLastRef = useRef<HTMLDivElement | null>(null);
  const handleDeleteLast = (itemId: string) => {
    secondToLastRef.current?.focus();
    deleteItem(itemId);
  };

  const convertMenuViewTopToMenuTop = useCallback(
    (viewTop: number) => {
      const menuViewBottom = viewTop + menuHeight;
      // headerInputのtopがmenuTopの0のため、それを引く
      let newMenuTop = viewTop + window.scrollY - headerInputTop;

      // 上にはみ出す場合
      if (viewTop < headerInputTop) {
        newMenuTop = window.scrollY;
      }

      //下にはみ出す場合
      if (menuViewBottom > window.innerHeight - editorTopMargin) {
        newMenuTop =
          newMenuTop -
          (menuViewBottom - (window.innerHeight - editorTopMargin));
      }

      return newMenuTop;
    },
    [headerInputTop]
  );

  const handleFocus: React.FocusEventHandler<HTMLDivElement> = ({
    currentTarget,
  }) => {
    const menuViewTop = currentTarget.getBoundingClientRect().top;
    const newMenuTop = convertMenuViewTopToMenuTop(menuViewTop);
    setMenuTop(newMenuTop);
  };

  const handleCreateSurvey = async () => {
    await fetch(`/api/surveys/${survey.id}`, {
      method: "PUT",
      body: JSON.stringify(survey),
    });

    router.push("/");
  };

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        setMenuTop((top) => {
          const menuViewTop = headerInputTop + top - window.scrollY;
          return convertMenuViewTopToMenuTop(menuViewTop);
        });
      }, 50);
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [convertMenuViewTopToMenuTop, headerInputTop]);

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
      <Flex mt={`${editorTopMargin}px`} mx="auto" w="800px">
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
          >
            <SurveyHeaderInput
              title={survey.title}
              description={survey.description}
              onChangeTitle={changeTitle}
              onChangeDescription={changeDescription}
            />
          </Box>
          {survey.items.map((item, index) => {
            return (
              <SurveyItemEditor
                ref={
                  index === survey.items.length - 2
                    ? secondToLastRef
                    : undefined
                }
                tabIndex={-1}
                my={3}
                key={item.id}
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
              />
            );
          })}
        </Box>

        <Box
          ml={5}
          p={3}
          bgColor="gray.300"
          w="50px"
          h={`${menuHeight}px`}
          position="relative"
          top={`${menuTop}px`}
          borderRadius="10px"
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
              onClick={addItem}
            />
          </Center>
        </Box>
      </Flex>
    </Box>
  );
};

export const SurveyEditor = Component;
