import { NextPage } from "next";
import { AppProps } from "next/dist/next-server/lib/router/router";

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default App;
