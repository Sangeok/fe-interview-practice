import Button from "@/fsd/shared/ui/atoms/button/ui/Button";
import { Pen, X } from "lucide-react";

interface ButtonMessageProps {
  onNext?: () => void;
  onEnd?: () => void;
  onAddReview?: () => void;
  showNext?: boolean;
}

export default function ButtonMessage({ onNext, onEnd, onAddReview, showNext = true }: ButtonMessageProps) {
  return (
    <div className="flex items-start gap-3 justify-center animate-fade-up-1">
      {showNext && (
        <Button size="sm" variant="light" className="flex items-center gap-2" onClick={onNext}>
          <Pen size={14} />
          Next Question
        </Button>
      )}
      <Button size="sm" variant="light" className="flex items-center gap-2" onClick={onAddReview}>
        Add Review
      </Button>
      <Button size="sm" variant="light" className="flex items-center gap-2" onClick={onEnd}>
        <X size={14} />
        End Interview
      </Button>
    </div>
  );
}
