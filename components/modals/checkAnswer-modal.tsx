'use client';

import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useModal } from '@/hooks/use-modal-store';
import { Button } from '@/components/ui/button';
import { useConfettiStore } from '@/hooks/use-confetti-store';

export const CheckAnswerModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const confetti = useConfettiStore();

  const isModalOpen = isOpen && type === 'checkAnswer';
  const { courseId, chapterId, profileId, isCompleted, nextChapterId, isQuestions, isAllAnswersCorrect } = data;

  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    if (isAllAnswersCorrect) {
      try {
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
        if (!isCompleted && nextChapterId) {
          router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
        }
        toast.success('Chúc mừng bạn đã qua bài kiểm tra.Bạn sẽ được chuyển đến bài học tiếp theo', {
          position: 'top-center',
          duration: 3000,
        });
        router.refresh();
        onClose();
        setIsLoading(true);
      } catch {
        toast.error('Có lỗi đã xảy ra');
      } finally {
        setIsLoading(false);
      }
    } else if (!isAllAnswersCorrect && isCompleted) {
      try {
        setIsLoading(true);
        await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
          isCompleted: !isCompleted,
        });

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
    } else {
      toast.error('Bạn chưa hoàn thành bài trắc nghiệm.Bạn sẽ được chuyển đến trang bài học', {
        position: 'top-center',
        duration: 3000,
      });
      router.refresh();
      onClose();
      router.push(`/courses/${courseId}/chapters/${chapterId}`);
    }
  };
  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className="bg-white text-black p-0 overflow-hidden">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">Kiểm tra</DialogTitle>
            <DialogDescription className="text-center text-zinc-500">
              Nhấn tiếp tục để kiểm tra kết quả của bạn
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="bg-gray-100 px-6 py-4">
            <div className="flex items-center justify-between w-full">
              <Button disabled={isLoading} onClick={onClose} variant="ghost">
                Hủy
              </Button>
              <Button disabled={isLoading} variant="primary" onClick={onClick}>
                Kiểm tra
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
