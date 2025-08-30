import { AlertTriangle } from "lucide-react";
import { FeedbackData } from "@/fsd/shared/model/type";

export function FeedbackSection({ details }: { details: FeedbackData["feedbackDetails"] }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-gray-700 font-medium">
        <AlertTriangle size={18} className="text-orange-500" />
        상세 피드백
      </div>
      {details.map((detail, index) => (
        <div key={index} className="bg-gray-50 rounded-lg p-4 border-l-4 border-orange-400">
          <h4 className="font-semibold text-gray-800 mb-2">{detail.title}</h4>
          <p className="text-gray-600 text-sm mb-3 leading-relaxed">{detail.description}</p>
          {detail.points && (
            <ul className="space-y-1">
              {detail.points.map((point, idx) => (
                <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
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
