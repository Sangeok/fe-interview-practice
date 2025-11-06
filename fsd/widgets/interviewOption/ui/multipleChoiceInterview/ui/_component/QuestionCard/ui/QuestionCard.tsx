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
    <div className="p-6 bg-zinc-800 rounded-lg shadow-md animate-fade-up-1">
      <h3 className="text-xl font-semibold mb-4">Q. {question}</h3>
      <div className="flex flex-col gap-6 my-6">
        {options.map((option) => (
          <RadioInput
            key={option.id}
            label={option.label}
            name={question}
            value={option.label}
            checked={selectedOption?.label === option.label}
            onChange={() => selectOption(option)}
          />
        ))}
      </div>
      <div className="flex justify-end">
        <Button onClick={handleCheckAnswer} disabled={!canSubmit}>
          정답 확인
        </Button>
      </div>
    </div>
  );
}
