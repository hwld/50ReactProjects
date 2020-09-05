import React from "react";

export const ContactFormStatic: React.FC<{ name: string }> = ({ name }) => {
  return (
    <form
      name={name}
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      hidden
    >
      <input type="hidden" name="form-name" value={name} />
      <input type="text" name="name" />
      <input type="email" name="email" />
      <textarea name="comment" hidden></textarea>
    </form>
  );
};
