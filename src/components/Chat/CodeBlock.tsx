import React, { useState, useRef, useCallback } from "react";
import { GoPaste as CopyIcon } from "react-icons/go";
import { FaRegCheckCircle as CheckIcon } from "react-icons/fa";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { codeBlockStyle } from "../../styles/syntaxHighlighterStyles";

interface CodeBlockProps {
  content: string | string[];
  language?: string;
  hideActions?: boolean;
}

const LanguageNameMap: { [key: string]: string } = {
  cpp: "c++",
};

const CodeBlock: React.FC<CodeBlockProps> = ({ content, language, hideActions }) => {
  const [isCopied, setIsCopied] = useState(false);
  const codeBlockRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(Array.isArray(content) ? content.join("\n") : content);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const getCode = useCallback(() => {
    if (content.length > 0) {
      return Array.isArray(content) ? content.join("\n") : content;
    } else return "";
  }, [content]);

  return (
    <div className="code-part bg-transparent text-[#cbcbcb] mb-[5px] rounded-[10px] relative">
      <div className="copy-div h-[25px]  flex items-center bg-[#2f2f2f] text-[#929292] p-[2px] rounded-[10px_10px_0px_0px] border-t-[#424242] border-t border-solid justify-end">
        {!hideActions && (
          <div className="flex items-center justify-between w-full p-2">
            <span className="ml-1 font-sans">{LanguageNameMap[language || ""] || language}</span>
            <div className="flex items-center">
              <button
                className="copy-button bg-[#2f2f2f] w-[20px] h-full text-[white] text-[0.7rem] cursor-pointer border-[none] flex items-center mr-[6px] justify-end"
                onClick={handleCopy}
                data-tooltip-id="global-tooltip"
                data-tooltip-content="Copy code"
              >
                {isCopied ? (
                  <CheckIcon className="text-green-500 scale-125" />
                ) : (
                  <CopyIcon className="scale-125 text-[#7e7e7e] stroke-1" />
                )}
              </button>
            </div>
          </div>
        )}
      </div>
      <div ref={codeBlockRef} style={{ overflow: "none", position: "relative" }}>
        <SyntaxHighlighter
          language={language || "javascript"}
          style={codeBlockStyle}
          wrapLongLines={true}
          customStyle={{
            margin: 0,
            borderRadius: "0 0 10px 10px",
          }}
          showLineNumbers
        >
          {getCode()}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeBlock;
