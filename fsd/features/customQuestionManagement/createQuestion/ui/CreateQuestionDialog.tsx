"use client";

import Dialog from "@/fsd/shared/ui/atoms/dialog/ui";
import { useCreateQuestion } from "../model/hooks/useCreateQuestion";
import { Technology } from "@/fsd/entities/customQuestion/model/type";

interface CreateQuestionDialogProps {
  open: boolean;
  onClose: () => void;
}

const TECHNOLOGIES: readonly Technology[] = ["JavaScript", "React", "TypeScript"];
const QUESTION_MAX_LENGTH = 1000;

const techConfig = {
  JavaScript: { color: "#eab308", glow: "rgba(234, 179, 8, 0.4)" },
  React: { color: "#06b6d4", glow: "rgba(6, 182, 212, 0.4)" },
  TypeScript: { color: "#3b82f6", glow: "rgba(59, 130, 246, 0.4)" },
};

export default function CreateQuestionDialog({ open, onClose }: CreateQuestionDialogProps) {
  const { technology, question, errors, setTechnology, setQuestion, handleSubmit, reset } = useCreateQuestion();

  const handleCreate = async () => {
    const success = await handleSubmit();
    if (success) {
      reset();
      onClose();
    }
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel} title="">
      <div className="relative p-6">
        {/* Cyberpunk Background Effects */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none rounded-lg"></div>
        <div className="absolute inset-0 bg-grain-texture opacity-30 pointer-events-none rounded-lg"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-lime-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative">
          {/* Terminal Header */}
          <div className="mb-6 pb-4 border-b border-lime-500/30 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-lime-400 animate-pulse-glow"></div>
              <span className="text-lime-400 font-mono text-xs tracking-wider">CREATE_QUESTION</span>
            </div>
            <h2 className="text-2xl font-bold terminal-text glitch-text" data-text="NEW_ENTRY">
              NEW_ENTRY
            </h2>
            <p className="text-zinc-400 font-mono text-xs mt-1">
              <span className="text-cyan-400">{">"}</span> 질문 데이터베이스에 추가
            </p>
          </div>

          {/* Technology Selection */}
          <div className="mb-6 animate-fade-in delay-300">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-zinc-300 font-mono text-xs tracking-wider">SELECT_TECH:</span>
              <div className="h-px flex-1 bg-gradient-to-r from-zinc-600 to-transparent"></div>
            </div>
            <div className="flex gap-3">
              {TECHNOLOGIES.map((tech, index) => {
                const config = techConfig[tech];
                const isSelected = technology === tech;

                return (
                  <button
                    key={tech}
                    onClick={() => setTechnology(tech)}
                    className={`group relative px-5 py-2.5 rounded-lg font-mono text-sm font-bold transition-all duration-300 ${
                      isSelected ? "scale-105" : "hover:scale-102"
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Background */}
                    <div className="absolute inset-0 rounded-lg bg-zinc-900/60 backdrop-blur-sm"></div>

                    {/* Glow Effect */}
                    <div
                      className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                        isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                      }`}
                      style={{
                        background: `linear-gradient(135deg, ${config.glow} 0%, transparent 100%)`,
                        boxShadow: isSelected
                          ? `0 0 25px ${config.glow}, inset 0 0 20px ${config.glow}`
                          : `0 0 15px ${config.glow}`,
                      }}
                    ></div>

                    {/* Border */}
                    <div
                      className="absolute inset-0 rounded-lg border transition-all duration-300"
                      style={{
                        borderColor: isSelected ? config.color : "#3f3f46",
                        borderWidth: isSelected ? "2px" : "1px",
                      }}
                    ></div>

                    {/* Content */}
                    <div className="relative flex items-center gap-2">
                      <span
                        className="text-sm transition-all duration-300"
                        style={{
                          color: isSelected ? config.color : "#a1a1aa",
                        }}
                      >
                        {tech}
                      </span>
                      {isSelected && (
                        <div
                          className="w-1.5 h-1.5 rounded-full animate-pulse-glow"
                          style={{ backgroundColor: config.color }}
                        ></div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question Input */}
          <div className="mb-6 animate-fade-in delay-500">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-zinc-300 font-mono text-xs tracking-wider">QUERY_INPUT:</span>
              <div className="h-px flex-1 bg-gradient-to-r from-zinc-600 to-transparent"></div>
            </div>
            <div className="relative group">
              {/* Scanline Effect */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent animate-pulse opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
              </div>

              <textarea
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="> 질문을 입력하세요..."
                className="relative w-full min-h-32 p-4 bg-zinc-900/60 border border-lime-500/40 rounded-lg text-white placeholder-zinc-500 resize-none focus:outline-none font-mono text-sm backdrop-blur-sm transition-all duration-300 focus:border-cyan-400 focus:shadow-[0_0_25px_rgba(6,182,212,0.4)]"
                maxLength={QUESTION_MAX_LENGTH}
              />

              {/* Character Counter */}
              <div className="flex items-center justify-between mt-2">
                <div className="text-zinc-500 font-mono text-xs">
                  <span className="text-cyan-400">{">"}</span> BUFFER_STATUS
                </div>
                <div className="font-mono text-xs">
                  <span className={question.length > QUESTION_MAX_LENGTH * 0.9 ? "text-yellow-400" : "text-zinc-400"}>
                    {question.length}
                  </span>
                  <span className="text-zinc-600 mx-1">/</span>
                  <span className="text-zinc-500">{QUESTION_MAX_LENGTH}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Validation Errors */}
          {errors.length > 0 && (
            <div className="mb-6 animate-fade-in">
              <div className="terminal-box border-red-500/30 bg-red-500/5 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse-glow"></div>
                  <span className="text-red-400 font-mono text-xs tracking-wider">ERROR_LOG</span>
                </div>
                <div className="flex flex-col gap-2">
                  {errors.map((error, index) => (
                    <div key={`${error}-${index}`} className="flex items-start gap-2">
                      <span className="text-red-400 font-mono text-xs">{">"}</span>
                      <p className="text-red-400 font-mono text-xs leading-relaxed">{error}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end animate-fade-in delay-700">
            <button
              onClick={handleCancel}
              className="group relative px-6 py-3 rounded-lg font-mono font-bold text-sm transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 rounded-lg bg-zinc-800/50 border border-zinc-700 transition-all duration-300 group-hover:border-zinc-600 group-hover:shadow-[0_0_15px_rgba(113,113,122,0.3)]"></div>
              <span className="relative text-zinc-400 group-hover:text-zinc-300 transition-colors">CANCEL</span>
            </button>

            <button
              onClick={handleCreate}
              className="group relative px-6 py-3 rounded-lg font-mono font-bold text-sm transition-all duration-300 hover:scale-105"
            >
              {/* Animated Glow */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/20 to-lime-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Border with Glow */}
              <div className="absolute inset-0 rounded-lg border-2 border-cyan-500/50 transition-all duration-300 group-hover:border-cyan-400 group-hover:shadow-[0_0_25px_rgba(6,182,212,0.5),inset_0_0_15px_rgba(6,182,212,0.2)]"></div>

              {/* Content */}
              <div className="relative flex items-center gap-2">
                <span className="text-cyan-400 group-hover:text-cyan-300 transition-colors">CREATE</span>
                <span className="text-cyan-400 group-hover:text-cyan-300 transition-all duration-300 group-hover:translate-x-1">
                  {">"}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
