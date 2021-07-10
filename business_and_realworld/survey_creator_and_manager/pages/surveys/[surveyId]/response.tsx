import { Box, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";

type Props = {
  surveyId: string;
};

export default function Response({ surveyId }: Props) {
  return (
    <Box>
      <Text>回答が送信されました</Text>
      <Link href={`/surveys/${surveyId}`}>別の回答を送信する</Link>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const surveyId = query.surveyId;
  if (typeof surveyId !== "string") {
    throw new Error();
  }
  return { props: { surveyId } };
};
