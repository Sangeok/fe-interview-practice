import { create } from "zustand";
import { UserData } from "./types";
import { indexedDBService } from "@/fsd/shared/lib/indexedDB";
import { SubjectiveQuestion } from "@/fsd/widgets/interviewOption/ui/subjectiveInterview/model/type";
import { MultipleChoiceQuestion } from "@/fsd/widgets/interviewOption/ui/multipleChoiceInterview/model/type";
import { CustomQuestionType } from "@/fsd/shared/model/type";

export const initialUserData: UserData = {
  inCorrectSubQuestion: [],
  inCorrectMultipleChoiceQuestion: [],
  inCorrectCustomQuestion: [],
};

interface UserStore {
  user: UserData;
  setUser: (user: UserData) => void;

  setInCorrectSubQuestion: (inCorrectSubQuestion: SubjectiveQuestion[]) => void;
  setInCorrectMultipleChoiceQuestion: (inCorrectMultipleChoiceQuestion: MultipleChoiceQuestion[]) => void;

  addInCorrectSubQuestion: (question: SubjectiveQuestion) => void;
  removeInCorrectSubQuestion: (questionId: string | number) => void;

  addInCorrectMultipleChoiceQuestion: (question: MultipleChoiceQuestion) => void;
  removeInCorrectMultipleChoiceQuestion: (questionId: number) => void;

  addInCorrectCustomQuestion: (data: CustomQuestionType) => void;
  removeInCorrectCustomQuestion: (customQuestionId: string) => void;

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

  addInCorrectSubQuestion: (question: SubjectiveQuestion) =>
    set((state) => {
      const exists = state.user.inCorrectSubQuestion.some((q) => q.id === question.id);
      if (exists) return state;
      return {
        user: { ...state.user, inCorrectSubQuestion: [...state.user.inCorrectSubQuestion, question] },
      };
    }),
  removeInCorrectSubQuestion: (questionId: string | number) =>
    set((state) => ({
      user: {
        ...state.user,
        inCorrectSubQuestion: state.user.inCorrectSubQuestion.filter((q) => q.id !== questionId),
      },
    })),

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

  addInCorrectCustomQuestion: (question: CustomQuestionType) =>
    set((state) => {
      const exists = state.user.inCorrectCustomQuestion.some((item) => item.id === question.id);
      if (exists) return state;
      return {
        user: { ...state.user, inCorrectCustomQuestion: [...state.user.inCorrectCustomQuestion, question] },
      };
    }),

  removeInCorrectCustomQuestion: (customQuestionId: string) =>
    set((state) => ({
      user: {
        ...state.user,
        inCorrectCustomQuestion: state.user.inCorrectCustomQuestion.filter((item) => item.id !== customQuestionId),
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
