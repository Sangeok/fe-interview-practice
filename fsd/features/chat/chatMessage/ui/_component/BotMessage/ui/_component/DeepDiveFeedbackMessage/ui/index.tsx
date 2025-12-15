import { DeepDiveFeedbackData } from "@/fsd/shared/model/type";
import { FeedbackSection } from "../../FeedbackMessage/_component/FeedbackSection";
import { ScoreDisplay } from "../../FeedbackMessage/_component/ScoreDisplay";

interface DeepDiveFeedbackMessageProps {
  BotAvatar: React.ReactNode;
  data: DeepDiveFeedbackData;
}

export default function DeepDiveFeedbackMessage({ BotAvatar, data }: DeepDiveFeedbackMessageProps) {
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

            {/* DeepDive section - enhanced terminal style */}
            <div className="relative bg-gradient-to-br from-cyan-950/40 to-cyan-900/20 rounded-lg p-4 border border-cyan-700/40 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
              <div className="absolute top-2 left-2 w-6 h-6 border-t border-l border-cyan-500/40 rounded-tl"></div>
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b border-r border-cyan-500/40 rounded-br"></div>

              <div className="flex items-start gap-2 mb-2">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 animate-pulse"></div>
                <h4 className="text-base sm:text-lg font-semibold text-cyan-400 font-mono">{data.deepDive.title}</h4>
              </div>

              <p className="text-cyan-300/90 text-sm leading-relaxed mb-3 ml-4 font-mono">
                {data.deepDive.description}
              </p>

              <ul className="space-y-2 ml-4">
                {data.deepDive.topics.map((topic, index) => (
                  <li key={index} className="text-cyan-200/80 text-sm flex items-start font-mono">
                    <span className="text-cyan-400 mr-2 flex-shrink-0">{">"}</span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Corner accent */}
        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-lime-400/50 rounded-bl"></div>
      </div>
    </div>
  );
}
