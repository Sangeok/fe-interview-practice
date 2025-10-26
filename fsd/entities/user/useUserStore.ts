import { create } from "zustand";
import { UserData } from "./types";
import { indexedDBService } from "@/fsd/shared/lib/indexedDB";
import { SubjectiveQuestion } from "@/fsd/widgets/interviewOption/ui/subjectiveInterview/model/type";
import { MultipleChoiceQuestion } from "@/fsd/widgets/interviewOption/ui/multipleChoiceInterview/model/type";

export const initialUserData: UserData = {
  inCorrectSubQuestion: [],
  inCorrectMultipleChoiceQuestion: [],
};

interface UserStore {
  user: UserData;
  setUser: (user: UserData) => void;

  setInCorrectSubQuestion: (inCorrectSubQuestion: SubjectiveQuestion[]) => void;
  setInCorrectMultipleChoiceQuestion: (inCorrectMultipleChoiceQuestion: MultipleChoiceQuestion[]) => void;
  addInCorrectMultipleChoiceQuestion: (question: MultipleChoiceQuestion) => void;
  removeInCorrectMultipleChoiceQuestion: (questionId: number) => void;

  hydrateUserFromDB: () => Promise<void>;
  persistUserToDB: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: initialUserData,
  setUser: (user: UserData) => set({ user }),
  setInCorrectSubQuestion: (inCorrectSubQuestion: SubjectiveQuestion[]) =>
    set((state) => ({ user: { ...state.user, inCorrectSubQuestion } })),
  setInCorrectMultipleChoiceQuestion: (inCorrectMultipleChoiceQuestion: MultipleChoiceQuestion[]) =>
    set((state) => ({ user: { ...state.user, inCorrectMultipleChoiceQuestion } })),
  addInCorrectMultipleChoiceQuestion: (question: MultipleChoiceQuestion) =>
    set((state) => {
      const exists = state.user.inCorrectMultipleChoiceQuestion.some((q) => q.id === question.id);
      if (exists) return state;
      return {
        user: {
          ...state.user,
          inCorrectMultipleChoiceQuestion: [...state.user.inCorrectMultipleChoiceQuestion, question],
        },
      };
    }),
  removeInCorrectMultipleChoiceQuestion: (questionId: number) =>
    set((state) => ({
      user: {
        ...state.user,
        inCorrectMultipleChoiceQuestion: state.user.inCorrectMultipleChoiceQuestion.filter((q) => q.id !== questionId),
      },
    })),

  hydrateUserFromDB: async () => {
    const data = await indexedDBService.loadUserData();
    if (data) set({ user: data });
  },

  persistUserToDB: async () => {
    const { user } = get();
    await indexedDBService.saveUserData(user);
  },
}));
