import axios from "axios";
import { useState } from "react";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  
 const apikey =  import.meta.env.VITE_API_KEY;
  async function generateAnswers() {
    setAnswer("loading...");

    const response = await axios({
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apikey}`,

      method: "post",

      data: { contents: [{ parts: [{ text: question }] }] },
    });

    setAnswer(response["data"]["candidates"][0]["content"]["parts"][0]["text"]);
  }
  return (
    <>
      <div className="bg-gray-100 flex items-center justify-center min-h-screen p-4 border-2">
        <div className=" text-2xl sm:text-2xl  text-center  mb-4 sm:mb-6 flex items-center justify-center flex-col">
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
          >
            Generate Answer
          </button>

          <pre className="w-full p-2 sm:p-4 bg-gray-200 rounded-lg overflow-x-auto whitespace-pre-wrap text-base">
            {answer}
          </pre>
        </div>

      </div>
    </>
  );
}

export default App;
