/* eslint-disable react/prop-types */


const GenerateButton = ({ loading, handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition ease-in-out duration-300 disabled:opacity-50"
      disabled={loading}
    >
      {loading ? "Generating..." : "Generate Answer"}
    </button>
  );
};

export default GenerateButton;
