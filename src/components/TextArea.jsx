/* eslint-disable react/prop-types */
// src/components/TextArea.jsx

const TextArea = ({ question, setQuestion, handleGenerateAnswer }) => {

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleGenerateAnswer(); // Ensure this function is defined
    }
  };

  return (
    <textarea
      className=" bg-gray-800 text-gray-200 w-full p-2 rounded-2xl outline-none placeholder-gray-300"
      value={question}
      onChange={(e) => setQuestion(e.target.value)}
      onKeyDown={handleKeyDown}
      rows={2}
      placeholder="Enter your prompt here..."
    />
  );
};

export default TextArea;
