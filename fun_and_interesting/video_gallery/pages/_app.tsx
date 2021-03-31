import { ChakraProvider } from "@chakra-ui/react";
import { NextPage } from "next";
import { AppProps } from "next/dist/next-server/lib/router/router";
import React, { useRef } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";

import { theme } from "../theme";

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  const client = useRef<QueryClient>();
  if (!client.current) {
    client.current = new QueryClient();
  }

  return (
    <QueryClientProvider client={client.current}>
      <Hydrate state={pageProps.prefetchedQueryClient}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default MyApp;
