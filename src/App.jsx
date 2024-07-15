import axios from "axios";
import { useState, useEffect } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

function App() {
  const [question, setQuestion] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [fullAnswer, setFullAnswer] = useState("");
  const [displayedAnswer, setDisplayedAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const apikey = import.meta.env.VITE_API_KEY;

  async function generateAnswers() {
    setLoading(true);
    setFullAnswer("");
    setDisplayedAnswer("Generating Answer....");

    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apikey}`,
        method: "post",
        data: { contents: [{ parts: [{ text: question }] }] },
      });

      const answerText = response.data.candidates[0].content.parts[0].text;
      setFullAnswer(answerText);
      displayAnswerWordByWord(answerText);
    } catch (error) {
      console.error("Error fetching answer:", error);
      setDisplayedAnswer("Error fetching answer. Please try again.");
      setLoading(false);
    }
  }

  const displayAnswerWordByWord = (text) => {
    const words = text.split(" ");
    let currentIndex = 0;

    setDisplayedAnswer(""); // Clear the initial "loading..." text

    const intervalId = setInterval(() => {
      if (currentIndex < words.length) {
        setDisplayedAnswer((prev) => prev + (currentIndex > 0 ? " " : "") + words[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(intervalId);
        setLoading(false);
      }
    }, 50); // Adjust the interval time (in milliseconds) as needed
  };

  useEffect(() => {
    return () => clearInterval(displayAnswerWordByWord); // Clean up interval on unmount
  }, []);

  const createMarkup = (markdown) => {
    const rawMarkup = marked(markdown);
    const sanitizedMarkup = DOMPurify.sanitize(rawMarkup);
    return { __html: sanitizedMarkup };
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen p-4 border-2">
      <div className=" w-1/2 text-2xl sm:text-2xl text-center mb-4 sm:mb-6 flex items-center justify-center flex-col">
        <h1 className="m-4">SZS WEB DEV- AI</h1>

        <textarea
          className="w-full p-2 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4 text-base"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          cols={30}
          rows={4}
          placeholder="Enter Your Prompt"
        ></textarea>

        <button
          type="button"
          onClick={generateAnswers}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 sm:py-3 px-4 rounded-lg mb-4 transition duration-300 ease-in-out transform hover:scale-105"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Answer"}
        </button>

        <div
          className="w-full p-2 sm:p-4 bg-gray-200 rounded-lg overflow-x-auto text-base leading-8"
          dangerouslySetInnerHTML={createMarkup(displayedAnswer)}
        ></div>
        <p className="text-xs bg-neutral-500 text-white fixed bottom-0 p-2">SZS WEB DEV -AI can make mistakes. Check the information before use!</p>
      </div>
    </div>
  );
}

export default App;
