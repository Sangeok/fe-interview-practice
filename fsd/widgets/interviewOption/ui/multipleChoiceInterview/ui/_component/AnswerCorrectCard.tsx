interface AnswerCorrectCardProps {
  onNext?: () => void;
}

export default function AnswerCorrectCard({ onNext }: AnswerCorrectCardProps) {
  return (
    <div className="animate-fade-in delay-300">
      {/* Success Terminal Window */}
      <div className="relative border border-lime-500/40 rounded-lg overflow-hidden bg-zinc-900/90 backdrop-blur-sm shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-lime-500/10 to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 border border-lime-500/20 rounded-lg pointer-events-none animate-pulse-glow-subtle"></div>

        {/* Window Title Bar */}
        <div className="relative flex items-center justify-between px-4 py-3 border-b border-lime-500/20 bg-zinc-950/50">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-lime-500"></div>
            </div>
            <span className="text-xs font-mono text-lime-400 ml-2">validation.success</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-lime-400">✓ PASSED</span>
          </div>
        </div>

        {/* Success Content */}
        <div className="relative p-8">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-lime-500/20 blur-2xl rounded-full animate-pulse"></div>
              <div className="relative w-20 h-20 rounded-full border-4 border-lime-500/50 bg-lime-500/10 flex items-center justify-center">
                <svg className="w-10 h-10 text-lime-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Success Message */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-lime-400 mb-3 font-mono">정답입니다!</h3>
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-lime-400 font-mono text-sm">{">"}</span>
              <p className="text-zinc-300 font-mono text-sm">Test case passed successfully</p>
            </div>
            <p className="text-zinc-400 text-sm">훌륭해요! 다음 문제로 진행하세요.</p>
          </div>

          {/* Terminal Output */}
          <div className="bg-zinc-950/80 rounded-lg border border-lime-500/20 p-4 mb-6 font-mono text-xs">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lime-400">$</span>
              <span className="text-zinc-400">validate answer</span>
            </div>
            <div className="pl-4 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-lime-400">✓</span>
                <span className="text-zinc-500">Checking answer...</span>
                <span className="text-lime-400">OK</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lime-400">✓</span>
                <span className="text-zinc-500">Validating response...</span>
                <span className="text-lime-400">OK</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lime-400">✓</span>
                <span className="text-lime-400 font-semibold">All tests passed!</span>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={onNext}
            className="w-full relative px-6 py-4 rounded-lg font-mono font-semibold text-sm bg-lime-500/20 border border-lime-500/50 text-lime-400 hover:bg-lime-500/30 hover:shadow-[0_0_30px_rgba(132,204,22,0.3)] transition-all duration-300 active:scale-95 group"
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
