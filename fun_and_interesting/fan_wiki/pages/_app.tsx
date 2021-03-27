import { ChakraProvider } from "@chakra-ui/react";
import { NextPage } from "next";
import { AppProps } from "next/dist/next-server/lib/router/router";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { theme } from "../theme";

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  const queryClientRef = React.useRef<QueryClient>();

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  // charactersクエリが存在しない場合のみprefetchedQueryClientをhydrateする
  // charactersクエリのデータが存在する場合には、現在のqueryClientをそのまま使い続ける。
  let dehydratedState: unknown;
  if (!queryClientRef.current.getQueryData("characters")) {
    dehydratedState = pageProps.prefetchedQueryClient;
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={dehydratedState}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default App;
