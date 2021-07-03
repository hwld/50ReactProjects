import { Box } from "@chakra-ui/react";
import React from "react";
import { Survey } from "../components/Survey";
import { Survey as SurveySpec } from "../type/survey";

export default function Home() {
  const survey: SurveySpec = {
    id: "foo",
    title: "調査タイトル",
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    items: [
      {
        id: "1",
        question: "性別",
        type: "Radio",
        choices: ["男", "女", "その他"],
      },
      {
        id: "2",
        question: "興味のある言語",
        description: "複数選択可",
        type: "Checkbox",
        choices: ["C", "C++", "C#", "Java", "JavaScript", "Typescript"],
      },
      { id: "3", question: "感想", type: "TextInput" },
    ],
  };

  return (
    <Box>
      <Survey survey={survey} />
    </Box>
  );
}
