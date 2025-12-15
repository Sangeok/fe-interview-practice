interface EndSubjectQuestionProps {
  score: number;
  totalQuestions: number;
}

export default function EndSubjectQuestion({ score, totalQuestions }: EndSubjectQuestionProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const isPerfect = percentage === 100;
  const isExcellent = percentage >= 80;
  const isGood = percentage >= 60;

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Atmospheric Background */}
      <div className="fixed inset-0 bg-[#0a0a0a] -z-10">
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        <div className="absolute inset-0 bg-grain-texture opacity-30"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-float-slow"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-lime-500/10 rounded-full blur-[120px] animate-float-slower"></div>
      </div>

      {/* Results Card */}
      <div className="relative max-w-2xl w-full mx-4 sm:mx-8">
        <div className="action-card animate-fade-in-up">
          <div className="action-card-border"></div>
          <div className="action-card-content p-8 sm:p-12">
            {/* Status Indicator */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-lime-400 animate-pulse-glow"></div>
              <span className="text-lime-400 font-mono text-xs sm:text-sm tracking-wider">SESSION COMPLETE</span>
              <div className="w-2 h-2 rounded-full bg-lime-400 animate-pulse-glow"></div>
            </div>

            {/* Title */}
            <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3">
              <span className="gradient-text">Interview</span>
              <br />
              <span className="terminal-text">Completed</span>
            </h2>

            {/* Score Display */}
            <div className="relative my-8 sm:my-12">
              <div className="text-center">
                <div className="inline-block relative">
                  {/* Circular Progress Background */}
                  <svg className="w-40 h-40 sm:w-48 sm:h-48 -rotate-90" viewBox="0 0 100 100">
                    {/* Background Circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="rgba(113, 113, 122, 0.2)"
                      strokeWidth="8"
                    />
                    {/* Progress Circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="url(#scoreGradient)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${percentage * 2.827} 283`}
                      className="transition-all duration-1000 ease-out animate-fade-in delay-300"
                    />
                    {/* Gradient Definition */}
                    <defs>
                      <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#84cc16" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Score Text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl sm:text-5xl font-bold gradient-text">{percentage}%</span>
                    <span className="text-zinc-400 font-mono text-xs sm:text-sm mt-1">
                      {score}/{totalQuestions}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Message */}
            <div className="terminal-box px-4 sm:px-6 py-3 sm:py-4 mb-6 sm:mb-8">
              <div className="flex items-start gap-3">
                <span className="text-cyan-400 font-mono text-sm flex-shrink-0">{">"}</span>
                <p className="text-zinc-300 font-mono text-sm sm:text-base">
                  {isPerfect && "Perfect score! Outstanding performance. 🎉"}
                  {!isPerfect && isExcellent && "Excellent work! You've mastered the concepts."}
                  {!isPerfect && !isExcellent && isGood && "Good job! Keep practicing to improve further."}
                  {!isPerfect && !isExcellent && !isGood && "Keep learning! Practice makes perfect."}
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="border border-zinc-800 bg-zinc-900/40 rounded-lg p-3 sm:p-4">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                  <span className="text-zinc-500 font-mono text-xs">Total Questions</span>
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-white font-mono">{totalQuestions}</p>
              </div>

              <div className="border border-zinc-800 bg-zinc-900/40 rounded-lg p-3 sm:p-4">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-lime-400"></div>
                  <span className="text-zinc-500 font-mono text-xs">Correct</span>
                </div>
                <p className="text-2xl sm:text-3xl font-bold gradient-text font-mono">{score}</p>
              </div>
            </div>

            {/* Footer Tip */}
            <div className="mt-6 sm:mt-8 text-center">
              <p className="text-zinc-500 text-xs sm:text-sm font-mono">
                Review your answers to improve your skills
              </p>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-cyan-500/40 rounded-tl-lg animate-pulse-glow-subtle"></div>
        <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-lime-500/40 rounded-br-lg animate-pulse-glow-subtle"></div>
      </div>
    </div>
  );
}
