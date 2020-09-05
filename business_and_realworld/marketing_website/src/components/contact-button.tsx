import React, { useState } from "react";
import styled from "styled-components";
import ReactModal from "react-modal";
import { Button } from "./button";
import { ContactForm } from "./contact-form";
import { ContactFormStatic } from "./contact-form-static";

const OpenDialogButton = styled(Button)`
  font-size: 2rem;
`;

const Modal = styled(ReactModal)`
  position: absolute;
  padding: 8px;
  overflow-y: auto;
  overflow-x: auto;
  background-color: rgb(53, 53, 53);
  width: 30%;
  height: auto;

  @media (max-width: 1000px) {
    width: 80%;
  }
`;

const Dialog = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const DialogTitle = styled.div`
  margin: 10px 10px;
  text-align: center;
  flex: 0 0 auto;
  font-size: 2rem;
`;

const DialogContent = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 30px;
`;

const DialogAction = styled.div`
  padding: 8px;
  flex: 0 0 auto;
  display: flex;
  justify-content: flex-end;
`;

const SubmitButton = styled(Button)``;

const CancelButton = styled(Button)`
  margin-left: 10px;
`;

Modal.setAppElement("#___gatsby");
export const ContactButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const OpenDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    closeDialog();
  };

  return (
    <>
      <OpenDialogButton onClick={OpenDialog}>Contact us</OpenDialogButton>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeDialog}
        style={{
          overlay: {
            backgroundColor: "#ffffff80",
            padding: "10x 24px",

            // contentを中央に配置するためのCSS
            display: "grid",
            placeItems: "center",
          },
        }}
      >
        <Dialog>
          <DialogTitle>Contact Form</DialogTitle>
          <DialogContent>
            <ContactForm
              name="contact"
              method="post"
              id="contact"
              onSubmit={handleSubmit}
            />
          </DialogContent>
          <DialogAction>
            <SubmitButton type="submit" form="contact">
              Submit
            </SubmitButton>
            <CancelButton onClick={closeDialog}>Cancel</CancelButton>
          </DialogAction>
        </Dialog>
      </Modal>
      <ContactFormStatic name="contact" />
    </>
  );
};
