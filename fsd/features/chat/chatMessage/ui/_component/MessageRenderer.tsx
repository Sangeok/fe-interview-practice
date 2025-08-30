import { Bot } from "lucide-react";
import { FeedbackData } from "./FeedbackMessage";
import FeedbackMessage from "./FeedbackMessage";

function BotAvatar() {
  return (
    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
      <Bot size={24} className="text-white" />
    </div>
  );
}

function TextMessage({ 
  displayedText, 
  isTyping 
}: { 
  displayedText: string; 
  isTyping: boolean; 
}) {
  return (
    <div className="flex items-start gap-4 justify-start">
      <BotAvatar />
      <div className="px-5 py-4 rounded-2xl max-w-2xl bg-white shadow-sm border border-gray-200">
        <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
          {displayedText}
          {isTyping && (
            <span className="ml-1 animate-pulse text-blue-500 font-bold">
              |
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

function StructuredFeedbackMessage({ data }: { data: FeedbackData }) {
  return (
    <div className="flex items-start gap-4 justify-start">
      <BotAvatar />
      <div className="max-w-4xl bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <FeedbackMessage data={data} />
      </div>
    </div>
  );
}

interface MessageRendererProps {
  parsedData: FeedbackData | null;
  displayedText: string;
  isTyping: boolean;
}

export default function MessageRenderer({
  parsedData,
  displayedText,
  isTyping,
}: MessageRendererProps) {
  if (parsedData) {
    return <StructuredFeedbackMessage data={parsedData} />;
  }

  return <TextMessage displayedText={displayedText} isTyping={isTyping} />;
}