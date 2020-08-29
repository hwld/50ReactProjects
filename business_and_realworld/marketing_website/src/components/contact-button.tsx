import React, { useState } from "react";
import styled from "styled-components";
import ReactModal from "react-modal";
import { Button } from "./button";

const OpenDialogButton = styled(Button)`
  width: 200px;
  height: 50px;
`;

const Dialog = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const DialogTitle = styled.div`
  text-align: center;
  flex: 0 0 auto;
  font-size: 2rem;
`;

const DialogContent = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DialogAction = styled.div`
  flex: 0 0 auto;
  display: flex;
  justify-content: flex-end;
`;

const Form = styled.form`
  margin-top: 50px;
`;

const FormContent = styled.div`
  margin-top: 20px;
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
      <ReactModal
        isOpen={isOpen}
        onRequestClose={closeDialog}
        style={{
          overlay: { backgroundColor: "#ffffff80" },
          content: {
            padding: "30px",
            backgroundColor: "#16161a",
            margin: "auto",
            width: "30%",
            height: "auto",
            overflowY: "auto",
            overflowX: "auto",
          },
        }}
      >
        <Dialog>
          <DialogTitle>Contact Form</DialogTitle>
          <DialogContent>
            <Form>
              <FormContent>
                <div>
                  <label>Name</label>
                </div>
                <input />
              </FormContent>
              <FormContent>
                <div>
                  <label>Email</label>
                </div>
                <input />
              </FormContent>
              <FormContent>
                <div>
                  <label>Comment</label>
                </div>
                <input />
              </FormContent>
            </Form>
          </DialogContent>
          <DialogAction>
            <SubmitButton onClick={closeDialog}>Submit</SubmitButton>
            <CancelButton onClick={closeDialog}>Cancel</CancelButton>
          </DialogAction>
        </Dialog>
      </ReactModal>
    </>
  );
};
