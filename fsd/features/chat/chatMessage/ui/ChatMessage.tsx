import { Message } from "../model/type";
import UserMessage from "./_component/UserMessage";
import BotMessage from "./_component/BotMessage";

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  if (isUser) {
    return <UserMessage content={message.content} />;
  }

  return <BotMessage content={message.content} />;
}
