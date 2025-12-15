"use client";

import Button from "@/fsd/shared/ui/atoms/button/ui/Button";
import CreateQuestionDialog from "@/fsd/features/customQuestionManagement/createQuestion/ui/CreateQuestionDialog";
import QuestionList from "./_component/QuestionList";
import { useQuestionManager } from "../model/hooks/useQuestionManager";
import { Technology } from "@/fsd/entities/customQuestion/model/type";

export default function CustomQuestionManager() {
  const {
    selectedTechnology,
    setSelectedTechnology,
    createDialogOpen,
    handleOpenCreateDialog,
    handleCloseCreateDialog,
  } = useQuestionManager();

  const technologies: { value: Technology; label: string; color: string; glow: string }[] = [
    { value: "JavaScript", label: "JavaScript", color: "#eab308", glow: "rgba(234, 179, 8, 0.4)" },
    { value: "React", label: "React", color: "#06b6d4", glow: "rgba(6, 182, 212, 0.4)" },
    { value: "TypeScript", label: "TypeScript", color: "#3b82f6", glow: "rgba(59, 130, 246, 0.4)" },
  ];

  return (
    <>
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[#0a0a0a] -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        <div className="absolute inset-0 bg-grain-texture opacity-30"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-float-slow"></div>
        <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-lime-500/10 rounded-full blur-[120px] animate-float-slower"></div>
      </div>

      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Terminal Header */}
          <div className="mb-8 animate-fade-in-up">
            <div className="terminal-box p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full bg-lime-400 animate-pulse-glow"></div>
                    <span className="text-lime-400 font-mono text-sm">SYSTEM ONLINE</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold terminal-text glitch-text" data-text="QUESTION_MANAGER">
                    QUESTION_MANAGER
                  </h1>
                  <p className="text-zinc-400 font-mono text-sm mt-2">
                    <span className="text-cyan-400">{">"}</span> 커스텀 질문 데이터베이스
                  </p>
                </div>
                <button
                  onClick={handleOpenCreateDialog}
                  className="group relative px-6 py-3 bg-gradient-to-r from-cyan-500/10 to-lime-500/10 border border-cyan-500/50 rounded-lg hover:border-cyan-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400 font-mono text-lg group-hover:scale-110 transition-transform">+</span>
                    <span className="text-white font-medium">질문 추가</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Technology Selector */}
          <div className="mb-8 animate-fade-in delay-300">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-zinc-400 font-mono text-sm">SELECT_TECH:</span>
              <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent"></div>
            </div>
            <div className="flex flex-wrap gap-3">
              {technologies.map((tech, index) => (
                <button
                  key={tech.value}
                  onClick={() => setSelectedTechnology(tech.value)}
                  className={`group relative px-6 py-3 rounded-lg font-mono font-bold transition-all duration-300 ${
                    selectedTechnology === tech.value
                      ? "scale-105"
                      : "opacity-60 hover:opacity-100"
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Glow Effect */}
                  <div
                    className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                      selectedTechnology === tech.value
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-70"
                    }`}
                    style={{
                      background: `linear-gradient(135deg, ${tech.glow} 0%, transparent 100%)`,
                      boxShadow: selectedTechnology === tech.value
                        ? `0 0 30px ${tech.glow}, inset 0 0 20px ${tech.glow}`
                        : `0 0 15px ${tech.glow}`,
                    }}
                  ></div>

                  {/* Border */}
                  <div
                    className={`absolute inset-0 rounded-lg border transition-all duration-300`}
                    style={{
                      borderColor: selectedTechnology === tech.value ? tech.color : tech.glow,
                      borderWidth: selectedTechnology === tech.value ? "2px" : "1px",
                    }}
                  ></div>

                  {/* Content */}
                  <div className="relative flex items-center gap-2 bg-[#0a0a0a]/90 rounded-lg px-4 py-2">
                    <span
                      className="text-sm transition-all duration-300"
                      style={{
                        color: selectedTechnology === tech.value ? tech.color : "#a1a1aa",
                      }}
                    >
                      {tech.label}
                    </span>
                    {selectedTechnology === tech.value && (
                      <div
                        className="w-1.5 h-1.5 rounded-full animate-pulse-glow"
                        style={{ backgroundColor: tech.color }}
                      ></div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Question List Container */}
          <div className="animate-fade-in delay-500">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-zinc-400 font-mono text-sm">QUERY_RESULTS:</span>
              <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent"></div>
            </div>
            <QuestionList selectedTechnology={selectedTechnology} />
          </div>
        </div>
      </div>

      {/* Create Dialog */}
      <CreateQuestionDialog open={createDialogOpen} onClose={handleCloseCreateDialog} />
    </>
  );
}
