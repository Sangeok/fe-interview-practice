import { FeedbackResponse } from "@/fsd/shared/model/type";
import { isFeedbackData, isDeepDiveFeedbackData } from "../lib/isFeedbackData";
import FeedbackMessage from "./_component/FeedbackMessage/ui";
import DeepDiveFeedbackMessage from "./_component/DeepDiveFeedbackMessage/ui";
import GeneralBotMessage from "./_component/GeneralBotMessage";
import { Bot } from "lucide-react";

function BotAvatar() {
  return (
    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
      <Bot size={24} className="text-white" />
    </div>
  );
}

export default function BotMessage({ content }: { content: string | FeedbackResponse }) {
  // FeedbackData 타입인 경우 피드백 메시지 렌더링
  if (isFeedbackData(content)) {
    return <FeedbackMessage BotAvatar={<BotAvatar />} data={content} />;
  }

  // DeepDiveFeedbackData 타입인 경우 DeepDive 피드백 메시지 렌더링
  if (isDeepDiveFeedbackData(content)) {
    return <DeepDiveFeedbackMessage BotAvatar={<BotAvatar />} data={content} />;
  }

  // string 타입인 경우 타이핑 효과와 함께 일반 메시지 렌더링
  return <GeneralBotMessage BotAvatar={<BotAvatar />} content={content as string} />;
}
