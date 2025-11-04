import Button from "@/fsd/shared/ui/atoms/button/ui/Button";

interface HeaderButtonProps {
  handleGoFirst: () => void;
  handleAddToReview: () => void;
}

export default function HeaderButton({ handleGoFirst, handleAddToReview }: HeaderButtonProps) {
  return (
    <div className="flex items-center gap-4">
      <Button variant="light" size="sm" onClick={handleGoFirst}>
        처음으로 돌아가기
      </Button>
      <Button variant="light" size="sm" onClick={handleAddToReview}>
        복습 문제에 추가하기
      </Button>
    </div>
  );
}
