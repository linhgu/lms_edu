import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { db } from '@/lib/db';
import Loading from '@/app/loading';
import { getProgress } from '@/actions/get-progress';
import { currentProfile } from '@/lib/current-profile';
import { CourseNavbar } from '../_component/course-navbar';
import { CourseSidebar } from '../_component/course-sidebar';

const CourseLayout = async ({ children, params }: { children: React.ReactNode; params: { courseId: string } }) => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect('/');
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              profileId: profile.id,
            },
          },
          LockChapter: true,
        },
        orderBy: {
          position: 'asc',
        },
      },
    },
  });

  if (!course) {
    return redirect('/');
  }

  const progressCount = await getProgress(profile.id, course.id);

  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
        <CourseNavbar course={course} progressCount={progressCount} />
      </div>
      <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
        <CourseSidebar course={course} progressCount={progressCount} />
      </div>
      <main className="md:pl-80 h-full">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </main>
    </div>
  );
};

export default CourseLayout;
