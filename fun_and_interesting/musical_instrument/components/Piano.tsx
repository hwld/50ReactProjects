import { Box, chakra, HTMLChakraProps } from "@chakra-ui/react";
import { HTMLMotionProps, motion } from "framer-motion";
import React, {
  forwardRef,
  MutableRefObject,
  PropsWithChildren,
  useEffect,
  useRef,
} from "react";
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { usePianoKeyMap } from "../context/PianosHotKeysContext";
import { NoteNameKeyMap } from "../hooks/usePianos";
import { Note, NoteName, NoteNumber } from "../lib/sound";
import { PianoDragLayer } from "./PianoDragLayer";
import { PianoView } from "./PianoView";

type Merge<P, T> = Omit<P, keyof T> & T;
type MotionPianoProps = Merge<
  PianoProps & HTMLChakraProps<"div">,
  HTMLMotionProps<"div">
>;

export type PianoProps = {
  className?: string;
  index: number;
  noteNumber: NoteNumber;
  pressedNoteNames?: NoteName[];
  deletePiano?: (noteNumber: NoteNumber) => void;
  changePianoKeyMap?: (noteNumber: NoteNumber, keyMap: NoteNameKeyMap) => void;
  movePiano?: (moveTargetIndex: number, baseIndex: number) => void;
  playSound?: (note: Note) => void;
};

const Component = React.memo(
  forwardRef<HTMLDivElement, PropsWithChildren<PianoProps>>(
    (
      {
        className,
        index,
        noteNumber,
        pressedNoteNames = [],
        changePianoKeyMap = () => {},
        deletePiano = () => {},
        movePiano = () => {},
        playSound = () => {},
      },
      outerRef
    ) => {
      const pianoKeyMap = usePianoKeyMap(noteNumber);

      const innerRef = useRef<HTMLDivElement | null>(null);
      let actualRef: MutableRefObject<HTMLDivElement | null>;
      if (typeof outerRef === "function") {
        outerRef(innerRef.current);
        actualRef = innerRef;
      } else {
        if (outerRef) {
          actualRef = outerRef;
        } else {
          actualRef = innerRef;
        }
      }

      const [, drop] = useDrop({
        accept: "PIANO",
        hover: (item: { index: number }) => {
          if (!actualRef.current) {
            return;
          }

          const dragIndex = item.index;
          const hoverIndex = index;

          if (dragIndex === hoverIndex) {
            return;
          }

          // transformが設定されているときに、layoutアニメーションが実行されているとする
          // hoverターゲットでlayoutアニメーションが実行されているときには何も行わない
          if (actualRef.current.style.transform !== "") {
            return;
          }

          movePiano(dragIndex, hoverIndex);
          item.index = hoverIndex;
        },
      });

      const [{ isDragging }, drag, preview] = useDrag({
        type: "PIANO",
        item: () => {
          return { noteNumber, index };
        },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
      });

      const handleDeletePiano = () => {
        deletePiano(noteNumber);
      };

      const handleChangePianoKeyMap = (keyMap: NoteNameKeyMap) => {
        changePianoKeyMap(noteNumber, keyMap);
      };

      useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true });
      }, []);

      drag(drop(actualRef));
      return (
        <Box>
          <PianoView
            ref={actualRef}
            className={className}
            noteNumber={noteNumber}
            pianoKeyMap={pianoKeyMap}
            pressedNoteNames={pressedNoteNames}
            playSound={playSound}
            deletePiano={handleDeletePiano}
            changePianoKeyMap={handleChangePianoKeyMap}
            opacity={isDragging ? 0 : 1}
          />
          <PianoDragLayer noteNumber={noteNumber}>
            <PianoView
              className={className}
              noteNumber={noteNumber}
              pianoKeyMap={pianoKeyMap}
            />
          </PianoDragLayer>
        </Box>
      );
    }
  )
);

const PianoWithOutMotion = chakra(Component);
export const Piano: React.FC<MotionPianoProps> = motion(PianoWithOutMotion);
