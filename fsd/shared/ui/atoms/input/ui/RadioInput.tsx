import { RadioInputVariants } from "../lib/RadioInputVariants";
import { useId } from "react";

interface RadioInputProps extends React.ComponentProps<"input"> {
  variant?: "dark" | "light";
  label?: string;
  "data-testid"?: string;
}

const RadioInput = ({ className, variant = "dark", label, id, "data-testid": testId, ...props }: RadioInputProps) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className="flex items-center gap-2" data-testid={testId}>
      <input type="radio" id={inputId} className={RadioInputVariants({ variant, className })} {...props} />
      {label && (
        <label htmlFor={inputId} className="text-zinc-300 cursor-pointer">
          {label}
        </label>
      )}
    </div>
  );
};

export default RadioInput;
