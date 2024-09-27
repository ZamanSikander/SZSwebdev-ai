// src/hooks/useAnswerGenerator.js
import { useState } from "react";
import axios from "axios";

export const useAnswerGenerator = () => {
  const [fullAnswer, setFullAnswer] = useState("");
  const [displayedAnswer, setDisplayedAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apikey = import.meta.env.VITE_API_KEY;

  const generateAnswers = async (question) => {
    setLoading(true);
    setError("");
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
      setDisplayedAnswer(answerText);
    } catch (error) {
      console.error("Error fetching answer:", error);
      setError("Error fetching answer. Please try again.");
      setDisplayedAnswer("Error fetching answer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { fullAnswer, displayedAnswer, generateAnswers, loading, error };
};
