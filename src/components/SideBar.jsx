/* eslint-disable react/prop-types */
// src/components/Sidebar.jsx


const Sidebar = ({ history }) => {
  return (
    <aside className="bg-slate-950 text-white w-64 h-full fixed left-0 top-0 p-4 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Chat History</h2>
      <ul className="space-y-2">
        {history.length ? (
          history.map((entry, index) => (
            <li
              key={index}
              className="bg-gray-700 p-2 rounded-lg cursor-pointer hover:bg-gray-600 transition duration-200"
              onClick={() => alert(`Question: ${entry.question}\nAnswer: ${entry.answer}`)} // Example action on click
            >
              {entry.question}
            </li>
          ))
        ) : (
          <li className="text-gray-400">No chat history available.</li>
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;
