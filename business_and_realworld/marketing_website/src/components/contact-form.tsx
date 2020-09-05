import React, { FormHTMLAttributes, useState } from "react";
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
  name,
  ...props
}) => {
  const [state, setState] = useState({});

  const encode = (data: Record<string, string | number | boolean>) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": name, ...state }),
    });

    if (props.onSubmit) props.onSubmit(e);
  };

  return (
    <Form name={name} {...props} onSubmit={handleSubmit}>
      <input type="hidden" name="form-name" value={name} />
      <FormContent>
        <div>
          <label>Name:</label>
        </div>
        <FormInput type="text" name="name" onChange={handleChange} />
      </FormContent>
      <FormContent>
        <div>
          <label>Email:</label>
        </div>
        <FormInput type="email" name="email" onChange={handleChange} />
      </FormContent>
      <FormContent>
        <div>
          <label>Comment:</label>
        </div>
        <FormTextArea name="comment" rows={10} onChange={handleChange} />
      </FormContent>
    </Form>
  );
};
