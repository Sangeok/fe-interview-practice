import { FeedbackData } from "@/fsd/shared/model/type";
import { FeedbackSection } from "../_component/FeedbackSection";
import { ModelAnswerSection } from "../_component/ModelAnswerSection";
import { ScoreDisplay } from "../_component/ScoreDisplay";

interface FeedbackMessageProps {
  BotAvatar: React.ReactNode;
  data: FeedbackData;
}

export default function FeedbackMessage({ BotAvatar, data }: FeedbackMessageProps) {
  return (
    <div className="flex items-start gap-4 justify-start">
      {BotAvatar}
      <div className="max-w-4xl bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <div className="flex items-center justify-between gap-4 mb-2">
              <h3 className="text-lg font-bold text-gray-800">{data.topic}</h3>
              <ScoreDisplay score={data.evaluation.score} maxScore={data.evaluation.maxScore} />
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">{data.evaluation.summary}</p>
          </div>

          <FeedbackSection details={data.feedbackDetails} />
          <ModelAnswerSection modelAnswer={data.modelAnswer} />
        </div>
      </div>
    </div>
  );
}
