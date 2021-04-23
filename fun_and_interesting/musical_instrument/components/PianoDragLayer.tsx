import React from "react";
import { useDragLayer } from "react-dnd";
import { NoteNumber } from "../lib/sound";
import { MotionBox } from "./MotionBox";

type Props = {
  noteNumber: NoteNumber;
};

const Component: React.FC<Props> = ({ children, noteNumber }) => {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem() as { noteNumber: NoteNumber },
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  if (!isDragging || noteNumber !== item.noteNumber) {
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
      {children}
    </MotionBox>
  );
};

export const PianoDragLayer = Component;
