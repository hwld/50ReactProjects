import React, { useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { NextPage } from "next";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { theme } from "../theme";
import { configure } from "react-hotkeys";

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    // 複数のキーが同時入力されたときに、それぞれのイベントが発生するようにする。
    configure({
      allowCombinationSubmatches: true,
    });
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;
