import React, { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import rehypeRaw from "rehype-raw";
import gfm from 'remark-gfm'; 

import './App.css';
import Toolbar from './components/toolbar';

const MARKDOWN_CONTENT = `
# Welcome to Mark-Ease

This is a Markdown editor where you can **format text**, create [links](https://example.com), insert images, and more!

## Text Formatting

You can apply various formatting styles to your text, such as:

- **Bold**
- *Italic*
- \`Code\`
- ~~Strikethrough~~

## Lists

You can create both bulleted and numbered lists:

- Bullet 1
- Bullet 2
  - Sub-bullet 1
  - Sub-bullet 2
1. Numbered item 1
2. Numbered item 2

## Code Blocks

You can include code blocks with syntax highlighting:

\`\`\`bash
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet('World');
\`\`\`

## Images

You can insert images using Markdown syntax:

<img src="https://random-image-pepebigotes.vercel.app/api/random-image"  width="300" height="300">


## Links

You can create hyperlinks easily:

- [GitHub](https://github.com)
- [React](https://reactjs.org)

Enjoy writing Markdown with Mark-Ease!
`;

const components = {
  code({ node, inline, className, ...props }) {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <SyntaxHighlighter
        style={atomOneDark}
        language={match[1]}
        PreTag="div"
        wrapLines={true}
        {...props}
      >
        {String(props.children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props} />
    );
  },
  ul({ node, ...props }) {
    return <ul className="list-disc pl-5 mb-4 text-gray-800" {...props} />;
  },
  ol({ node, ...props }) {
    return <ol className="list-decimal pl-5 mb-4 text-gray-800" {...props} />;
  },
  li({ node, ...props }) {
    return <li className="mb-2" {...props} />;
  },
  h1({ node, ...props }) {
    return (
      <h1
        className="text-4xl font-bold mb-4 text-gray-900 border-b-2 pb-2 border-gray-400"
        {...props}
      />
    );
  },
  h2({ node, ...props }) {
    return (
      <h2
        className="text-3xl font-bold mb-4 text-gray-900 border-b-2 pb-2 border-gray-400"
        {...props}
      />
    );
  },
  h3({ node, ...props }) {
    return (
      <h3
        className="text-2xl font-bold mb-4 text-gray-900 border-b-2 pb-2 border-gray-400"
        {...props}
      />
    );
  },
  p({ node, ...props }) {
    return <p className="mb-4 text-gray-800" {...props} />;
  },
  a({ node, ...props }) {
    return <a className="text-blue-500 hover:underline" {...props} />;
  },
  blockquote({ node, ...props }) {
    return (
      <blockquote
        className="text-black border-l-4 border-gray-400 pl-4 italic my-4"
        {...props}
      />
    );
  },
};

const MarkdownEditor = () => {
  const [content, setContent] = useState(MARKDOWN_CONTENT);
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
    const newText =
      textArea.value.substring(0, startPos) +
      formattedText +
      textArea.value.substring(endPos);
    setContent(newText);
    textArea.focus();
    textArea.setSelectionRange(
      startPos + startTag.length,
      startPos + startTag.length + selectedText.length
    );
  };


  return (
    <div className="flex h-screen">
      <div className="w-1/2 p-4 border-r">
        <h1 className="text-4xl font-bold mb-4 text-center">Mark-Ease</h1>
        <Toolbar applyFormat={applyFormat}/>
        <br />
        <textarea
          ref={textAreaRef}
          value={content}
          onChange={handleChange}
          rows={10}
          className="w-full p-4 border rounded h-5/6 focus:outline-none focus:border-blue-500 font-mono text-base"
          placeholder="Markdown here"
        />
      </div>
      <div className="w-1/2 p-4 bg-gray-100">
        <h2 className="text-lg font-bold mb-2 text-center">Preview</h2>
        <div className="border p-4 h-5/6 overflow-auto">
          <ReactMarkdown components={components} remarkPlugins={[gfm]} rehypePlugins={[rehypeRaw]} children={content} />
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;
