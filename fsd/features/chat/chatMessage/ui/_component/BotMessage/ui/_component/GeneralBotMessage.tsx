import { useTypewriter } from "../../model/hooks/useTypewriter";

interface GeneralBotMessageProps {
  BotAvatar: React.ReactNode;
  content: string;
}

export default function GeneralBotMessage({ BotAvatar, content }: GeneralBotMessageProps) {
  const { displayedText, isTyping } = useTypewriter(content);

  return (
    <div className="flex items-start gap-4 justify-start">
      {BotAvatar}
      <div className="px-5 py-4 rounded-2xl max-w-2xl bg-white shadow-sm border border-gray-200">
        <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
          {displayedText}
          {isTyping && <span className="ml-1 animate-pulse text-blue-500 font-bold">|</span>}
        </p>
      </div>
    </div>
  );
}
