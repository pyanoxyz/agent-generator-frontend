import React from "react";
import CodeBlock from "./CodeBlock";

interface CodeRendererProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  hideActions?: boolean;
  language?: string;
}

const CodeRenderer: React.FC<CodeRendererProps> = ({
  children,
  hideActions,
  language,
}) => {
  const codeContent = React.Children.toArray(children).join("").split("\n");
  const cleanedCodeLines = codeContent.map((line) =>
    line.replace(/&nbsp;/g, " ").replace(/&#160;/g, " ")
  );

  return (
    <CodeBlock
      content={cleanedCodeLines}
      language={language}
      hideActions={hideActions}
    />
  );
};

export default CodeRenderer;
