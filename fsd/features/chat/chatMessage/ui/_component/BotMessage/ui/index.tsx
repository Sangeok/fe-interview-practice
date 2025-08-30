import { FeedbackData } from "@/fsd/shared/model/type";
import { isFeedbackData } from "../lib/isFeedbackData";
import FeedbackMessage from "./_component/FeedbackMessage/ui";
import GeneralBotMessage from "./_component/GeneralBotMessage";
import { Bot } from "lucide-react";

function BotAvatar() {
  return (
    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
      <Bot size={24} className="text-white" />
    </div>
  );
}

export default function BotMessage({ content }: { content: string | FeedbackData }) {
  // content가 FeedbackData인지 판단
  const feedbackData = isFeedbackData(content);

  // FeedbackData 타입인 경우 피드백 메시지 렌더링
  if (feedbackData) {
    return <FeedbackMessage BotAvatar={<BotAvatar />} data={content as FeedbackData} />;
  }

  // string 타입인 경우 타이핑 효과와 함께 일반 메시지 렌더링
  return <GeneralBotMessage BotAvatar={<BotAvatar />} content={content as string} />;
}
