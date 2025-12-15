interface HeaderButtonProps {
  handleGoFirst: () => void;
  handleAddToReview: () => void;
}

export default function HeaderButton({ handleGoFirst, handleAddToReview }: HeaderButtonProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Home Button */}
      <button
        onClick={handleGoFirst}
        className="group relative px-4 py-2 rounded-lg font-mono text-xs font-semibold bg-zinc-900/80 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/60 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all duration-300 active:scale-95"
      >
        <span className="relative z-10 flex items-center gap-2">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="hidden sm:inline">처음으로</span>
          <span className="sm:hidden">홈</span>
        </span>
      </button>

      {/* Add to Review Button */}
      <button
        onClick={handleAddToReview}
        className="group relative px-4 py-2 rounded-lg font-mono text-xs font-semibold bg-zinc-900/80 border border-lime-500/40 text-lime-400 hover:bg-lime-500/10 hover:border-lime-500/60 hover:shadow-[0_0_15px_rgba(132,204,22,0.2)] transition-all duration-300 active:scale-95"
      >
        <span className="relative z-10 flex items-center gap-2">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="hidden sm:inline">복습 추가</span>
          <span className="sm:hidden">복습</span>
        </span>
      </button>
    </div>
  );
}
