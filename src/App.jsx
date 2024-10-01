import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TextArea from "./components/TextArea";
import GenerateButton from "./components/GenerateButton";
import ConversationDisplay from "./components/ConversationDisplay";
import SideBar from "./components/SideBar";
import { useAnswerGenerator } from "./hooks/useAnswerGenerator";
import { v4 as uuidv4 } from "uuid"; // To generate unique chat IDs

function App() {
  const [chats, setChats] = useState([]); // Store all chats (each with an ID and history)
  const [activeChatId, setActiveChatId] = useState(null); // Track the active chat
  const [question, setQuestion] = useState("");
  const { generateAnswers, loading } = useAnswerGenerator();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Control sidebar visibility

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const savedChats = JSON.parse(localStorage.getItem("chats")) || [];
    setChats(savedChats);
  }, []);

  // Save chats to localStorage whenever the `chats` array changes
  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem("chats", JSON.stringify(chats));
    }
  }, [chats]);

  const displayAnswerWordByWord = (answer, chatIndex, entryIndex) => {
    const words = answer.split(" ");
    let currentIndex = 0;

    const intervalId = setInterval(() => {
      setChats((prevChats) => {
        const newChats = [...prevChats];
        const currentChat = newChats[chatIndex];
        currentChat.conversation[entryIndex].answer +=
          (currentIndex > 0 ? " " : "") + words[currentIndex];
        currentIndex++;

        if (currentIndex >= words.length) {
          clearInterval(intervalId); // Stop interval when done
        }
        return newChats;
      });
    }, 100); // Adjust the interval timing as needed
  };

  const handleGenerateAnswer = async () => {
    if (question.trim() && activeChatId !== null) {
      const chatIndex = chats.findIndex((chat) => chat.id === activeChatId);

      // Add new question entry to the conversation of the active chat
      setChats((prevChats) => {
        const newChats = [...prevChats];
        const currentChat = newChats[chatIndex];
        currentChat.conversation.push({ question, answer: "" });
        return newChats;
      });

      const answer = await generateAnswers(question);
      const entryIndex = chats[chatIndex].conversation.length - 1;

      // Display the answer word by word
      displayAnswerWordByWord(answer, chatIndex, entryIndex);

      setQuestion(""); // Clear the input after generating the answer
    }
  };

  const handleNewChat = () => {
    const newChat = {
      id: uuidv4(), // Unique chat ID
      title: `Chat ${chats.length + 1}`, // Give the chat a title
      conversation: [], // Empty conversation
    };

    setChats([...chats, newChat]);
    setActiveChatId(newChat.id); // Set the new chat as active
  };

  const handleChatSelect = (chatId) => {
    setActiveChatId(chatId); // Set the selected chat as active
  };

  const activeChat = chats.find((chat) => chat.id === activeChatId); // Find the active chat

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <SideBar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        chats={chats}
        activeChatId={activeChatId}
        onChatSelect={handleChatSelect}
        onNewChat={handleNewChat}
      />

      <div className="flex-1  flex flex-col bg-gray-50 transition-all duration-300 ease-in-out">
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}/>

        <main className="flex-1 flex flex-col p-4 space-y-4 w-[100vw]">
          {/* Display the conversation of the active chat */}
          {activeChat ? (
            <ConversationDisplay conversation={activeChat.conversation} />
          ) : (
            <p className="text-gray-400 text-center md:text-lg text-sm">To Start Chatting, Start New Chat from top-right placed Icon! For more info- <a href="https://szswebdev.netlify.app/" target="_blank" className="text-blue-700 underline">SZS Web Dev.</a></p>
          )}
        </main>

        <div className="bg-gray-700 m-4 p-3 sticky bottom-0 rounded">
          <div className="flex flex-col md:space-y-4 space-y-1">
            <TextArea
              question={question}
              setQuestion={setQuestion}
              handleGenerateAnswer={handleGenerateAnswer}
            />
            <GenerateButton
              loading={loading}
              handleClick={handleGenerateAnswer}
            />
          <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
