import { MultipleChoiceInterpretType } from "@/fsd/shared/model/type";
import Button from "@/fsd/shared/ui/atoms/button/ui/Button";
import { useState } from "react";

interface InterpretCardProps {
  loading: boolean;
  interpret: MultipleChoiceInterpretType | null;
  onNext: () => void;
}

export default function InterpretCard({ loading, interpret, onNext }: InterpretCardProps) {
  const [expandedTheory, setExpandedTheory] = useState(false);
  const [expandedAnalogy, setExpandedAnalogy] = useState(false);

  // 로딩 상태 UI
  if (loading) {
    return (
      <div className="p-6 bg-zinc-800 rounded-lg shadow-md animate-pulse space-y-6">
        {/* 로딩 헤더 */}
        <div className="border-b border-zinc-700 pb-4">
          <div className="flex items-center mb-2">
            <span className="text-xl mr-2">💡</span>
            <div className="h-6 bg-zinc-700 rounded w-32 animate-pulse"></div>
          </div>
          <div className="h-4 bg-zinc-700 rounded w-3/4 animate-pulse"></div>
        </div>

        {/* 로딩 컨텐츠 */}
        <div className="bg-zinc-900 p-4 rounded-lg border-l-4 border-blue-500">
          <div className="flex items-center mb-3">
            <span className="mr-2">📝</span>
            <div className="h-5 bg-zinc-700 rounded w-24 animate-pulse"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-zinc-700 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-zinc-700 rounded w-5/6 animate-pulse"></div>
            <div className="h-4 bg-zinc-700 rounded w-4/5 animate-pulse"></div>
          </div>
        </div>

        {/* 로딩 섹션들 */}
        <div className="bg-zinc-900 p-4 rounded-lg">
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center">
              <span className="mr-2">🎯</span>
              <div className="h-5 bg-zinc-700 rounded w-36 animate-pulse"></div>
            </div>
            <div className="h-4 w-4 bg-zinc-700 rounded animate-pulse"></div>
          </div>
        </div>

        <div className="bg-zinc-900 p-4 rounded-lg">
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center">
              <span className="mr-2">🌟</span>
              <div className="h-5 bg-zinc-700 rounded w-32 animate-pulse"></div>
            </div>
            <div className="h-4 w-4 bg-zinc-700 rounded animate-pulse"></div>
          </div>
        </div>

        {/* 로딩 중임을 나타내는 중앙 표시 */}
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center space-x-3 text-blue-400">
            <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-lg font-medium">AI가 문제를 해설하는 중입니다...</span>
          </div>
        </div>
      </div>
    );
  }

  // 데이터가 없을 때
  if (!interpret) return null;

  // 실제 데이터 표시
  return (
    <div className="p-6 bg-zinc-800 rounded-lg shadow-md animate-fade-up-1 space-y-6">
      {/* 헤더 */}
      <div className="border-b border-zinc-700 pb-4">
        <h3 className="text-xl font-semibold mb-2 text-zinc-100">💡 문제 해석</h3>
        <p className="text-sm text-zinc-400">"{interpret.Question}"</p>
      </div>

      {/* 요약 섹션 */}
      <div className="bg-zinc-900 p-4 rounded-lg border-l-4 border-blue-500">
        <h4 className="text-lg font-medium mb-3 text-blue-400 flex items-center">
          <span className="mr-2">📝</span>
          핵심 요약
        </h4>
        <p className="text-zinc-300 leading-relaxed">{interpret.summary}</p>
      </div>

      {/* 이론 섹션 */}
      <div className="bg-zinc-900 p-4 rounded-lg">
        <button
          onClick={() => setExpandedTheory(!expandedTheory)}
          className="w-full flex items-center justify-between text-left hover:bg-zinc-800 p-2 rounded transition-colors"
        >
          <h4 className="text-lg font-medium text-green-400 flex items-center">
            <span className="mr-2">🎯</span>
            {interpret.details.theory.title}
          </h4>
          <span
            className="text-zinc-400 transform transition-transform duration-200"
            style={{ transform: expandedTheory ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            ▼
          </span>
        </button>

        {expandedTheory && (
          <div className="mt-4 space-y-4 animate-fade-in">
            <p className="text-zinc-300 leading-relaxed pl-4 border-l-2 border-green-500">
              {interpret.details.theory.description}
            </p>

            {interpret.details.theory.rules.length > 0 && (
              <div className="space-y-3">
                <h5 className="text-md font-medium text-zinc-200">주요 규칙들</h5>
                <div className="space-y-2">
                  {interpret.details.theory.rules.map((rule, index) => (
                    <div key={index} className="bg-zinc-800 p-3 rounded border-l-2 border-green-500">
                      <h6 className="font-medium text-green-300 mb-1">{rule.title}</h6>
                      <p className="text-zinc-400 text-sm">{rule.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 실제 사례 섹션 */}
      <div className="bg-zinc-900 p-4 rounded-lg">
        <button
          onClick={() => setExpandedAnalogy(!expandedAnalogy)}
          className="w-full flex items-center justify-between text-left hover:bg-zinc-800 p-2 rounded transition-colors"
        >
          <h4 className="text-lg font-medium text-purple-400 flex items-center">
            <span className="mr-2">🌟</span>
            {interpret.details.analogy.title}
          </h4>
          <span
            className="text-zinc-400 transform transition-transform duration-200"
            style={{ transform: expandedAnalogy ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            ▼
          </span>
        </button>

        {expandedAnalogy && (
          <div className="mt-4 space-y-4 animate-fade-in">
            {interpret.details.analogy.scenarios.map((scenario, index) => (
              <div key={index} className="bg-zinc-800 p-4 rounded-lg border-l-4 border-purple-500">
                <div className="flex items-center mb-2">
                  <span className="px-2 py-1 bg-purple-600 text-white text-xs rounded-full mr-3">{scenario.type}</span>
                  <h6 className="font-medium text-purple-300">{scenario.title}</h6>
                </div>
                <p className="text-zinc-300 leading-relaxed">{scenario.story}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="text-center">
        <Button
          onClick={onNext}
          size="md"
          className="w-full bg-black hover:bg-zinc-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
        >
          다음 문제로 계속하기 🚀
        </Button>
      </div>
    </div>
  );
}
