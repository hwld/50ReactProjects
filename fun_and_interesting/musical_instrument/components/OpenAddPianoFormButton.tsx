import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Heading,
  IconButton,
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
import { AddPianoForm } from "./AddPianoForm";

type Props = {
  nonExistentNoteNumbers: NoteNumber[];
  addPiano: (noteNumber: NoteNumber, keyMap: NoteNameKeyMap) => void;
};

const Component: React.FC<Props> = ({ nonExistentNoteNumbers, addPiano }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const formId = "addPianoForm";

  return (
    <>
      <IconButton
        aria-label="Add Piano"
        icon={<AddIcon />}
        colorScheme="blackAlpha"
        boxSize="60px"
        borderRadius="50%"
        onClick={onOpen}
        disabled={nonExistentNoteNumbers.length === 0}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="gray.400">
          <ModalHeader>
            <Heading size="lg">ピアノの追加</Heading>
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <AddPianoForm
              formId={formId}
              onSubmit={addPiano}
              nonExistentNoteNumbers={nonExistentNoteNumbers}
            />
          </ModalBody>

          <ModalFooter>
            <Button mr={3} colorScheme="red" onClick={onClose}>
              閉じる
            </Button>
            {nonExistentNoteNumbers.length !== 0 && (
              <Button type="submit" form={formId} colorScheme="green">
                追加
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export const OpenAddPianoFormButton = Component;
