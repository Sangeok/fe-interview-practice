import { Message } from "../model/type";
import UserMessage from "./_component/UserMessage";
import BotMessage from "./_component/BotMessage";
import ButtonMessage from "./_component/ButtonMessage";

interface ChatMessageProps {
  message: Message;
  onNext?: () => void;
  onEnd?: () => void;
  showNext?: boolean;
}

export default function ChatMessage({
  message,
  onNext,
  onEnd,
  showNext,
}: ChatMessageProps) {
  const MESSAGE_ROLES = {
    user: <UserMessage content={message.content} />,
    system: <ButtonMessage onNext={onNext} onEnd={onEnd} showNext={showNext} />,
    assistant: <BotMessage content={message.content} />,
  };

  return MESSAGE_ROLES[message.role as keyof typeof MESSAGE_ROLES];
}
