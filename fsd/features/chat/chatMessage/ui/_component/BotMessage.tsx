import { Bot } from "lucide-react";

function BotAvatar() {
  return (
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
      <Bot size={20} className="text-gray-600" />
    </div>
  );
}

export default function BotMessage({ content }: { content: string }) {
  return (
    <div className="flex items-start gap-3 justify-start">
      <BotAvatar />
      <div className="px-4 py-3 rounded-2xl max-w-lg bg-gray-100 text-gray-800 rounded-bl-none">
        <p className="text-sm whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
}
