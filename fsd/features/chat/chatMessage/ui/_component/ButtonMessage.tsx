import Button from "@/fsd/shared/ui/atoms/button/ui/Button";
import { Pen, X } from "lucide-react";

interface ButtonMessageProps {
  onNext?: () => void;
  onEnd?: () => void;
  showNext?: boolean;
}

export default function ButtonMessage({ 
  onNext, 
  onEnd, 
  showNext = true 
}: ButtonMessageProps) {
  return (
    <div className="flex items-start gap-3 justify-center animate-fade-up-1">
      {showNext && (
        <Button 
          size="sm" 
          variant="light" 
          className="flex items-center gap-2"
          onClick={onNext}
        >
          <Pen size={14} />
          Next
        </Button>
      )}
      <Button 
        size="sm" 
        variant="light" 
        className="flex items-center gap-2"
        onClick={onEnd}
      >
        <X size={14} />
        End
      </Button>
    </div>
  );
}
