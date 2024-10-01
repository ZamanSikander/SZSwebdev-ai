/* eslint-disable react/prop-types */

import DOMPurify from "dompurify";
import { marked } from "marked";

const AnswerDisplay = ({ answer }) => {
  const createMarkup = (markdown) => {
    const rawMarkup = marked(markdown);
    return { __html: DOMPurify.sanitize(rawMarkup)};
  };

  return (
    <div
      className="p-4 rounded-lg overflow-y-auto"
      dangerouslySetInnerHTML={createMarkup(answer)}
    />
  );
};

export default AnswerDisplay;
