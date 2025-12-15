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
    <div className="flex items-start gap-3 justify-start animate-slide-in-left">
      {BotAvatar}

      <div className="relative group max-w-4xl flex-1">
        {/* Terminal border effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-lg opacity-50 blur-sm group-hover:opacity-70 transition-opacity"></div>

        {/* Feedback content */}
        <div className="relative bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/50 rounded-lg shadow-lg p-5 sm:p-6">
          <div className="space-y-5">
            {/* Header with topic and score */}
            <div className="border-b border-zinc-800/50 pb-4">
              <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
                <div className="flex items-start gap-2 flex-1">
                  <span className="text-cyan-400 font-mono text-xs flex-shrink-0 mt-1">{">"}</span>
                  <h3 className="text-base sm:text-lg font-bold text-white font-mono">{data.topic}</h3>
                </div>
                <ScoreDisplay score={data.evaluation.score} maxScore={data.evaluation.maxScore} />
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed ml-5 font-mono">{data.evaluation.summary}</p>
            </div>

            <FeedbackSection details={data.feedbackDetails} />
            <ModelAnswerSection modelAnswer={data.modelAnswer} />
          </div>
        </div>

        {/* Corner accent */}
        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-lime-400/50 rounded-bl"></div>
      </div>
    </div>
  );
}
