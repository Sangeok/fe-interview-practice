"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Dialog from "fsd/shared/ui/atoms/dialog/ui";
import TechStackSelector from "fsd/widgets/hero/ui/_component/TechStackSelector";
import { useUserStore } from "@/fsd/entities/user/useUserStore";
import { useSelectTechStore } from "@/fsd/shared/model/useSelectTechStore";
import { TechType } from "@/fsd/shared/model/type";

export default function MainPage() {
  const router = useRouter();
  const [interviewDialogOpen, setInterviewDialogOpen] = useState(false);
  const [interviewType, setInterviewType] = useState<"basic" | "custom">("basic");
  const { setTech } = useSelectTechStore();
  const hydrateUserFromDB = useUserStore((s) => s.hydrateUserFromDB);

  const handleInterviewDialogOpen = async () => {
    await hydrateUserFromDB();
    setInterviewDialogOpen(true);
  };

  const handleInterviewDialogClose = () => {
    setInterviewDialogOpen(false);
  };

  const handleReviewDialogOpen = async () => {
    await hydrateUserFromDB();
    router.push("/reviews");
  };

  const handleCustomQuestionsOpen = () => {
    router.push("/custom-questions");
  };

  const validateTechSelection = (selectedTitle: TechType | ""): selectedTitle is TechType => {
    if (!selectedTitle) {
      alert("기술 스택을 선택하세요.");
      return false;
    }
    return true;
  };

  const handleRouteToInterview = (selectedTitle: TechType | "") => {
    if (!validateTechSelection(selectedTitle)) return;
    setTech(selectedTitle);
    const basePath = interviewType === "basic" ? "interviews" : "custom-interviews";
    router.push(`/${basePath}/${selectedTitle}`);
    handleInterviewDialogClose();
  };

  const handleSelectInterview = (type: "basic" | "custom") => {
    setInterviewType(type);
    handleInterviewDialogOpen();
  };

  return (
    <>
      {/* Background */}
      <div className="fixed inset-0 bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        <div className="absolute inset-0 bg-grain-texture opacity-30"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-float-slow"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-lime-500/10 rounded-full blur-[120px] animate-float-slower"></div>
      </div>

      {/* Floating Tech Badges */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
        <div className="absolute top-[15%] left-[8%] animate-float-badge-1 opacity-60 hover:opacity-100 transition-opacity">
          <div className="tech-badge text-base">React</div>
        </div>
        <div className="absolute top-[25%] right-[12%] animate-float-badge-2 opacity-60 hover:opacity-100 transition-opacity">
          <div className="tech-badge tech-badge-ts text-base">TS</div>
        </div>
        <div className="absolute bottom-[35%] left-[15%] animate-float-badge-3 opacity-60 hover:opacity-100 transition-opacity">
          <div className="tech-badge tech-badge-js text-base">JS</div>
        </div>
        <div className="absolute top-[55%] right-[10%] animate-float-badge-1 opacity-60 hover:opacity-100 transition-opacity">
          <div className="tech-badge text-base">&lt;/&gt;</div>
        </div>
        <div className="absolute bottom-[25%] right-[20%] animate-float-badge-2 opacity-60 hover:opacity-100 transition-opacity">
          <div className="tech-badge tech-badge-ts text-lg">&#123; &#125;</div>
        </div>
        <div className="absolute top-[40%] left-[12%] animate-float-badge-3 opacity-50 hover:opacity-100 transition-opacity">
          <div className="tech-badge text-sm">fn()</div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative flex items-center justify-center z-20 overflow-hidden">
        <div className="w-full max-w-7xl">
          {/* Hero Section */}
          <div className="text-center animate-fade-in-up mb-6 sm:mb-8">
            {/* Main Headline */}
            <div className="mb-3 sm:mb-4 md:mb-6 w-full">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold tracking-tight leading-tight w-full max-w-full">
                <span
                  className="block md:inline-block animate-slide-in-left terminal-text glitch-text max-w-full"
                  data-text="FRONT"
                >
                  FRONT
                </span>
                <br className="md:hidden" />
                <span
                  className="block md:inline-block animate-slide-in-right gradient-text md:ml-6 max-w-full"
                  data-text="END"
                >
                  END
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <div className="relative inline-block mb-3 sm:mb-4 animate-fade-in delay-300">
              <div className="terminal-box px-4 sm:px-6 md:px-10 py-2 sm:py-3 md:py-4">
                <span className="text-lime-400 font-mono text-sm sm:text-base md:text-xl">{">"}</span>
                <span className="text-zinc-300 font-mono text-sm sm:text-base md:text-xl ml-2">
                  Interview Practice Arena
                </span>
                <span className="terminal-cursor hidden sm:inline-block">_</span>
              </div>
            </div>

            <p className="text-zinc-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed animate-fade-in delay-500 font-light px-4 hidden sm:block">
              Master your frontend interviews with AI-powered feedback.
              <br className="hidden md:inline" />
              <span className="text-cyan-400 font-medium"> Level up</span> your skills in React, JavaScript, and
              TypeScript.
            </p>
          </div>

          {/* Action Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto md:items-stretch">
            {/* Start Interview Card */}
            <div
              className="action-card group animate-fade-in delay-700 h-full"
              onClick={() => handleSelectInterview("basic")}
              data-testid="try-now-button"
            >
              <div className="action-card-border"></div>
              <div className="action-card-content p-4 sm:p-6 md:p-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-cyan-400 font-mono text-xs sm:text-sm">01</span>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-lime-400 animate-pulse-glow"></div>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2 group-hover:text-cyan-400 transition-colors">
                  Start Interview
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm font-light hidden sm:block">
                  Begin your practice session with AI-generated questions
                </p>
                <div className="mt-2 sm:mt-4 flex items-center text-cyan-400 font-mono text-xs sm:text-sm group-hover:translate-x-2 transition-transform">
                  <span>Launch</span>
                  <span className="ml-2">→</span>
                </div>
              </div>
            </div>

            {/* Review Card */}
            <div
              className="action-card group animate-fade-in delay-800 h-full"
              onClick={handleReviewDialogOpen}
              data-testid="review-button"
            >
              <div className="action-card-border"></div>
              <div className="action-card-content p-4 sm:p-6 md:p-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-cyan-400 font-mono text-xs sm:text-sm">02</span>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-lime-400 animate-pulse-glow"></div>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2 group-hover:text-lime-400 transition-colors">
                  Review Mistakes
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm font-light hidden sm:block">
                  Practice questions you got wrong and improve your skills
                </p>
                <div className="mt-2 sm:mt-4 flex items-center text-lime-400 font-mono text-xs sm:text-sm group-hover:translate-x-2 transition-transform">
                  <span>Review</span>
                  <span className="ml-2">→</span>
                </div>
              </div>
            </div>

            {/* Custom Interview Card */}
            <div
              className="action-card group animate-fade-in delay-900 h-full"
              onClick={() => handleSelectInterview("custom")}
              data-testid="custom-interview-button"
            >
              <div className="action-card-border"></div>
              <div className="action-card-content p-4 sm:p-6 md:p-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-cyan-400 font-mono text-xs sm:text-sm">03</span>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-lime-400 animate-pulse-glow"></div>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2 group-hover:text-cyan-400 transition-colors">
                  커스텀 면접
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm font-light hidden sm:block">
                  나만의 질문으로 맞춤형 인터뷰 연습
                </p>
                <div className="mt-2 sm:mt-4 flex items-center text-cyan-400 font-mono text-xs sm:text-sm group-hover:translate-x-2 transition-transform">
                  <span>Customize</span>
                  <span className="ml-2">→</span>
                </div>
              </div>
            </div>

            {/* Manage Questions Card */}
            <div
              className="action-card group animate-fade-in delay-1000 h-full"
              onClick={handleCustomQuestionsOpen}
              data-testid="custom-questions-button"
            >
              <div className="action-card-border"></div>
              <div className="action-card-content p-4 sm:p-6 md:p-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-cyan-400 font-mono text-xs sm:text-sm">04</span>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-lime-400 animate-pulse-glow"></div>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2 group-hover:text-lime-400 transition-colors">
                  질문 관리
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm font-light hidden sm:block">커스텀 질문 추가 및 관리</p>
                <div className="mt-2 sm:mt-4 flex items-center text-lime-400 font-mono text-xs sm:text-sm group-hover:translate-x-2 transition-transform">
                  <span>Manage</span>
                  <span className="ml-2">→</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-6 sm:mt-8 md:mt-12 text-center animate-fade-in delay-1100 hidden sm:block">
            <div className="inline-flex items-center gap-2 sm:gap-3 md:gap-4 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm shadow-lg">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-lime-400 animate-pulse"></div>
                <span className="text-zinc-400 text-xs sm:text-sm font-mono">AI Powered</span>
              </div>
              <div className="w-px h-3 sm:h-4 md:h-5 bg-zinc-800"></div>
              <span className="text-zinc-500 text-xs sm:text-sm">Real-time Feedback</span>
              <div className="w-px h-3 sm:h-4 md:h-5 bg-zinc-800 hidden md:block"></div>
              <span className="text-zinc-500 text-xs sm:text-sm hidden md:inline">Progress Tracking</span>
            </div>
          </div>
        </div>
      </main>

      {/* Dialog */}
      <Dialog
        open={interviewDialogOpen}
        onClose={handleInterviewDialogClose}
        title="Select Tech Stack"
        data-testid="tech-selector-dialog"
      >
        <TechStackSelector onClose={handleInterviewDialogClose} selectedRouteType={handleRouteToInterview} />
      </Dialog>
    </>
  );
}
