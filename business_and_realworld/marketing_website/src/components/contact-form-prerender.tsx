import React, { FormHTMLAttributes } from "react";

// A little help for the Netlify post-processing bots
export const ContactFormPrerender: React.FC<FormHTMLAttributes<
  HTMLFormElement
>> = ({ ...props }) => {
  return (
    <form {...props} hidden>
      <input name="name" />
      <input name="email" />
      <input name="email" />
      <textarea name="comment" />
    </form>
  );
};
