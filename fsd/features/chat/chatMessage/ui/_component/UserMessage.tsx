import { User } from "lucide-react";

function UserAvatar() {
  return (
    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center shadow-lg border border-cyan-400/30">
      <User size={18} className="text-white" />
    </div>
  );
}

export default function UserMessage({ content }: { content: string }) {
  return (
    <div className="flex items-start gap-3 justify-end animate-slide-in-right">
      <div className="relative group max-w-lg">
        {/* Holographic border effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg opacity-80 blur-sm group-hover:opacity-100 transition-opacity"></div>

        {/* Message content */}
        <div className="relative bg-gradient-to-br from-cyan-500 to-cyan-600 text-white px-4 py-3 rounded-lg rounded-br-none border border-cyan-400/30 shadow-lg">
          <div className="flex items-start gap-2">
            <span className="text-cyan-100 font-mono text-xs flex-shrink-0 mt-0.5">{"<"}</span>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
          </div>
        </div>

        {/* Corner accent */}
        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-400/50 rounded-br"></div>
      </div>

      <UserAvatar />
    </div>
  );
}
