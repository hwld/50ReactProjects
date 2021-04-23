import { Box, chakra, HTMLChakraProps } from "@chakra-ui/react";
import { HTMLMotionProps, motion } from "framer-motion";
import React, { forwardRef } from "react";

type Merge<P, T> = Omit<P, keyof T> & T;
type MotionBoxProps = Merge<HTMLChakraProps<"div">, HTMLMotionProps<"div">>;

const Component: React.FC<MotionBoxProps> = motion(chakra.div);
export const MotionBox = forwardRef<HTMLDivElement | null, MotionBoxProps>(
  (props, ref) => {
    return (
      <Box ref={ref}>
        <Component {...props} />
      </Box>
    );
  }
);
