import React, { useState } from 'react';

const Toolbar = ({ applyFormat }) => {
  const [showHeadingDropdown, setShowHeadingDropdown] = useState(false);
  const [showInsertDropdown, setShowInsertDropdown] = useState(false);

  const toggleHeadingDropdown = () => {
    setShowHeadingDropdown((prevState) => !prevState);
  };

  const toggleInsertDropdown = () => {
    setShowInsertDropdown((prevState) => !prevState);
  };

  const handleHeadingClick = (headingText) => {
    applyFormat(headingText, '\n');
    setShowHeadingDropdown(false);
  };

  const handleInsertLink = () => {
    applyFormat('[link](https://example.com)', '\n');
    setShowInsertDropdown(false);
  };

  const handleInsertImage = () => {
    applyFormat('\n![Image Alt Text](https://via.placeholder.com/150 "a title")', '\n');
    setShowInsertDropdown(false);
  };

  return (
    <div className="flex items-center justify-center gap-2 p-2 bg-gray-200 rounded-md text-sm">
      <button
        className="btn bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
        onClick={() => applyFormat('**', '**')}
      >
        Bold
      </button>
      <button
        className="btn bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
        onClick={() => applyFormat('*', '*')}
      >
        Italic
      </button>
      <button
        className="btn bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
        onClick={() => applyFormat('\n```bash\n', '\n```\n')}
      >
        Code
      </button>
      <button
        className="btn bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
        onClick={() => applyFormat('~~', '~~')}
      >
        Strikethrough
      </button>
      <div className="relative inline-block">
        <button
          className="btn bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
          onClick={toggleHeadingDropdown}
        >
          Heading
        </button>
        {showHeadingDropdown && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-10">
            <button
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
              onClick={() => handleHeadingClick('# ')}
            >
              Heading 1
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
              onClick={() => handleHeadingClick('## ')}
            >
              Heading 2
            </button>
          </div>
        )}
      </div>
      <div className="relative inline-block">
        <button
          className="btn bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
          onClick={toggleInsertDropdown}
        >
          Insert
        </button>
        {showInsertDropdown && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-10">
            <button
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
              onClick={handleInsertLink}
            >
              Insert Link
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
              onClick={handleInsertImage}
            >
              Insert Image
            </button>
          </div>
        )}
      </div>
      <button
        className="btn bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
        onClick={() => applyFormat('- ', '\n')}
      >
        List item
      </button>
    </div>
  );
};

export default Toolbar;
