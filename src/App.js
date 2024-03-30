import React, { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import './App.css';
import Toolbar from './components/toolbar';

const MarkdownEditor = () => {
  const initialMarkdown = `# Project Description\n\n## Overview\nThis Markdown Editor application allows users to write and preview Markdown content in real-time. It provides a user-friendly interface with a toolbar for formatting text, inserting images, and creating links.\n\n## Features\n- **Text Formatting:** Apply formatting styles such as bold, italic, code, and strikethrough to your text.\n- **Headings:** Easily create headings using Markdown syntax (e.g., # Heading 1, ## Heading 2, etc.).\n- **Lists:** Create bullet or numbered lists by starting lines with '-' or '1.' respectively.\n- **Insert Images:** Insert images into your Markdown content by providing the image URL.\n- **Create Links:** Create hyperlinks by entering the link text and URL.\n- **Real-Time Preview:** See the formatted preview of your Markdown content as you type.\n\n## Usage\n1. Start typing your Markdown content in the left text area.\n2. Use the toolbar buttons to apply formatting styles or insert images/links.\n3. View the real-time preview of your Markdown content in the right preview area.\n\nEnjoy writing Markdown effortlessly with Mark-Ease!`;

  const [content, setContent] = useState(initialMarkdown);
  const textAreaRef = useRef(null);

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const applyFormat = (startTag, endTag) => {
    const textArea = textAreaRef.current;
    const startPos = textArea.selectionStart;
    const endPos = textArea.selectionEnd;
    const selectedText = textArea.value.substring(startPos, endPos);
    const formattedText = `${startTag}${selectedText}${endTag}`;
    const newText = textArea.value.substring(0, startPos) + formattedText + textArea.value.substring(endPos);
    setContent(newText);
    textArea.focus();
    textArea.setSelectionRange(startPos + startTag.length, startPos + startTag.length + selectedText.length);
  };

  const insertImage = () => {
    const imageUrl = prompt('Enter image URL:');
    if (imageUrl) {
      const imageMarkdown = `![Image Alt Text](${imageUrl})`;
      applyFormat(imageMarkdown, '');
    }
  };

  const insertLink = () => {
    const linkText = prompt('Enter link text:');
    if (linkText) {
      const linkUrl = prompt('Enter link URL:');
      if (linkUrl) {
        const linkMarkdown = `[${linkText}](${linkUrl})`;
        applyFormat(linkMarkdown, '');
      }
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 p-4 border-r">
        <h1 className="text-3xl font-bold mb-4">Mark-Ease</h1>
        <Toolbar
          applyFormat={applyFormat}
          insertImage={insertImage}
          insertLink={insertLink}
        />
        <br/>
        <textarea
          ref={textAreaRef}
          value={content}
          onChange={handleChange}
          rows={10}
          className="w-full p-4 border rounded focus:outline-none focus:border-blue-500"
          placeholder="Markdown here"
        />
      </div>
      <div className="w-1/2 p-4">
        <h2 className="text-lg font-bold mb-2 text-center">Preview</h2>
        <div className="border p-4 max-h-96 overflow-y-auto">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;
