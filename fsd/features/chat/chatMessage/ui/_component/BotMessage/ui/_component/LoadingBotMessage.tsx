interface LoadingBotMessageProps {
  BotAvatar: React.ReactNode;
}

export default function LoadingBotMessage({ BotAvatar }: LoadingBotMessageProps) {
  return (
    <div className="flex items-start gap-4 justify-start animate-fade-up-1">
      {BotAvatar}
      <div className="px-5 py-4 rounded-2xl max-w-2xl bg-zinc-800 shadow-md border border-zinc-700">
        {/* 스켈레톤 라인들 */}
        <div className="space-y-3 mb-4">
          <div className="h-4 bg-zinc-700 rounded animate-pulse"></div>
          <div className="h-4 bg-zinc-700 rounded w-5/6 animate-pulse"></div>
          <div className="h-4 bg-zinc-700 rounded w-4/5 animate-pulse"></div>
          <div className="h-4 bg-zinc-700 rounded w-3/4 animate-pulse"></div>
        </div>

        {/* 로딩 스피너와 텍스트 */}
        <div className="flex items-center justify-center pt-4 border-t border-zinc-700">
          <div className="flex items-center space-x-3 text-blue-400">
            <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm font-medium">AI가 답변을 생성하는 중입니다...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
