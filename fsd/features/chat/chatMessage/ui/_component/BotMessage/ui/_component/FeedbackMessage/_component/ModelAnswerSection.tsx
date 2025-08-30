import { Lightbulb } from "lucide-react";
import { FeedbackData } from "@/fsd/shared/model/type";

export function ModelAnswerSection({ modelAnswer }: { modelAnswer: FeedbackData["modelAnswer"] }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-gray-700 font-medium">
        <Lightbulb size={18} className="text-green-500" />
        모범 답안
      </div>

      <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-700 leading-relaxed">{modelAnswer?.introduction}</p>
          </div>

          <div>
            <h5 className="font-medium text-gray-800 mb-2">사용법</h5>
            <p className="text-sm text-gray-600 leading-relaxed">{modelAnswer?.usage}</p>
          </div>

          <div>
            <h5 className="font-medium text-gray-800 mb-2">시나리오별 동작</h5>
            <div className="space-y-2">
              {modelAnswer?.scenarios.map((scenario, idx) => (
                <div key={idx} className="bg-white rounded p-3">
                  <h6 className="font-medium text-gray-700 text-sm mb-1">{scenario?.condition}</h6>
                  <p className="text-sm text-gray-600">{scenario?.explanation}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-medium text-gray-800 mb-2">실무 예시</h5>
            <div className="bg-white rounded p-3">
              <p className="text-sm text-gray-600 mb-2">
                <strong>상황:</strong> {modelAnswer?.example.context}
              </p>
              <p className="text-sm text-gray-600">
                <strong>해결:</strong> {modelAnswer?.example.solution}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
