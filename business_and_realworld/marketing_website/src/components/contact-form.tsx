import React, { FormHTMLAttributes } from "react";
import styled from "styled-components";
import { encode } from "../util/encode";
import { useForm, useFormContext } from "react-hook-form";
import { ContactFormData } from "./contact-button";

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

const ErrorMessage = styled.p`
  color: #ff0000;
`;

export const ContactForm: React.FC<
  FormHTMLAttributes<HTMLFormElement> & { afterSubmit?: () => void }
> = ({ name, afterSubmit, ...props }) => {
  const { register, handleSubmit, errors } = useFormContext<ContactFormData>();

  const onSubmit = handleSubmit((data, e) => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": name, ...data }),
    });
    afterSubmit();
  });

  return (
    <Form name={name} {...props} onSubmit={onSubmit} autoComplete="off">
      <input type="hidden" name="form-name" />
      <FormContent>
        <div>
          <label>Name:</label>
        </div>
        <FormInput name="name" ref={register({ maxLength: 100 })} />
        {errors.name?.type === "maxLength" && (
          <ErrorMessage>100文字以内で入力してください</ErrorMessage>
        )}
      </FormContent>
      <FormContent>
        <div>
          <label>Email:</label>
        </div>
        <FormInput name="email" ref={register({ maxLength: 254 })} />
        {errors.email?.type === "maxLength" && (
          <ErrorMessage>254文字以内で入力してください</ErrorMessage>
        )}
      </FormContent>
      <FormContent>
        <div>
          <label>Comment:</label>
        </div>
        <FormTextArea
          name="comment"
          rows={10}
          ref={register({ maxLength: 1000, required: true })}
        />
        {errors.comment?.type === "maxLength" && (
          <ErrorMessage>1000文字以内で入力してください</ErrorMessage>
        )}
        {errors.comment?.type === "required" && (
          <ErrorMessage>必須項目です</ErrorMessage>
        )}
      </FormContent>
    </Form>
  );
};
