import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { type NormalComponents } from "react-markdown/lib/complex-types";
import { type SpecialComponents } from "react-markdown/lib/ast-to-react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import scss from "react-syntax-highlighter/dist/cjs/languages/prism/scss";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import markdown from "react-syntax-highlighter/dist/cjs/languages/prism/markdown";
import yaml from "react-syntax-highlighter/dist/cjs/languages/prism/yaml";
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json";
import { darcula as dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { twMerge } from "tailwind-merge";

SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("scss", scss);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("markdown", markdown);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("yaml", yaml);

const MarkdownComponents: Partial<
  Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents
> = {
  h1: ({ node: _node, ...props }) => (
    <h1 {...props} className="mb-4 mt-8 text-2xl font-bold" />
  ),
  h2: ({ node: _node, ...props }) => (
    <h2 {...props} className="mb-4 mt-8 text-xl font-bold" />
  ),
  h3: ({ node: _node, ...props }) => (
    <h3 {...props} className="mb-4 mt-8 text-lg font-bold" />
  ),
  p: ({ node: _node, ...props }) => (
    <p {...props} className="[&:not(:first-child)]:pt-4">
      {props.children}
    </p>
  ),
  ul: ({ node: _node, children, ...props }) => (
    <ul {...props} className="list-disc p-2 px-4">
      {children}
    </ul>
  ),
  ol: ({ node: _node, children, ...props }) => (
    <ol {...props} className="list-decimal p-2 px-4">
      {children}
    </ol>
  ),
  li: ({ node: _node, children, ...props }) => (
    <li {...props} className="p-2 px-4">
      {children}
    </li>
  ),
  code({ node: _node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    const cherrens = String(children).replace(/\n$/, "");
    return !inline && match ? (
      <SyntaxHighlighter
        {...props}
        style={dark}
        language={match[1]}
        PreTag={"div"}
      >
        {cherrens}
      </SyntaxHighlighter>
    ) : (
      <code
        {...props}
        className={twMerge(
          className,
          "break-word m-2 overflow-x-auto whitespace-pre-wrap"
        )}
      >
        {children}
      </code>
    );
  },
};
function Markdown({ markdown }: { markdown: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={MarkdownComponents}>
      {markdown}
    </ReactMarkdown>
  );
}

export default React.memo(Markdown);
