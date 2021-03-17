import { ChakraProvider } from "@chakra-ui/react";
import { NextPage } from "next";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { CharactersProvider } from "../context/CharactersContext";
import { theme } from "../theme";

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <CharactersProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </CharactersProvider>
  );
};

export default App;
