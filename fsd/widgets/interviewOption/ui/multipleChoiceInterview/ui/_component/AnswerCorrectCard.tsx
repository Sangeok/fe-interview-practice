import Button from "@/fsd/shared/ui/atoms/button/ui/Button";

interface AnswerCorrectCardProps {
  onNext?: () => void;
}

export default function AnswerCorrectCard({ onNext }: AnswerCorrectCardProps) {
  return (
    <div className="relative p-6 bg-zinc-800 rounded-lg shadow-md animate-fade-up-1">
      {/* 축하 헤더 */}
      <div className="text-center mb-6">
        <div className="mb-4">
          <span className="text-6xl animate-bounce">🎉</span>
        </div>
        <h3 className="text-2xl font-bold text-green-400 mb-2">정답입니다!</h3>
        <p className="text-zinc-300">훌륭해요! 다음 문제로 넘어가세요.</p>
      </div>

      {/* 다음 문제 버튼 */}
      <div className="text-center">
        <Button
          onClick={onNext}
          size="md"
          className="w-full bg-black hover:bg-zinc-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
        >
          다음 문제로 계속하기 🚀
        </Button>
      </div>
    </div>
  );
}
