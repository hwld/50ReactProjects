import React, { FormHTMLAttributes } from "react";
import styled from "styled-components";

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

export const ContactForm: React.FC<FormHTMLAttributes<HTMLFormElement>> = ({
  ...props
}) => {
  return (
    <Form {...props}>
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
  );
};
