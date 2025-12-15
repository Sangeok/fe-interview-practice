import { useTypewriter } from "../../model/hooks/useTypewriter";

interface GeneralBotMessageProps {
  BotAvatar: React.ReactNode;
  content: string;
}

export default function GeneralBotMessage({ BotAvatar, content }: GeneralBotMessageProps) {
  const { displayedText, isTyping } = useTypewriter(content);

  return (
    <div className="flex items-start gap-3 justify-start animate-slide-in-left">
      {BotAvatar}

      <div className="relative group max-w-2xl flex-1">
        {/* Terminal border effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-lg opacity-50 blur-sm group-hover:opacity-70 transition-opacity"></div>

        {/* Message content */}
        <div className="relative bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/50 text-zinc-100 px-4 py-3 rounded-lg rounded-bl-none shadow-lg">
          <div className="flex items-start gap-2">
            <span className="text-lime-400 font-mono text-xs flex-shrink-0 mt-0.5">{">"}</span>
            <p className="text-sm leading-relaxed whitespace-pre-wrap font-mono">
              {displayedText}
              {isTyping && (
                <span className="ml-1 inline-block w-1.5 h-4 bg-lime-400 animate-pulse align-middle"></span>
              )}
            </p>
          </div>
        </div>

        {/* Corner accent */}
        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-lime-400/50 rounded-bl"></div>
      </div>
    </div>
  );
}
