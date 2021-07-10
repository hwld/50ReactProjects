import { Box, Button, Heading, useToast } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { Survey } from "../../type/survey";

type Props = { surveys: Survey[] };

const Component: React.FC<Props> = ({ surveys }) => {
  const toast = useToast();

  const writeClipboard = async (value: string) => {
    await navigator.clipboard.writeText(value);
    toast({ description: "URLをコピーしました", duration: 1000 });
  };

  return (
    <Box>
      {surveys.map((survey) => {
        return (
          <Box key={survey.id}>
            <Heading>{survey.title}</Heading>
            <Button
              colorScheme="cyan"
              onClick={() =>
                writeClipboard(`http://localhost:3000/surveys/${survey.id}`)
              }
            >
              調査ページのURLをコピー
            </Button>
          </Box>
        );
      })}
      <Button colorScheme="blue">
        <Link href="/creator">新しい調査を作成</Link>
      </Button>
    </Box>
  );
};

export const Surveys = Component;
