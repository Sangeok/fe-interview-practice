interface ProgressHeaderProps {
  score: number;
  currentQuestionIndex: number;
  totalQuestions: number;
}

export default function ProgressHeader({ score, currentQuestionIndex, totalQuestions }: ProgressHeaderProps) {
  // 진행률 계산 (1-based 표시를 위해 +1)
  const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  return (
    <div className="sticky top-4 z-10 bg-zinc-800/70 backdrop-blur-sm border border-zinc-700/50 rounded-lg p-4 animate-fade-up-1">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-zinc-400">진행 상황</span>
        <span className="text-xs text-zinc-400">
          점수 <span className="text-emerald-400 font-semibold">{score}</span>
        </span>
      </div>

      <div className="mt-2 flex items-center gap-3">
        <div className="flex min-w-[74px] items-baseline">
          <span className="text-lg font-semibold text-zinc-100">{currentQuestionIndex + 1}</span>
          <span className="text-zinc-500 text-sm"> / {totalQuestions}</span>
        </div>

        <div
          className="relative w-full h-2 rounded-full bg-zinc-700 overflow-hidden"
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-500 transition-[width] duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <span className="text-xs tabular-nums text-zinc-400 w-10 text-right">{progressPercent}%</span>
      </div>
    </div>
  );
}
