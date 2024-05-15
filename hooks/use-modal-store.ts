
import { Course, Question } from "@prisma/client";
import { create } from "zustand";

export type ModalType =
  | "openUserProfile"
  | "openUserCreate"
  | "openEditCourse"
  |"deleteComment"
  |"openQuestionModal"
  |"openEditQuestionModal"
  |"checkAnswer"
;

interface ModalData {
  id?: string;
  title?: string;
  name?: string;
  role?: string;
  email?: string;
  description?: string;
  isPublished?: boolean;
  price?: number;
  apiUrl?: string;
  courseId?:string,
  chapterId?:string,
  profileId?:string,
  initialData?: Question[],
  question?:string,
  option_a?:string,
  option_b?:string,
  option_c?:string,
  option_d?:string,
  answer?:string,
  query?: Record<string, any>;
  isCompleted?:boolean;
  nextChapterId?:string;
  isQuestions?:boolean;
  isAllAnswersCorrect?:boolean;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data
   }),
  onClose: () => set({ type: null, isOpen: false }),
}));
