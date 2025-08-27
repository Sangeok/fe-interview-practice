import Button from "@/fsd/shared/ui/atoms/button/ui/Button";
import { Pen, X } from "lucide-react";

export default function ButtonMessage() {
  return (
    <div className="flex items-start gap-3 justify-center animate-fade-up-1">
      <Button size="sm" variant="light" className="flex items-center gap-2">
        <Pen size={14} />
        Next
      </Button>
      <Button size="sm" variant="light" className="flex items-center gap-2">
        <X size={14} />
        End
      </Button>
    </div>
  );
}
