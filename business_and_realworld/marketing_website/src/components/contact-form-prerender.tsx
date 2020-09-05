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
      <input name="name1" />
      <input name="email" />
      <input name="name2" />
      <input name="name3" />
      <input name="name4" />
      <textarea name="comment"></textarea>
    </form>
  );
};
