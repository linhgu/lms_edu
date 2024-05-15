import { redirect } from 'next/navigation';

import { db } from '@/lib/db';
import { currentProfile } from '@/lib/current-profile';

import { ColumnsCoursesPage } from './_components/columns-courses';
import { DataTableCourses } from './_components/data-table-courses';

const CoursesPage = async ({ params }: { params: { userId: string } }) => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect('/');
  }
  const { userId } = params;

  const user = await db.profile.findFirst({
    where: {
      userId: userId,
    },
  });

  const courses = await db.course.findMany({
    where: {
      profileId: user?.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="p-6">
      <DataTableCourses columns={ColumnsCoursesPage} data={courses} />
    </div>
  );
};

export default CoursesPage;
