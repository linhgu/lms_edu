'use client';

import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { useConfettiStore } from '@/hooks/use-confetti-store';
import { useStore } from '@/hooks/use-store';
import { useModal } from '@/hooks/use-modal-store';

interface CourseProgressButtonProps {
  chapterId: string;
  courseId: string;
  isCompleted?: boolean;
  profileId?: string;
  nextChapterId?: string;
  isQuestions?: boolean;
  isAllAnswersCorrect?: boolean | 'undefined';
}

export const CourseProgressButton = ({
  profileId,
  isAllAnswersCorrect,
  chapterId,
  courseId,
  isCompleted,
  nextChapterId,
  isQuestions,
}: CourseProgressButtonProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);
  const { progressVideo } = useStore();
  const { onOpen } = useModal();

  const onClick = async () => {
    if (isQuestions) {
      if (isCompleted) {
        await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
          isCompleted: !isCompleted,
        });
        router.refresh();
      } else {
        onOpen('checkAnswer', {
          chapterId,
          profileId,
          courseId,
          isCompleted,
          nextChapterId,
          isQuestions,
          isAllAnswersCorrect: isAllAnswersCorrect as boolean,
        });
      }
    } else if (!isQuestions) {
      try {
        setIsLoading(true);

        await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
          isCompleted: !isCompleted,
        });
        if (!isCompleted && nextChapterId) {
          await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/lock`, {
            nextChapterId: nextChapterId,
            profileId: profileId,
          });
        }
        if (!isCompleted && !nextChapterId && !isQuestions) {
          confetti.onOpen();
        } else if (!isCompleted && !nextChapterId && isQuestions) {
          router.push(`/courses/${courseId}/chapters/${chapterId}`);
        }
        if (!isCompleted && !isQuestions && nextChapterId) {
          router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
        }
        if (!isCompleted && isQuestions && nextChapterId) {
          router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
        }

        toast.success('Đã cập nhật tiến độ');
        router.refresh();
      } catch {
        toast.error('Có lỗi đã xảy ra');
      } finally {
        setIsLoading(false);
      }
    }
  };
  const Icon = isCompleted ? XCircle : CheckCircle;
  // Xử lý việc xem video đến 80% thì mới được nhấn nút hoàn thành
  let disabled = true;
  if (progressVideo >= 80) {
    disabled = false;
  }

  return (
    <>
      {isQuestions ? (
        <Button
          disabled={isLoading}
          onClick={onClick}
          type="button"
          variant={isCompleted ? 'outline' : 'success'}
          className="w-full md:w-auto"
        >
          {isCompleted ? 'Đánh dấu chưa hoàn thành' : 'Đánh dấu là hoàn thành'}
          <Icon className="h-4 w-4 ml-2" />
        </Button>
      ) : (
        <Button
          onClick={onClick}
          disabled={isLoading || disabled}
          type="button"
          variant={isCompleted ? 'outline' : 'success'}
          className="w-full md:w-auto"
        >
          {isCompleted ? 'Chưa hoàn thành' : 'Đánh dấu là hoàn thành'}
          <Icon className="h-4 w-4 ml-2" />
        </Button>
      )}
    </>
  );
};
