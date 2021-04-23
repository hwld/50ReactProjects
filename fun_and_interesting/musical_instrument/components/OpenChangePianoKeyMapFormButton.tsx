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
import React, { useCallback } from "react";
import { NoteNameKeyMap } from "../hooks/usePianos";
import { NoteNumber } from "../lib/sound";
import {
  ChangePianoKeyMapForm,
  ChangePianoKeyMapFormProps,
} from "./ChangePianoKeyMapForm";

type Props = {
  className?: string;
  noteNumber: NoteNumber;
  changePianoKeyMap: (keyMap: NoteNameKeyMap) => void;
};

const Component: React.FC<Props> = React.memo(
  ({ className, noteNumber, changePianoKeyMap }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const formId = "changePianoKeyMapForm";

    const handleSubmit: ChangePianoKeyMapFormProps["onSubmit"] = useCallback(
      (keyMap) => {
        changePianoKeyMap(keyMap);
        onClose();
      },
      [changePianoKeyMap, onClose]
    );

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
                onSubmit={handleSubmit}
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
  }
);

export const OpenChangePianoKeyMapFormButton = chakra(Component);
