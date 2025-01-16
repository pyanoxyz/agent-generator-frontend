import { useRef, useState } from "react";
import { FaCircleArrowUp } from "react-icons/fa6";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [inputText, setInputText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    const trimmedText = inputText.trim();
    if (trimmedText && !disabled) {
      onSendMessage(trimmedText);
      setInputText("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="relative bg-bgCards rounded-3xl shadow-sm">
        <div className="flex items-center min-h-12 p-2 px-4">
          <textarea
            ref={textareaRef}
            placeholder="Type a message..."
            className="w-full resize-none bg-transparent focus:outline-none max-h-48 overflow-y-auto text-black"
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              adjustTextareaHeight();
            }}
            onKeyDown={handleKeyPress}
            disabled={disabled}
            rows={1}
          />
        </div>

        <div className="flex items-center justify-end p-2 bg-bgCards rounded-b-3xl">
          <button
            onClick={handleSubmit}
            disabled={!inputText.trim() || disabled}
            className={`rounded-lg p-1 transition-colors ${
              inputText.trim() && !disabled ? "text-black hover:bg-gray-200" : "text-gray-400"
            }`}
          >
            <FaCircleArrowUp className="w-7 h-7" />
          </button>
        </div>
      </div>
    </div>
  );
};
