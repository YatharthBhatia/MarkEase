import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { synthwave84 } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyToClipboard } from "react-copy-to-clipboard";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";



import {
  FiBold,
  FiItalic,
  FiLink,
  FiCode,
  FiCopy,
  FiImage
} from "react-icons/fi";

const Toolbar = ({ insertText }) => {
  const handleInsertText = (text) => {
    insertText(text);
  };


  return (
    <div className="flex items-center gap-x-0.5 p-2 bg-gray-200 rounded-md">
      <button
        className="inline-flex items-center justify-center gap-x-2 px-2 py-1 text-sm font-semibold rounded-md border border-transparent text-gray-800 hover:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        onClick={() => insertText("# ")}
      >
        H1
      </button>
      <button
        className="inline-flex items-center justify-center gap-x-2 px-2 py-1 text-sm font-semibold rounded-md border border-transparent text-gray-800 hover:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        onClick={() => insertText("## ")}
      >
        H2
      </button>
      <button
        className="inline-flex items-center justify-center gap-x-2 px-2 py-1 text-sm font-semibold rounded-md border border-transparent text-gray-800 hover:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        onClick={() => insertText("### ")}
      >
        H3
      </button>
      <button
        className="inline-flex items-center justify-center gap-x-2 px-2 py-1 text-sm font-semibold rounded-md border border-transparent text-gray-800 hover:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        onClick={() => insertText("**")}
      >
        <FiBold size={20} />
      </button>
      <button
        className="inline-flex items-center justify-center gap-x-2 px-2 py-1 text-sm font-semibold rounded-md border border-transparent text-gray-800 hover:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        onClick={() => insertText("_")}
      >
        <FiItalic size={20} />
      </button>
      <button
        className="inline-flex items-center justify-center gap-x-2 px-2 py-1 text-sm font-semibold rounded-md border border-transparent text-gray-800 hover:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        onClick={() => insertText("[Link](url)")}
      >
        <FiLink size={20} />
      </button>
      <button
        className="inline-flex items-center justify-center gap-x-2 px-2 py-1 text-sm font-semibold rounded-md border border-transparent text-gray-800 hover:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        onClick={() => insertText("![Alt Text](image-url)")}
      >
        <FiImage size={20} />
      </button>
      <button
        className="inline-flex items-center justify-center gap-x-2 px-2 py-1 text-sm font-semibold rounded-md border border-transparent text-gray-800 hover:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        onClick={() => insertText("```code\n\n```")}
      >
        <FiCode size={20} />
      </button>
    </div>
  );
};

const MarkdownEditor = () => {
  const defaultMarkdown = `## Overview

Markie is a demonstration of \`react-markdown\`, a versatile markdown component designed for React applications. Below are some key features of \`react-markdown\`:

- It follows the [CommonMark](https://commonmark.org) standard for Markdown.
- Optionally, it supports [GitHub Flavored Markdown (GFM)](https://github.github.com/gfm/).
- Instead of using \`dangerouslySetInnerHTML\`, it renders actual React elements.
- It allows customization of components, enabling the use of custom elements for rendering.
- \`react-markdown\` is highly extensible with a wide range of plugins available.

## Important Note

- Check out - [\`Landing-Page\`](https://markie-main.vercel.app/)
- Made By [\`John-Paul]\`](https://john-porfolio.vercel.app)

## Contents

The content below showcases the usage of various plugins:

- The table of contents is generated dynamically using [\`remark-toc\`](https://github.com/remarkjs/remark-toc) plugin.
- Syntax highlighting is achieved with [\`rehype-highlight\`](https://github.com/rehypejs/rehype-highlight).

## Syntax Highlighting

Here's an example of syntax highlighting using \`rehype-highlight\`:

\`\`\`javascript
import React from 'react';
import ReactDOM from 'react-dom';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';

const markdown = \`
# Your markdown here
\`;

ReactDOM.render(
  <Markdown rehypePlugins={[rehypeHighlight]}>{markdown}</Markdown>,
  document.querySelector('#content')
);
\`\`\`

## GitHub Flavored Markdown (GFM)

For GFM support, you can use the [\`remark-gfm\`](https://github.com/remarkjs/react-markdown#use) plugin. It adds support for GitHub-specific extensions such as tables, strikethrough, task lists, and literal URLs.

## HTML in Markdown

HTML in markdown can be risky, but if you need to support it, you can use [\`rehype-raw\`](https://github.com/rehypejs/rehype-raw) combined with [\`rehype-sanitize\`](https://github.com/rehypejs/rehype-sanitize) for security.

## Components

Custom components can be utilized to modify the rendering behavior:

\`\`\`javascript
import React from 'react';
import ReactDOM from 'react-dom';
import Markdown from 'react-markdown';
import MyFancyRule from './components/my-fancy-rule.js';

const markdown = \`
# Your markdown here
\`;

ReactDOM.render(
  <Markdown
    components={{
      h1: 'h2', // Render h1 as h2
      hr(props) {
        const { node, ...rest } = props;
        return <MyFancyRule {...rest} />;
      }
    }}
  >
    {markdown}
  </Markdown>,
  document.querySelector('#content')
);
\`\`\`

## Want to Learn More?

For more detailed information, check out the [GitHub repository](https://github.com/remarkjs/react-markdown).`;

  const [markdown, setMarkdown] = useState(defaultMarkdown);

  const handleMarkdownChange = (event) => {
    setMarkdown(event.target.value);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    alert("Markdown copied!");
  };

  const insertText = (text) => {
    const textarea = document.getElementById("markdownTextarea");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newText =
      markdown.substring(0, start) + text + markdown.substring(end);
    setMarkdown(newText);
    textarea.focus();
    textarea.setSelectionRange(start + text.length, start + text.length);
  };

  const components = {
    code({ node, inline, className, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={synthwave84}
          language={match[1]}
          PreTag="div"
          wrapLines={true}
          {...props}
        >
          {String(props.children).replace(/\n$/, "")}
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

  return (
    <div className="flex flex-col h-screen bg-gray-100 md:flex-row">
      <div className="md:flex-1 flex flex-col">
        <div className="p-4 border-b md:border-r border-gray-300 flex-none">
          <Toolbar insertText={insertText} />
        </div>
        <div className="p-4 border-b md:border-r border-gray-300 flex-1 relative">
          <textarea
            id="markdownTextarea"
            className="w-full text-black h-full p-2 border rounded-md focus:outline-none resize-none"
            placeholder="Enter Markdown here..."
            value={markdown}
            onChange={handleMarkdownChange}
          ></textarea>
        </div>
      </div>
      <div className="md:flex-1 p-4 relative overflow-auto">
        <ReactMarkdown
          components={components}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeSanitize]}
        >
          {markdown}
        </ReactMarkdown>
        <CopyToClipboard text={markdown} onCopy={handleCopy}>
          <button className="absolute top-4 right-4 bg-gray-300 hover:bg-gray-400 transition-all p-2 rounded-lg text-gray-900 hover:text-gray-100 focus:outline-none">
            <FiCopy size={20} />
          </button>
        </CopyToClipboard>
      </div>
    </div>
  );
};

export default MarkdownEditor;
