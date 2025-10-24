import { DeepDiveFeedbackData } from "@/fsd/shared/model/type";
import { FeedbackSection } from "../../FeedbackMessage/_component/FeedbackSection";
import { ScoreDisplay } from "../../FeedbackMessage/_component/ScoreDisplay";

interface DeepDiveFeedbackMessageProps {
  BotAvatar: React.ReactNode;
  data: DeepDiveFeedbackData;
}

export default function DeepDiveFeedbackMessage({ BotAvatar, data }: DeepDiveFeedbackMessageProps) {
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

          {/* DeepDive 섹션 */}
          <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
            <h4 className="text-lg font-semibold text-blue-800 mb-2">{data.deepDive.title}</h4>
            <p className="text-blue-700 text-sm leading-relaxed mb-3">{data.deepDive.description}</p>
            <ul className="space-y-2">
              {data.deepDive.topics.map((topic, index) => (
                <li key={index} className="text-blue-700 text-sm flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
