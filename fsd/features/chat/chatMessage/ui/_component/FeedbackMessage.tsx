import { AlertTriangle, Lightbulb, Target } from "lucide-react";

export interface FeedbackData {
  topic: string;
  evaluation: {
    score: number;
    maxScore: number;
    summary: string;
  };
  feedbackDetails: Array<{
    title: string;
    description: string;
    points?: string[];
  }>;
  modelAnswer: {
    introduction: string;
    usage: string;
    scenarios: Array<{
      condition: string;
      explanation: string;
    }>;
    example: {
      context: string;
      solution: string;
    };
  };
}

function ScoreDisplay({
  score,
  maxScore,
}: {
  score: number;
  maxScore: number;
}) {
  const percentage = (score / maxScore) * 100;
  const getScoreColor = () => {
    if (percentage >= 80) return "text-green-600 bg-green-50";
    if (percentage >= 60) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${getScoreColor()}`}
    >
      <Target size={16} />
      {score}/{maxScore}점
    </div>
  );
}

function FeedbackSection({
  details,
}: {
  details: FeedbackData["feedbackDetails"];
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-gray-700 font-medium">
        <AlertTriangle size={18} className="text-orange-500" />
        상세 피드백
      </div>
      {details.map((detail, index) => (
        <div
          key={index}
          className="bg-gray-50 rounded-lg p-4 border-l-4 border-orange-400"
        >
          <h4 className="font-semibold text-gray-800 mb-2">{detail.title}</h4>
          <p className="text-gray-600 text-sm mb-3 leading-relaxed">
            {detail.description}
          </p>
          {detail.points && (
            <ul className="space-y-1">
              {detail.points.map((point, idx) => (
                <li
                  key={idx}
                  className="text-sm text-gray-600 flex items-start gap-2"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 flex-shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

function ModelAnswerSection({
  modelAnswer,
}: {
  modelAnswer: FeedbackData["modelAnswer"];
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-gray-700 font-medium">
        <Lightbulb size={18} className="text-green-500" />
        모범 답안
      </div>

      <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-700 leading-relaxed">
              {modelAnswer.introduction}
            </p>
          </div>

          <div>
            <h5 className="font-medium text-gray-800 mb-2">사용법</h5>
            <p className="text-sm text-gray-600 leading-relaxed">
              {modelAnswer.usage}
            </p>
          </div>

          <div>
            <h5 className="font-medium text-gray-800 mb-2">시나리오별 동작</h5>
            <div className="space-y-2">
              {modelAnswer.scenarios.map((scenario, idx) => (
                <div key={idx} className="bg-white rounded p-3">
                  <h6 className="font-medium text-gray-700 text-sm mb-1">
                    {scenario.condition}
                  </h6>
                  <p className="text-sm text-gray-600">
                    {scenario.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-medium text-gray-800 mb-2">실무 예시</h5>
            <div className="bg-white rounded p-3">
              <p className="text-sm text-gray-600 mb-2">
                <strong>상황:</strong> {modelAnswer.example.context}
              </p>
              <p className="text-sm text-gray-600">
                <strong>해결:</strong> {modelAnswer.example.solution}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeedbackMessage({ data }: { data: FeedbackData }) {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <div className="flex items-center justify-between gap-4 mb-2">
          <h3 className="text-lg font-bold text-gray-800">{data.topic}</h3>
          <ScoreDisplay
            score={data.evaluation.score}
            maxScore={data.evaluation.maxScore}
          />
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">
          {data.evaluation.summary}
        </p>
      </div>

      <FeedbackSection details={data.feedbackDetails} />
      <ModelAnswerSection modelAnswer={data.modelAnswer} />
    </div>
  );
}