// src/App.jsx
import  { useState } from "react";
import Header from "./components/Header";
 import Footer from "./components/Footer";
import TextArea from "./components/TextArea";
import GenerateButton from "./components/GenerateButton";
import AnswerDisplay from "./components/AnswerDisplay";
import SideBar from "./components/SideBar";
import { useAnswerGenerator } from "./hooks/useAnswerGenerator";

function App() {
  const [question, setQuestion] = useState("");
  const [history, setHistory] = useState([]);
  const { displayedAnswer, generateAnswers, loading } = useAnswerGenerator();

  // This function handles generating the answer and updating the chat history
  const handleGenerateAnswer = async () => {
    if (question.trim()) {
      await generateAnswers(question); // Call the API to generate the answer

      // Update the history with the new question and the corresponding answer
      setHistory((prev) => [
        ...prev,
        { question: question, answer: displayedAnswer },
      ]);
      setQuestion(""); // Clear the input after generating the answer
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
    <SideBar history={history} />
    <div className="ml-64 w-full flex flex-col">
      <Header />
      <main className="flex flex-col min-h-screen p-4 space-y-4">
        <div className="flex-grow">
          <AnswerDisplay answer={displayedAnswer} />
        </div>
        <div className="sticky flex flex-col-reverse gap-1 bottom-0 bg-gray-900">
          <Footer />
          <GenerateButton loading={loading} handleClick={handleGenerateAnswer} />
          <TextArea question={question} setQuestion={setQuestion} />
        </div>
      </main>
    </div>
  </div>
  );
}

export default App;
