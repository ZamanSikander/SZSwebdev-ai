/* eslint-disable react/prop-types */
// src/components/TextArea.jsx

const TextArea = ({ question, setQuestion }) => {
  return (
    <textarea
      className="bg-gray-700 text-gray-200 w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={question}
      onChange={(e) => setQuestion(e.target.value)}
      rows={2}
      placeholder="Enter your prompt here..."
    />
  );
};

export default TextArea;
