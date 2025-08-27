import { Message } from "../model/type";
import UserMessage from "./_component/UserMessage";
import BotMessage from "./_component/BotMessage";
import ButtonMessage from "./_component/ButtonMessage";

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  const isAdmin = message.role === "Admin";

  if (isAdmin) {
    return <ButtonMessage />;
  }

  if (isUser) {
    return <UserMessage content={message.content} />;
  }

  return <BotMessage content={message.content} />;
}
