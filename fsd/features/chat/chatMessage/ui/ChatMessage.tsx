import { Message } from "../model/type";
import { User, Bot } from "lucide-react";

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

function UserMessage({ content }: { content: string }) {
  return (
    <div className="flex items-start gap-3 justify-end">
      <div className="px-4 py-3 rounded-2xl max-w-lg bg-fuchsia-800 text-white rounded-br-none">
        <p className="text-sm whitespace-pre-wrap">{content}</p>
      </div>
      <UserAvatar />
    </div>
  );
}

function BotMessage({ content }: { content: string }) {
  return (
    <div className="flex items-start gap-3 justify-start">
      <BotAvatar />
      <div className="px-4 py-3 rounded-2xl max-w-lg bg-gray-100 text-gray-800 rounded-bl-none">
        <p className="text-sm whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
}

function UserAvatar() {
  return (
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
      <User size={20} className="text-gray-600" />
    </div>
  );
}

function BotAvatar() {
  return (
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
      <Bot size={20} className="text-gray-600" />
    </div>
  );
}
