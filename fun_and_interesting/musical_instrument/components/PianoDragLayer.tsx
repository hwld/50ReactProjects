import { chakra, HTMLChakraProps } from "@chakra-ui/react";
import { HTMLMotionProps, motion } from "framer-motion";
import React from "react";
import { useDragLayer } from "react-dnd";
import { NoteNumber } from "../lib/sound";
import { Piano } from "./Piano";

type Merge<P, T> = Omit<P, keyof T> & T;
type MotionBoxProps = Merge<HTMLChakraProps<"div">, HTMLMotionProps<"div">>;
const MotionBox: React.FC<MotionBoxProps> = motion(chakra.div);

const Component: React.FC = () => {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem() as { noteNumber: NoteNumber },
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  if (!isDragging) {
    return null;
  }
  return (
    <MotionBox
      position="fixed"
      pointerEvents="none"
      zIndex="100"
      left="0"
      top="0"
      style={{ x: currentOffset?.x, y: currentOffset?.y }}
    >
      <Piano noteNumber={item.noteNumber} index={0} bg="red.800" />
    </MotionBox>
  );
};

export const PianoDragLayer = Component;
