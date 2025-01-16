import { MessageType } from "../../types";
import { Message } from "./Message";
import StreamingMessage from "./StreamingMessage";

interface MessageListProps {
  messages: MessageType[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="space-y-4 p-4">
      {messages.map((message) => (
        <div key={message.id}>
          {message.isStreaming && !message.hasStreamed ? (
            <StreamingMessage message={message} />
          ) : (
            <Message message={message} />
          )}
        </div>
      ))}
    </div>
  );
};
