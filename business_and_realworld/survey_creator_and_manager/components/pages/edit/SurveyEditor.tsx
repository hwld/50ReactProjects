import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Flex, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { useSurvey } from "../../../hooks/useSurvey";
import { Survey } from "../../../type/survey";
import { Header } from "../../common/Header";
import { SurveyHeaderInput } from "./SurveyHeaderInput";
import { SurveyItemEditor } from "./SurveyItemEditor";

type Props = { initialSurvey: Survey };

const Component: React.FC<Props> = ({ initialSurvey }) => {
  const router = useRouter();
  const [error, setError] = useState(false);

  const {
    survey,
    changeTitle,
    changeDescription,
    addItem,
    deleteItem,
    changeItem,
  } = useSurvey(initialSurvey);

  const handleCreateSurvey = async () => {
    await fetch(`/api/surveys/${survey.id}`, {
      method: "PUT",
      body: JSON.stringify(survey),
    });

    router.push("/");
  };

  return (
    <Box minH="100vh" bgColor="gray.600">
      <Header justifyContent="flex-end">
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
      <Flex mt={10} mx="auto" w="800px">
        <Box flexGrow={1}>
          <Box p={10} bgColor="gray.700" borderRadius="10px" boxShadow="md">
            <SurveyHeaderInput
              title={survey.title}
              description={survey.description}
              onChangeTitle={changeTitle}
              onChangeDescription={changeDescription}
            />
          </Box>
          {survey.items.map((item) => {
            return (
              <SurveyItemEditor
                my={3}
                key={item.id}
                item={item}
                onChangeItem={changeItem}
                onDeleteItem={deleteItem}
                setError={setError}
              />
            );
          })}
        </Box>
        <Box
          ml={5}
          p={3}
          bgColor="gray.300"
          w="50px"
          h="300px"
          position="sticky"
          top="80px"
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
