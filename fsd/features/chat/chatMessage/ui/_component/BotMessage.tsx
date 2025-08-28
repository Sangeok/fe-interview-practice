import { Bot } from "lucide-react";
import { useState, useEffect } from "react";

function BotAvatar() {
  return (
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
      <Bot size={20} className="text-gray-600" />
    </div>
  );
}

function useTypewriter(text: string, speed: number = 50) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!text) return;

    setIsTyping(true);
    setDisplayedText("");
    
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayedText, isTyping };
}

export default function BotMessage({ content }: { content: string }) {
  const { displayedText, isTyping } = useTypewriter(content, 50);

  return (
    <div className="flex items-start gap-3 justify-start">
      <BotAvatar />
      <div className="px-4 py-3 rounded-2xl max-w-lg bg-gray-100 text-gray-800 rounded-bl-none">
        <p className="text-sm whitespace-pre-wrap">
          {displayedText}
          {isTyping && (
            <span className="ml-1 animate-pulse text-gray-500">|</span>
          )}
        </p>
      </div>
    </div>
  );
}
