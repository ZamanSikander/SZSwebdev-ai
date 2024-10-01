/* eslint-disable react/prop-types */
// src/components/ConversationDisplay.jsx

import DOMPurify from "dompurify";
import { marked } from "marked";

const ConversationDisplay = ({ conversation }) => {
      
  return (
    <div className="flex flex-col space-y-4 bg-gray-800 p-4 rounded-lg overflow-y-auto">
      {conversation.length === 0 ? (
        <p className="text-gray-400">Start a conversation...</p>
      ) : (
        conversation.map((entry, index) => (
          <div key={index} className="flex flex-col space-y-2 ">
            <div className=" bg-gray-700 p-2 rounded-lg">
              <strong>User:</strong> {entry.question}
            </div>
            <div
              className="bg-gray-700 text-base text-gray-300 p-2 rounded-lg"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(marked(entry.answer)),
              }}
            ></div>
          </div>
        ))
      )}
    </div>
  );
};

export default ConversationDisplay;
