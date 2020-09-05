import React, { FormHTMLAttributes } from "react";

// A little help for the Netlify post-processing bots
export const ContactFormPrerender: React.FC<FormHTMLAttributes<
  HTMLFormElement
>> = ({ ...props }) => {
  return (
    <form {...props} hidden>
      <input type="hidden" name="form-name" value="contact" />
      <input name="name" />
      <input name="email" />
      <textarea name="comment" />
    </form>
  );
};
