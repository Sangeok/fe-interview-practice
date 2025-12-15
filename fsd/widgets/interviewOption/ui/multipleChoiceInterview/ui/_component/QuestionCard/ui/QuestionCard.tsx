"use client";
import RadioInput from "@/fsd/shared/ui/atoms/input/ui/RadioInput";
import Button from "@/fsd/shared/ui/atoms/button/ui/Button";
import { MultipleChoiceInterpretType } from "@/fsd/shared/model/type";
import { Option } from "../../../../model/type";
import { useSelectTechStore } from "@/fsd/shared/model/useSelectTechStore";
import { useAnswerValidation } from "@/fsd/widgets/interviewOption/ui/multipleChoiceInterview/ui/_component/QuestionCard/model/hooks/useAnswerValidation";
import { useInterpretAPI } from "@/fsd/widgets/interviewOption/ui/multipleChoiceInterview/ui/_component/QuestionCard/model/hooks/useInterpretAPI";
import { useUserStore } from "@/fsd/entities/user/useUserStore";

interface QuestionCardProps {
  question: string;
  options: readonly Option[];
  answerString: string;
  setLoading: (loading: boolean) => void;
  setInterpret: (interpret: MultipleChoiceInterpretType) => void;
  onSubmitAnswer: (isCorrect: boolean) => void;
}

export default function QuestionCard({
  question,
  options,
  answerString,
  setLoading,
  setInterpret,
  onSubmitAnswer,
}: QuestionCardProps) {
  const { tech } = useSelectTechStore();
  const { generateInterpret } = useInterpretAPI();
  const { selectedOption, canSubmit, selectOption, validateAnswer } = useAnswerValidation();
  const persistUserToDB = useUserStore((s) => s.persistUserToDB);

  const handleCheckAnswer = async () => {
    const validation = validateAnswer();

    if (!validation.isValid) {
      alert(validation.message);
      return;
    }

    onSubmitAnswer(validation.isCorrect!);

    // 정답/오답 여부와 무관하게 현재 user 상태를 저장
    await persistUserToDB();

    if (!validation.isCorrect) {
      await handleGenerateInterpret();
    }
  };

  const handleGenerateInterpret = async () => {
    setLoading(true);

    const result = await generateInterpret({
      tech,
      question,
      answer: answerString,
    });

    if (result.success && result.data) {
      setInterpret(result.data);
    }

    setLoading(false);
  };

  return (
    <div className="animate-fade-in delay-300">
      {/* Terminal Window */}
      <div className="relative border border-cyan-500/30 rounded-lg overflow-hidden bg-zinc-900/90 backdrop-blur-sm shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent pointer-events-none"></div>

        {/* Window Title Bar */}
        <div className="relative flex items-center justify-between px-4 py-3 border-b border-cyan-500/20 bg-zinc-950/50">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-lime-500/80"></div>
            </div>
            <span className="text-xs font-mono text-cyan-400 ml-2">question.prompt</span>
          </div>
        </div>

        {/* Question Content */}
        <div className="relative p-6">
          {/* Question Text */}
          <div className="mb-6">
            <div className="flex items-start gap-3 mb-2">
              <span className="text-lime-400 font-mono text-sm flex-shrink-0 mt-1">{">"}</span>
              <h3 className="text-xl font-semibold text-zinc-100 leading-relaxed">{question}</h3>
            </div>
          </div>

          {/* Options */}
          <div className="flex flex-col gap-3 mb-6">
            {options.map((option, index) => {
              const isSelected = selectedOption?.label === option.label;
              return (
                <label
                  key={option.id}
                  className={`group relative cursor-pointer transition-all duration-300 ${
                    isSelected ? "transform scale-[1.02]" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name={question}
                    value={option.label}
                    checked={isSelected}
                    onChange={() => selectOption(option)}
                    className="sr-only"
                  />
                  <div
                    className={`
                    relative p-4 rounded-lg border transition-all duration-300
                    ${
                      isSelected
                        ? "bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                        : "bg-zinc-950/50 border-zinc-700/50 hover:border-cyan-500/30 hover:bg-zinc-900/70"
                    }
                  `}
                  >
                    <div className="flex items-start gap-3">
                      {/* Radio Indicator */}
                      <div className="flex-shrink-0 mt-0.5">
                        <div
                          className={`
                          w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center
                          ${
                            isSelected
                              ? "border-cyan-400 bg-cyan-500/20"
                              : "border-zinc-600 group-hover:border-cyan-500/50"
                          }
                        `}
                        >
                          {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-cyan-400"></div>}
                        </div>
                      </div>

                      {/* Option Label */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono text-zinc-500">Option {index + 1}</span>
                        </div>
                        <p
                          className={`
                          text-base leading-relaxed transition-colors duration-300
                          ${isSelected ? "text-zinc-100" : "text-zinc-300 group-hover:text-zinc-200"}
                        `}
                        >
                          {option.label}
                        </p>
                      </div>
                    </div>
                  </div>
                </label>
              );
            })}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              onClick={handleCheckAnswer}
              disabled={!canSubmit}
              className={`
                relative px-6 py-3 rounded-lg font-mono font-semibold text-sm transition-all duration-300
                ${
                  canSubmit
                    ? "bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] active:scale-95"
                    : "bg-zinc-800/50 border border-zinc-700/50 text-zinc-600 cursor-not-allowed"
                }
              `}
            >
              <span className="relative z-10">정답 확인 →</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
