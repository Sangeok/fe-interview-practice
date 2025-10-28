import { Message } from "../model/type";
import UserMessage from "./_component/UserMessage";
import ButtonMessage from "./_component/ButtonMessage";
import BotMessage from "./_component/BotMessage/ui";

interface ChatMessageProps {
  message: Message;
  onNext?: () => void;
  onEnd?: () => void;
  onAddReview?: () => void;
  showNext?: boolean;
  isLoading?: boolean;
}

export default function ChatMessage({ message, onAddReview, onNext, onEnd, showNext, isLoading }: ChatMessageProps) {
  const MESSAGE_ROLES = {
    user: <UserMessage content={message.content} />,
    system: <ButtonMessage onNext={onNext} onEnd={onEnd} onAddReview={onAddReview} showNext={showNext} />,
    assistant: <BotMessage content={message.content} isLoading={isLoading} />,
  };

  return MESSAGE_ROLES[message.role as keyof typeof MESSAGE_ROLES];
}
