import { Chapter, Course, UserProgress, LockChapter } from '@prisma/client';
import { redirect } from 'next/navigation';

import { db } from '@/lib/db';
import { CourseSidebarItem } from './course-sidebar-item';
import { CourseProgress } from '@/components/course-progress';
import { currentProfile } from '@/lib/current-profile';
import { getChapter } from '@/actions/get-chapters';

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      LockChapter: LockChapter[];
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

export const CourseSidebar = async ({ course, progressCount }: CourseSidebarProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect('/');
  }

  const purchase = await db.purchase.findUnique({
    where: {
      profileId_courseId: {
        profileId: profile.id,
        courseId: course.id,
      },
    },
  });
  console.log('renderDone');
  const chaptersWithDetails = await Promise.all(
    course.chapters.map(async (chapter) => {
      const { nextChapter, previousChapter, lockChapter } = await getChapter({
        chapterId: chapter.id,
        courseId: course.id,
        profileId: profile.id,
      });
      return { ...chapter, nextChapter, previousChapter, lockChapter };
    }),
  );

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm bg-white">
      <div className="p-8 flex flex-col border-b gap-y-4">
        <h1 className="font-semibold">{course.title}</h1>
        <CourseProgress value={progressCount} variant={progressCount == 100 ? 'success' : 'default'} size="default" />
      </div>
      <div className="flex flex-col w-full">
        {chaptersWithDetails.map((chapter) => {
          const { lockChapter } = chapter;
          return (
            <CourseSidebarItem
              lockChapter={lockChapter!}
              position={chapter.position}
              key={chapter.id}
              id={chapter.id}
              label={chapter.title}
              isChapterNowCompleted={!!chapter.userProgress?.[0]?.isCompleted}
              courseId={course.id}
              isLocked={!chapter.isFree && !purchase}
            />
          );
        })}
      </div>
    </div>
  );
};
