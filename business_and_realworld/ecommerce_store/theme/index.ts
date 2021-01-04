import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "blue.800",
      },
    },
  },
  components: { Button: {} },
});
