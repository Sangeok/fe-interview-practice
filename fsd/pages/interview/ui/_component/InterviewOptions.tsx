import { INTERVIEW_OPTIONS } from "../../constants";
import RadioInput from "@/fsd/shared/ui/atoms/input/ui/RadioInput";
import { InterviewOptionsValue } from "../../model/type";
import Button from "@/fsd/shared/ui/atoms/button/ui/Button";

interface InterviewOptionsProps {
  selectedOptions: InterviewOptionsValue | "";
  setSelectedOptions: (option: InterviewOptionsValue) => void;
  onClose: () => void;
}

export default function InterviewOptions({
  selectedOptions,
  setSelectedOptions,
  onClose,
}: InterviewOptionsProps) {
  const handleSelectInterviewOption = () => {
    if (selectedOptions === "") {
      alert("Please select an option");
      return;
    }

    onClose();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOptions(event.target.value as InterviewOptionsValue);
  };

  return (
    <div className="flex flex-col gap-4">
      {INTERVIEW_OPTIONS.map((option) => (
        <RadioInput
          key={option.id}
          label={option.label}
          name="interview-options"
          value={option.value}
          checked={selectedOptions === option.value}
          onChange={handleChange}
        />
      ))}

      <div className="flex justify-end mt-4">
        <Button variant="light" size="sm" onClick={handleSelectInterviewOption}>
          Select
        </Button>
      </div>
    </div>
  );
}
