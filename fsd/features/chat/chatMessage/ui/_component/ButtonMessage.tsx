import Button from "@/fsd/shared/ui/atoms/button/ui/Button";
import { Pen, X } from "lucide-react";

interface ButtonMessageProps {
  onNext?: () => void;
  onEnd?: () => void;
  onAddReview?: () => void;
  showNext?: boolean;
}

export default function ButtonMessage({ onNext, onEnd, onAddReview, showNext = true }: ButtonMessageProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 px-4 animate-fade-in">
      {showNext && (
        <button
          onClick={onNext}
          className="group relative px-4 py-2 rounded-md font-mono text-sm font-medium bg-gradient-to-r from-cyan-500 to-cyan-600 text-white hover:from-cyan-400 hover:to-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-all duration-300 hover:scale-105 border border-cyan-400/30"
        >
          <span className="flex items-center gap-2">
            <Pen size={14} />
            <span>NEXT</span>
            <span className="text-cyan-200">→</span>
          </span>
        </button>
      )}

      <button
        onClick={onAddReview}
        className="group relative px-4 py-2 rounded-md font-mono text-sm font-medium bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700 hover:border-lime-500/50 text-zinc-300 hover:text-lime-400 transition-all duration-300 hover:shadow-[0_0_15px_rgba(132,204,22,0.3)]"
      >
        <span className="flex items-center gap-2">
          <span className="text-zinc-500 group-hover:text-lime-400 transition-colors">{">"}</span>
          <span>Add Review</span>
        </span>
      </button>

      <button
        onClick={onEnd}
        className="group relative px-4 py-2 rounded-md font-mono text-sm font-medium bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700 hover:border-red-500/50 text-zinc-300 hover:text-red-400 transition-all duration-300 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]"
      >
        <span className="flex items-center gap-2">
          <X size={14} />
          <span>END</span>
        </span>
      </button>
    </div>
  );
}
