import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: {
      body: { bg: "gray.100" },
    },
  },
  config: {
    useSystemColorMode: false,
    initialColorMode: "light",
  },
});
