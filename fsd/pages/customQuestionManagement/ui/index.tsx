import CustomQuestionManager from "@/fsd/widgets/customQuestionManager/ui";

export default function CustomQuestionManagementPage() {
  return (
    <div className="p-10 flex flex-col items-center md:px-20 lg:px-36 xl:px-48">
      <div className="w-full max-w-6xl">
        <CustomQuestionManager />
      </div>
    </div>
  );
}
