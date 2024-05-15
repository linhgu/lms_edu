'use client';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ButtonChapterProps {
  courseId: string;
  chapterId: string;
}

export const ButtonChapter = ({ courseId, chapterId }: ButtonChapterProps) => {
  const [loading, setIsLoading] = useState(false);

  const router = useRouter();
  const handleClick = () => {
    try {
      router.push(`/courses/${courseId}/chapters/${chapterId}`);
      setIsLoading(true);
      console.log('loading', loading);
    } catch (error) {
      toast.error('Không thể chuyển đến trang bài học');
      setIsLoading(false);
    }
  };
  return (
    <Button className="w-full gap-x-4" variant={'primary'} onClick={handleClick} disabled={loading}>
      <Loader2 className={cn('h-6 w-6 animate-spin text-white invisible', loading && 'visible')} />
      Chuyển đến trang bài học
    </Button>
  );
};
