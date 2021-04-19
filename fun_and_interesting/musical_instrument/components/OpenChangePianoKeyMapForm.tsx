import {
  Button,
  chakra,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { NoteNameKeyMap } from "../hooks/usePianos";
import { NoteNumber } from "../lib/sound";
import { ChangePianoKeyMapForm } from "./ChangePianoKeyMapForm";

type Props = {
  className?: string;
  noteNumber: NoteNumber;
  getNoteNameKeyMap: (noteNumber: NoteNumber) => NoteNameKeyMap;
  changePianoHotKeys: (noteNumber: NoteNumber, keyMap: NoteNameKeyMap) => void;
};

const Component: React.FC<Props> = ({
  className,
  noteNumber,
  getNoteNameKeyMap,
  changePianoHotKeys,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const formId = "changePianoKeyMapForm";

  return (
    <>
      <Button className={className} onClick={onOpen}>
        KeyMapを変更
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="gray.400">
          <ModalHeader>
            <Heading size="lg">KeyMapの変更</Heading>
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <ChangePianoKeyMapForm
              formId={formId}
              noteNumber={noteNumber}
              getNoteNameKeyMap={getNoteNameKeyMap}
              onSubmit={changePianoHotKeys}
            />
          </ModalBody>

          <ModalFooter>
            <Button mr={3} colorScheme="red" onClick={onClose}>
              閉じる
            </Button>
            <Button type="submit" form={formId} colorScheme="green">
              変更
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export const OpenChangePianoKeyMapForm = chakra(Component);
