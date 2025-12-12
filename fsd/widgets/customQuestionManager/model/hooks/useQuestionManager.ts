import { useState, useEffect } from "react";
import { Technology } from "@/fsd/entities/customQuestion/model/type";
import { useCustomQuestionStore } from "@/fsd/entities/customQuestion/model/useCustomQuestionStore";

export const useQuestionManager = () => {
  const [selectedTechnology, setSelectedTechnology] = useState<Technology>("javascript");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const hydrateFromDB = useCustomQuestionStore((state) => state.hydrateFromDB);

  useEffect(() => {
    hydrateFromDB();
  }, [hydrateFromDB]);

  const handleOpenCreateDialog = () => {
    setCreateDialogOpen(true);
  };

  const handleCloseCreateDialog = () => {
    setCreateDialogOpen(false);
  };

  return {
    selectedTechnology,
    setSelectedTechnology,
    createDialogOpen,
    handleOpenCreateDialog,
    handleCloseCreateDialog,
  };
};
