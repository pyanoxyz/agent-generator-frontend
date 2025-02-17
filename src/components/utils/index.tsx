export const parseMarkdown = (children: string) => {
  const lines = children.split("\n");
  const parsedLines = [];
  const codeBlockStack = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();

    // Check for code block delimiters
    if (trimmedLine.startsWith("```")) {
      if (codeBlockStack.length === 0) {
        // Start of a new code block
        codeBlockStack.push(i);
      } else {
        // End of the current code block
        codeBlockStack.pop();
      }
      parsedLines.push(line);
      continue;
    }

    if (codeBlockStack.length > 0) {
      // We're inside a code block
      parsedLines.push(line);
    } else {
      // We're not in a code block
      parsedLines.push(processNonCodeLine(line));
    }
  }

  // If we end the document with unclosed code blocks, reprocess those sections
  while (codeBlockStack.length > 0) {
    const startIndex = codeBlockStack.pop();
    if (startIndex !== undefined) {
      for (let j = startIndex; j < lines.length; j++) {
        parsedLines[j] = processNonCodeLine(lines[j]);
      }
    }
  }

  return parsedLines.join("\n");
};

const processNonCodeLine = (line: string) => {
  // Replace leading spaces with &nbsp;
  let processed = line.replace(/^( +)/, (match) => "&nbsp;".repeat(match.length));

  // Replace multiple spaces between words with &nbsp;
  processed = processed.replace(
    /(\S) {2,}(\S)/g,
    (match, p1, p2) => p1 + "&nbsp;".repeat(match.length - 2) + p2
  );

  return processed;
};
