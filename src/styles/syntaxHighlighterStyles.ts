import { vscDarkPlus as theme } from "react-syntax-highlighter/dist/esm/styles/prism";

export const baseCustomStyle = {
  ...theme,
  'code[class*="language-"]': {
    ...theme['code[class*="language-"]'],
    background: "transparent",
  },
  'pre[class*="language-"]': {
    ...theme['pre[class*="language-"]'],
    overflow: "auto",
    background: "#262626",
  },
  "react-syntax-highlighter-line-number": {
    color: "#a19e9e",
    padding: "0 0.5em",
  },
};

export const codeBlockStyle = {
  ...baseCustomStyle,
  'pre[class*="language-"]': {
    ...baseCustomStyle['pre[class*="language-"]'],
    paddingLeft: 0,
    paddingTop: "0.5em",
  },
};

export const selectedCodeStyle = {
  ...baseCustomStyle,
  'code[class*="language-"]': {
    ...baseCustomStyle['code[class*="language-"]'],
    fontSize: "inherit",
    lineHeight: "1.5em",
  },
  'pre[class*="language-"]': {
    ...baseCustomStyle['pre[class*="language-"]'],
    fontSize: "inherit",
    padding: "0.25em",
    margin: "0",
    background: "transparent",
  },
};
