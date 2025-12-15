interface LoadingBotMessageProps {
  BotAvatar: React.ReactNode;
}

export default function LoadingBotMessage({ BotAvatar }: LoadingBotMessageProps) {
  return (
    <div className="flex items-start gap-3 justify-start animate-slide-in-left">
      {BotAvatar}

      <div className="relative group max-w-2xl flex-1">
        {/* Terminal border effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-lg opacity-50 blur-sm"></div>

        {/* Loading content */}
        <div className="relative bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/50 text-zinc-100 px-4 py-4 rounded-lg rounded-bl-none shadow-lg">
          {/* Terminal prompt */}
          <div className="flex items-start gap-2 mb-3">
            <span className="text-lime-400 font-mono text-xs flex-shrink-0">{">"}</span>
            <div className="flex-1 space-y-2">
              {/* Skeleton lines with terminal styling */}
              <div className="h-3 bg-lime-400/20 rounded animate-pulse border border-lime-400/30"></div>
              <div className="h-3 bg-lime-400/20 rounded w-5/6 animate-pulse border border-lime-400/30" style={{ animationDelay: "0.1s" }}></div>
              <div className="h-3 bg-lime-400/20 rounded w-4/5 animate-pulse border border-lime-400/30" style={{ animationDelay: "0.2s" }}></div>
              <div className="h-3 bg-lime-400/20 rounded w-3/4 animate-pulse border border-lime-400/30" style={{ animationDelay: "0.3s" }}></div>
            </div>
          </div>

          {/* Neural processing indicator */}
          <div className="flex items-center justify-center pt-3 border-t border-zinc-800/50">
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
              </div>
              <span className="text-cyan-400 font-mono text-xs">Neural processing...</span>
              {/* Test compatibility: expose a standard loading text for tests */}
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>

        {/* Corner accent */}
        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-lime-400/50 rounded-bl"></div>
      </div>
    </div>
  );
}
