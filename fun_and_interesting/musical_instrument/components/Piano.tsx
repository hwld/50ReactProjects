import { Box, Button, chakra, Flex, HTMLChakraProps } from "@chakra-ui/react";
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
import { useNoteNameKeyMapLayout } from "../hooks/usePianoKeysLayout";
import { NoteNameKeyMap } from "../hooks/usePianos";
import { Note, NoteName, NoteNumber } from "../lib/sound";
import { OpenChangePianoKeyMapFormButton } from "./OpenChangePianoKeyMapFormButton";
import { PlayablePianoKey } from "./PlayablePianoKey";

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
  deletePiano?: () => void;
  changePianoKeyMap?: (keyMap: NoteNameKeyMap) => void;
  movePiano?: (moveTargetIndex: number, baseIndex: number) => void;
  playSound?: (note: Note) => void;
};

const Component = forwardRef<HTMLDivElement, PropsWithChildren<PianoProps>>(
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
    const { whiteKeys, blackKeys } = useNoteNameKeyMapLayout();

    const innerRef = useRef<HTMLDivElement | null>(null);
    let actualRef: MutableRefObject<HTMLDivElement | null>;
    if (typeof outerRef === "function") {
      outerRef(innerRef.current);
      actualRef = innerRef;
    } else {
      if (outerRef) {
        actualRef = outerRef;
      }
      actualRef = innerRef;
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
      collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    });

    useEffect(() => {
      preview(getEmptyImage(), { captureDraggingState: true });
    }, []);

    drag(drop(actualRef));
    return (
      <Box
        ref={actualRef}
        className={className}
        pt={5}
        pr={5}
        pl={5}
        height="auto"
        opacity={isDragging ? 0 : 1}
        minW="450px"
      >
        <Box position="relative">
          <Flex>
            {whiteKeys.map(
              ({ noteName, whiteKeyWidth, whiteKeyMarginRight }) => {
                return (
                  <PlayablePianoKey
                    key={noteName}
                    note={{ noteName, noteNumber }}
                    pressed={pressedNoteNames.includes(noteName)}
                    playSound={playSound}
                    _active={{ bg: "yellow.300" }}
                    mr={whiteKeyMarginRight}
                    w={whiteKeyWidth}
                    h="250px"
                    bg="gray.100"
                  />
                );
              }
            )}
            {blackKeys.map(({ noteName, left, blackKeyWidth }) => {
              return (
                <PlayablePianoKey
                  key={noteName}
                  note={{ noteName, noteNumber }}
                  pressed={pressedNoteNames.includes(noteName)}
                  playSound={playSound}
                  _active={{ bg: "red.500" }}
                  position="absolute"
                  left={left}
                  w={blackKeyWidth}
                  h="160px"
                  bg="gray.800"
                  noteTextStyle={{ color: "gray.50" }}
                />
              );
            })}
          </Flex>
        </Box>
        <Flex pt={3} pb={3} justify="center">
          <Button onClick={deletePiano} mr={3}>
            削除
          </Button>
          <OpenChangePianoKeyMapFormButton
            noteNumber={noteNumber}
            changePianoKeyMap={changePianoKeyMap}
          />
        </Flex>
      </Box>
    );
  }
);

const PianoWithOutMotion = chakra(Component);
export const Piano: React.FC<MotionPianoProps> = motion(PianoWithOutMotion);
