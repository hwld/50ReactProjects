import React, { useState } from "react";
import styled from "styled-components";
import ReactModal from "react-modal";
import { Button } from "./button";

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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const FormContent = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const FormInput = styled.input`
  margin-top: 5px;
  padding: 10px 8px;
  font-size: 1.2rem;
  box-sizing: border-box;
  width: 100%;
  outline: none;
  border: none;
  border-radius: 5px 5px 0px 0px;
  background-color: rgba(255, 255, 255, 0.09);
  color: #ffffff;
`;

const FormTextArea = styled.textarea`
  margin-top: 5px;
  font-family: inherit;
  font-size: 1.2rem;
  padding: 10px 8px;
  box-sizing: border-box;
  resize: none;
  width: 100%;
  outline: none;
  border: none;
  border-radius: 5px 5px 0px 0px;
  background-color: rgba(255, 255, 255, 0.09);
  color: #ffffff;
`;

const SubmitButton = styled(Button)``;

const CancelButton = styled(Button)`
  margin-left: 10px;
`;

export const ContactButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const OpenDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
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
            <Form>
              <FormContent>
                <div>
                  <label>Name:</label>
                </div>
                <FormInput />
              </FormContent>
              <FormContent>
                <div>
                  <label>Email:</label>
                </div>
                <FormInput />
              </FormContent>
              <FormContent>
                <div>
                  <label>Comment:</label>
                </div>
                <FormTextArea rows={10} />
              </FormContent>
            </Form>
          </DialogContent>
          <DialogAction>
            <SubmitButton onClick={closeDialog}>Submit</SubmitButton>
            <CancelButton onClick={closeDialog}>Cancel</CancelButton>
          </DialogAction>
        </Dialog>
      </Modal>
    </>
  );
};
