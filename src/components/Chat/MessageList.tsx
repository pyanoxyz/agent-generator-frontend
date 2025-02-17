import { ClientType, MessageType } from "../../types";
import { Message } from "./Message";
import StreamingMessage from "./StreamingMessage";

interface MessageListProps {
  messages: MessageType[];
  clientType: ClientType;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, clientType }) => {
  return (
    <div className="space-y-4 p-4">
      {messages.map((message) => (
        <div key={message.id}>
          {message.isStreaming && !message.hasStreamed ? (
            <StreamingMessage message={message} clientType={clientType} />
          ) : (
            <Message message={message} />
          )}
        </div>
      ))}
    </div>
  );
};
