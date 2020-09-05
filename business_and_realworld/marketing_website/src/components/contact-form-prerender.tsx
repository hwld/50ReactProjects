import React from "react";

// A little help for the Netlify post-processing bots
export const ContactFormPrerender: React.FC = () => {
  return (
    <form
      name="contact"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      hidden
    >
      <input name="bot-field" />
      <input name="name" />
      <input name="email" />
      <textarea name="comment" />
    </form>
  );
};
