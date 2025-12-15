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

  console.log("interpret", interpret);

  // 로딩 상태 UI
  if (loading) {
    return (
      <div className="animate-fade-in delay-300">
        <div className="relative border border-yellow-500/40 rounded-lg overflow-hidden bg-zinc-900/90 backdrop-blur-sm shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent pointer-events-none"></div>

          {/* Window Title Bar */}
          <div className="relative flex items-center justify-between px-4 py-3 border-b border-yellow-500/20 bg-zinc-950/50">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 animate-pulse"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-lime-500/80"></div>
              </div>
              <span className="text-xs font-mono text-yellow-400 ml-2">ai.interpret</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse"></div>
              <span className="text-xs font-mono text-yellow-400">PROCESSING</span>
            </div>
          </div>

          {/* Loading Content */}
          <div className="relative p-8">
            <div className="flex flex-col items-center justify-center py-12">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full"></div>
                <div className="relative w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin"></div>
              </div>
              <div className="text-center space-y-2">
                <p className="text-cyan-400 font-mono text-lg font-semibold">AI 분석 중...</p>
                <p className="text-zinc-400 text-sm">문제를 해석하고 있습니다</p>
              </div>

              {/* Terminal Output Simulation */}
              <div className="mt-8 w-full bg-zinc-950/80 rounded-lg border border-cyan-500/20 p-4 font-mono text-xs">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400">$</span>
                    <span className="text-zinc-400">analyze question</span>
                  </div>
                  <div className="pl-4 space-y-1 text-zinc-500">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
                      <span>Loading AI model...</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse delay-100"></div>
                      <span>Processing question context...</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse delay-200"></div>
                      <span>Generating explanation...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 데이터가 없을 때
  if (!interpret) return null;

  // 실제 데이터 표시
  return (
    <div className="animate-fade-in delay-300">
      <div className="relative border border-yellow-500/40 rounded-lg overflow-hidden bg-zinc-900/90 backdrop-blur-sm shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent pointer-events-none"></div>

        {/* Window Title Bar */}
        <div className="relative flex items-center justify-between px-4 py-3 border-b border-yellow-500/20 bg-zinc-950/50">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-lime-500/80"></div>
            </div>
            <span className="text-xs font-mono text-yellow-400 ml-2">explanation.md</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-yellow-400">⚠ REVIEW</span>
          </div>
        </div>

        {/* Content */}
        <div className="relative p-6 space-y-6">
          {/* Question Header */}
          <div className="bg-zinc-950/80 rounded-lg border border-yellow-500/20 p-4">
            <div className="flex items-start gap-2 mb-2">
              <span className="text-yellow-400 font-mono text-sm flex-shrink-0 mt-0.5">{">"}</span>
              <p className="text-zinc-300 text-sm font-mono">{interpret.Question}</p>
            </div>
          </div>

          {/* Summary Section */}
          <div className="bg-zinc-950/80 rounded-lg border border-cyan-500/30 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
              <h4 className="text-base font-mono font-semibold text-cyan-400">핵심 요약</h4>
            </div>
            <p className="text-zinc-300 leading-relaxed pl-5">{interpret.summary}</p>
          </div>

          {/* Theory Section */}
          <div className="bg-zinc-950/80 rounded-lg border border-lime-500/30 overflow-hidden">
            <button
              onClick={() => setExpandedTheory(!expandedTheory)}
              className="w-full flex items-center justify-between p-4 hover:bg-zinc-900/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-lime-400"></div>
                <h4 className="text-base font-mono font-semibold text-lime-400">{interpret.details.theory.title}</h4>
              </div>
              <span
                className={`text-lime-400 transform transition-transform duration-300 ${
                  expandedTheory ? "rotate-180" : "rotate-0"
                }`}
              >
                ▼
              </span>
            </button>

            {expandedTheory && (
              <div className="border-t border-lime-500/20 p-5 space-y-4 animate-fade-in">
                <p className="text-zinc-300 leading-relaxed">{interpret.details.theory.description}</p>

                {interpret.details.theory.rules.length > 0 && (
                  <div className="space-y-3">
                    <h5 className="text-sm font-mono font-semibold text-zinc-400">주요 규칙들</h5>
                    <div className="space-y-2">
                      {interpret.details.theory.rules.map((rule, index) => (
                        <div key={index} className="bg-zinc-900/80 p-4 rounded-lg border border-lime-500/20">
                          <h6 className="font-semibold text-lime-300 mb-2 font-mono text-sm">{rule.title}</h6>
                          <p className="text-zinc-400 text-sm leading-relaxed">{rule.explanation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Analogy Section */}
          <div className="bg-zinc-950/80 rounded-lg border border-purple-500/30 overflow-hidden">
            <button
              onClick={() => setExpandedAnalogy(!expandedAnalogy)}
              className="w-full flex items-center justify-between p-4 hover:bg-zinc-900/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                <h4 className="text-base font-mono font-semibold text-purple-400">
                  {interpret.details.analogy.title}
                </h4>
              </div>
              <span
                className={`text-purple-400 transform transition-transform duration-300 ${
                  expandedAnalogy ? "rotate-180" : "rotate-0"
                }`}
              >
                ▼
              </span>
            </button>

            {expandedAnalogy && (
              <div className="border-t border-purple-500/20 p-5 space-y-3 animate-fade-in">
                {interpret.details.analogy.scenarios.map((scenario, index) => (
                  <div key={index} className="bg-zinc-900/80 p-4 rounded-lg border border-purple-500/20">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 bg-purple-600/80 text-purple-100 text-xs rounded font-mono">
                        {scenario.type}
                      </span>
                      <h6 className="font-semibold text-purple-300 font-mono text-sm">{scenario.title}</h6>
                    </div>
                    <p className="text-zinc-300 leading-relaxed text-sm">{scenario.story}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Continue Button */}
          <button
            onClick={onNext}
            className="w-full relative px-6 py-4 rounded-lg font-mono font-semibold text-sm bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all duration-300 active:scale-95 group"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              다음 문제로 계속하기
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
