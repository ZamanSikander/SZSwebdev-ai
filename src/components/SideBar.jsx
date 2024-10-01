/* eslint-disable react/prop-types */
// src/components/Sidebar.jsx

const Sidebar = ({ isOpen, toggleSidebar, chats, activeChatId, onChatSelect, onNewChat }) => {
  return (
    <>
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-gray-800 p-4 overflow-y-scroll transition-transform duration-300 z-20 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <button onClick={toggleSidebar} className="text-white focus:outline-none mb-4">
          {/* Optional cross icon inside sidebar */}
        </button>

        <div className="text-white">
          <h2 className="text-lg">Chats</h2>
          <button className="w-full bg-blue-500 text-white py-2 my-4 rounded-lg" onClick={onNewChat}>
            New Chat
          </button>
        </div>

        <ul className="space-y-2">
          {chats.map((chat) => (
            <li key={chat.id} className={`p-2 rounded-lg cursor-pointer ${chat.id === activeChatId ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300"}`} onClick={() => onChatSelect(chat.id)}>
              {chat.title}
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay for closing the sidebar */}
      {isOpen && <div className="fixed inset-0 bg-black opacity-50 z-10" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Sidebar;
