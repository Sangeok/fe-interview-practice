interface ProgressHeaderProps {
  score: number;
  currentQuestionIndex: number;
  totalQuestions: number;
}

export default function ProgressHeader({ score, currentQuestionIndex, totalQuestions }: ProgressHeaderProps) {
  // 진행률 계산 (1-based 표시를 위해 +1)
  const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  return (
    <div className="sticky top-4 z-20 animate-fade-in">
      {/* Terminal Window Header */}
      <div className="relative border border-cyan-500/30 rounded-lg overflow-hidden bg-zinc-900/90 backdrop-blur-sm shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 border border-cyan-500/20 rounded-lg pointer-events-none"></div>

        {/* Window Title Bar */}
        <div className="relative flex items-center justify-between px-4 py-2 border-b border-cyan-500/20 bg-zinc-950/50">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-lime-500/80"></div>
            </div>
            <span className="text-xs font-mono text-cyan-400 ml-2">interview.session</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse-glow"></div>
            <span className="text-xs font-mono text-lime-400">ACTIVE</span>
          </div>
        </div>

        {/* Progress Content */}
        <div className="relative p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 font-mono text-xs">$</span>
              <span className="text-zinc-400 font-mono text-xs">Running assessment...</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-zinc-950/80 rounded border border-lime-500/30">
              <span className="text-xs font-mono text-zinc-500">Score:</span>
              <span className="text-sm font-mono font-bold text-lime-400">{score}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-mono font-bold text-cyan-400">{currentQuestionIndex + 1}</span>
              <span className="text-zinc-600 font-mono text-sm">/{totalQuestions}</span>
            </div>

            <div className="flex-1 relative">
              <div className="h-2 rounded-full bg-zinc-800 border border-zinc-700 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 via-cyan-400 to-lime-400 transition-all duration-500 ease-out relative"
                  style={{ width: `${progressPercent}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                </div>
              </div>
            </div>

            <span className="text-sm font-mono font-bold text-cyan-400 tabular-nums min-w-[3ch]">{progressPercent}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
