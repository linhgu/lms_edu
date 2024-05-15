/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Loader2, Lock } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useConfettiStore } from '@/hooks/use-confetti-store';
import ReactPlayer from 'react-player';
import { useStore } from '@/hooks/use-store';

interface VideoPlayerProps {
  videoUrl?: string;
  courseId?: string;
  chapterId?: string;
  nextChapterId?: string;
  isLocked?: boolean;
  completeOnEnd?: boolean;
  onVideoProgressUpdate?: (progress: number) => void;
}

export const VideoPlayer = ({
  videoUrl,
  courseId,
  chapterId,
  nextChapterId,
  isLocked,
  completeOnEnd,
}: VideoPlayerProps) => {
  const [videoProgress, setVideoProgress] = useState(0);
  const { progressVideo, setProgressVideo } = useStore();
  const [isReady, setIsReady] = useState(false);
  const [client, setClient] = useState(false);
  const router = useRouter();
  const confetti = useConfettiStore();
  const videoRef = useRef<ReactPlayer>(null);

  const onEnd = async () => {
    try {
      if (completeOnEnd) {
        await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
          isCompleted: true,
        });

        if (!nextChapterId) {
          confetti.onOpen();
        }

        toast.success('Progress updated');
        router.refresh();

        if (nextChapterId) {
          router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
        }
      }
    } catch {
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    setClient(true);
  }, []);

  useEffect(() => {
    setProgressVideo(videoProgress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoProgress]);
  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm">This chapter is locked</p>
        </div>
      )}
      {!isLocked && client && (
        <ReactPlayer
          onProgress={({ played }) => setVideoProgress(Number(played.toFixed(2)) * 100)}
          width={'100%'}
          height={'100%'}
          ref={videoRef}
          url={videoUrl}
          /* className={cn(!isReady && 'hidden')} */
          controls
          onReady={() => setIsReady(true)}
          onEnded={onEnd}
        />
      )}
    </div>
  );
};
