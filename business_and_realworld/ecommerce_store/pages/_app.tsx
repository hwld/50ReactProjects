import { ChakraProvider } from "@chakra-ui/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { NextPage } from "next";
import { AppProps } from "next/app";
import React from "react";
import { theme } from "../theme";
import "../theme/stripe.css";

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPVE_PUBLIC as string
  );

  return (
    <Elements stripe={stripePromise}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Elements>
  );
};

export default MyApp;
