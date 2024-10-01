/* eslint-disable react/prop-types */
// src/components/Header.jsx

const Header = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <header className="bg-gray-700 p-4 flex w-[100vw] justify-between items-center ">
      <h1 className="text-basis lg:text-2xl font-bold text-white">SZS-AI-Chat</h1>

      {/* Button to toggle the sidebar */}
      <button onClick={toggleSidebar} className="text-white focus:outline-none">
        {isSidebarOpen ? (
          // Cross Icon when sidebar is open
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          // Hamburger Icon when sidebar is closed
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        )}
      </button>
    </header>
  );
};

export default Header;
