import { MessageRole } from "../../constants/messageRoles";
import { MessageType } from "../../types";
import MarkdownRenderer from "./MarkdownRenderer";

interface MessageProps {
  message: MessageType;
}

export const Message: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.role === MessageRole.USER;

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-3xl p-3 bg-slate-100 border border-borderPrimary text-black`}
      >
        <div className="whitespace-pre-wrap markdown-content">
          <MarkdownRenderer content={message.content}></MarkdownRenderer>
        </div>
      </div>
    </div>
  );
};
