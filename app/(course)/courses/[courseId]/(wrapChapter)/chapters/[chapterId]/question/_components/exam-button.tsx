'use client';
import Link from 'next/link';
import { MoveRight } from 'lucide-react';

import { useStore } from '@/hooks/use-store';
import { Button } from '@/components/ui/button';

interface ExamButtonProps {
  chapterId: string;
  courseId: string;
  isCompleted: boolean;
}

export const ExamButton = ({ chapterId, courseId, isCompleted }: ExamButtonProps) => {
  const { progressVideo } = useStore();
  // Xử lý việc xem video đến 80% thì mới được nhấn nút làm bài tập nếu có bài tập
  let disabled = true;
  if (progressVideo >= 80) {
    disabled = false;
  } else if (isCompleted) {
    disabled = false;
  }
  return (
    <Button variant={'success'} disabled={disabled}>
      <Link href={`/courses/${courseId}/chapters/${chapterId}/question`}>
        <span className=" flex items-center justify-center hover:scale-110 transition-all h-full">
          Bài tập <MoveRight className=" h-6 w-6 ml-2" />
        </span>
      </Link>
    </Button>
  );
};
