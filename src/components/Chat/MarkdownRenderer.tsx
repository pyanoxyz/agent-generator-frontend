import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeRenderer from "./CodeRenderer";
import { parseMarkdown } from "../utils";

type Props = {
  content: string;
  hideActions?: boolean;
  parseContent?: boolean;
};

const MarkdownRenderer = ({ content, hideActions, parseContent = false }: Props) => {
  return (
    <Markdown
      className={parseContent ? "whitespace-pre-wrap" : "whitespace-normal flex flex-col"}
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="text-xl font-bold text-gray-800 leading-tight mb-4">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-lg font-bold text-gray-800 leading-tight mb-3">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-base font-bold text-gray-800 leading-tight mb-2">{children}</h3>
        ),
        p: (p) => (
          <p key={p.itemID} className="text-gray-700 leading-relaxed text-base my-1">
            {p.children}
          </p>
        ),
        ol: ({ children }) => (
          <ol className="text-gray-700 list-decimal m-0 flex flex-col gap-2 pl-5 mb-3">
            {children}
          </ol>
        ),
        ul: ({ children }) => (
          <ul className="text-gray-700 flex flex-col m-0 list-disc pl-5 gap-2 mb-3">{children}</ul>
        ),
        li: ({ children }) => <li className="text-gray-700 whitespace-normal m-0">{children}</li>,
        code: ({ className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <CodeRenderer language={match[1]} hideActions={hideActions}>
              {children}
            </CodeRenderer>
          ) : (
            <code
              className="bg-gray-100 whitespace-pre-wrap rounded-md px-1.5 py-0.5 text-sm font-mono text-gray-800"
              {...props}
            >
              {children}
            </code>
          );
        },
        pre: ({ children }) => {
          return <pre className="p-0 m-0 my-3 bg-transparent overflow-x-auto">{children}</pre>;
        },
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-gray-200 pl-4 my-4 text-gray-600 italic">
            {children}
          </blockquote>
        ),
        a: ({ children, href }) => (
          <>
            <a
              href={href}
              className="text-blue-600 hover:text-blue-800 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
            <br />
          </>
        ),
        strong: ({ children }) => <strong className="font-bold text-gray-900">{children}</strong>,
        em: ({ children }) => <em className="italic text-gray-800">{children}</em>,
        hr: () => <hr className="my-6 border-gray-200" />,
        table: ({ children }) => (
          <div className="overflow-x-auto my-4">
            <table className="min-w-full divide-y divide-gray-200">{children}</table>
          </div>
        ),
        th: ({ children }) => (
          <th className="px-3 py-2 bg-gray-50 text-left text-sm font-semibold text-gray-900">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700 border-b border-gray-100">
            {children}
          </td>
        ),
      }}
    >
      {parseContent ? parseMarkdown(content) : content}
    </Markdown>
  );
};

export default MarkdownRenderer;
