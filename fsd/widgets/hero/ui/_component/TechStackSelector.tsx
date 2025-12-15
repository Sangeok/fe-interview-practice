"use client";

import { useState } from "react";
import { TECH_STACK_OPTIONS } from "../../lib/constants";
import { TechType } from "@/fsd/shared/model/type";

interface TechStackSelectorProps {
  onClose: () => void;
  selectedRouteType: (selectedTitle: TechType) => void;
}

// Tech stack metadata with colors and descriptions
const TECH_META = {
  JavaScript: {
    color: "from-yellow-400 via-yellow-500 to-amber-500",
    glow: "shadow-[0_0_30px_rgba(234,179,8,0.5)]",
    icon: "JS",
    desc: "Core language fundamentals",
  },
  TypeScript: {
    color: "from-blue-400 via-blue-500 to-cyan-500",
    glow: "shadow-[0_0_30px_rgba(59,130,246,0.5)]",
    icon: "TS",
    desc: "Type-safe development",
  },
  React: {
    color: "from-cyan-400 via-cyan-500 to-blue-500",
    glow: "shadow-[0_0_30px_rgba(6,182,212,0.5)]",
    icon: "⚛",
    desc: "Component architecture",
  },
};

const TechStackSelector = ({ onClose, selectedRouteType }: TechStackSelectorProps) => {
  const [selectedTitle, setSelectedTitle] = useState<TechType | "">("");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handleSelect = (value: TechType) => {
    setSelectedTitle(value);
  };

  const handleConfirm = () => {
    if (selectedTitle) {
      selectedRouteType(selectedTitle);
    }
  };

  return (
    <div role="radiogroup" aria-label="기술 스택 선택" data-testid="tech-stack-selector" className="relative p-6">
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="inline-flex items-center gap-2 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse"></div>
          <span className="text-lime-400 font-mono text-xs tracking-wider">INITIALIZING</span>
          <div className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse"></div>
        </div>
        <h3 className="text-zinc-400 text-sm font-mono">
          <span className="text-cyan-400">{">"}</span> Select your tech module
        </h3>
      </div>

      {/* Tech Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {TECH_STACK_OPTIONS.map((option, index) => {
          const meta = TECH_META[option.value as keyof typeof TECH_META];
          const isSelected = selectedTitle === option.value;
          const isHovered = hoveredCard === option.value;

          return (
            <button
              key={option.id}
              onClick={() => handleSelect(option.value as TechType)}
              onMouseEnter={() => setHoveredCard(option.value)}
              onMouseLeave={() => setHoveredCard(null)}
              data-testid={`tech-option-${option.value}`}
              role="radio"
              aria-checked={isSelected}
              className={`
                relative group overflow-hidden
                rounded-lg p-6
                transition-all duration-300 ease-out
                ${isSelected ? "scale-105" : "scale-100 hover:scale-[1.02]"}
                ${isSelected ? meta.glow : ""}
                animate-fade-in
              `}
              style={{
                animationDelay: `${index * 100}ms`,
                transformStyle: "preserve-3d",
                transform: isHovered && !isSelected ? "perspective(1000px) rotateY(5deg) rotateX(-5deg)" : "none",
              }}
            >
              {/* Holographic border */}
              <div
                className={`
                  absolute inset-0 rounded-lg p-[1px]
                  bg-gradient-to-br ${meta.color}
                  ${isSelected ? "opacity-100" : "opacity-40 group-hover:opacity-70"}
                  transition-opacity duration-300
                `}
              >
                <div className="w-full h-full bg-zinc-900/95 rounded-lg backdrop-blur-sm"></div>
              </div>

              {/* Glow effect */}
              {isSelected && (
                <div
                  className={`
                    absolute inset-0 rounded-lg
                    bg-gradient-to-br ${meta.color}
                    opacity-20 blur-xl animate-pulse
                  `}
                ></div>
              )}

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center text-center">
                {/* Icon */}
                <div
                  className={`
                    text-4xl font-bold mb-3
                    bg-gradient-to-br ${meta.color} bg-clip-text text-transparent
                    ${isSelected ? "scale-110" : "scale-100 group-hover:scale-105"}
                    transition-transform duration-300
                    font-mono
                  `}
                >
                  {meta.icon}
                </div>

                {/* Title */}
                <h4
                  className={`
                    text-lg font-bold mb-1 font-mono tracking-tight
                    ${isSelected ? "text-white" : "text-zinc-300 group-hover:text-white"}
                    transition-colors duration-300
                  `}
                >
                  {option.label}
                </h4>

                {/* Description */}
                <p
                  className={`
                    text-xs font-mono
                    ${isSelected ? "text-zinc-400" : "text-zinc-500 group-hover:text-zinc-400"}
                    transition-colors duration-300
                  `}
                >
                  {meta.desc}
                </p>

                {/* Selection indicator */}
                {isSelected && (
                  <div className="mt-3 flex items-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-lime-400 animate-pulse"></div>
                    <span className="text-lime-400 text-xs font-mono">ACTIVE</span>
                    <div className="w-1 h-1 rounded-full bg-lime-400 animate-pulse"></div>
                  </div>
                )}
              </div>

              {/* Corner accents */}
              <div
                className={`
                  absolute top-2 left-2 w-3 h-3 border-t border-l rounded-tl
                  ${isSelected ? "border-lime-400" : "border-zinc-700 group-hover:border-cyan-500"}
                  transition-colors duration-300
                `}
              ></div>
              <div
                className={`
                  absolute bottom-2 right-2 w-3 h-3 border-b border-r rounded-br
                  ${isSelected ? "border-lime-400" : "border-zinc-700 group-hover:border-cyan-500"}
                  transition-colors duration-300
                `}
              ></div>
            </button>
          );
        })}
      </div>

      {/* Terminal-style action buttons */}
      <div className="flex justify-between items-center gap-3">
        <button
          onClick={handleConfirm}
          disabled={!selectedTitle}
          data-testid="tech-select-button"
          className={`
            relative flex-1 px-6 py-3 rounded-md
            font-mono text-sm font-medium
            transition-all duration-300
            ${
              selectedTitle
                ? "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white hover:from-cyan-400 hover:to-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]"
                : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
            }
            overflow-hidden
          `}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <span className="text-lime-400">{">"}</span>
            EXECUTE
          </span>
          {selectedTitle && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          )}
        </button>

        <button
          onClick={onClose}
          data-testid="tech-close-button"
          className="
            px-6 py-3 rounded-md
            bg-zinc-800/50 hover:bg-zinc-700/50
            border border-zinc-700 hover:border-zinc-600
            text-zinc-400 hover:text-zinc-300
            font-mono text-sm font-medium
            transition-all duration-300
            hover:shadow-[0_0_15px_rgba(113,113,122,0.3)]
          "
        >
          <span className="flex items-center gap-2">
            <span className="text-zinc-500">{">"}</span>
            CANCEL
          </span>
        </button>
      </div>

      {/* Background grid pattern */}
      <div className="absolute inset-0 -z-10 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.3)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>
    </div>
  );
};

export default TechStackSelector;
