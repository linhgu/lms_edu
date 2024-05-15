import { redirect } from 'next/navigation';
import { CheckCircle, Clock } from 'lucide-react';

import { getDashboardCourses } from '@/actions/get-dashboard-courses';
import { CoursesList } from '@/components/courses-list';

import { currentProfile } from '@/lib/current-profile';
import { InfoCard } from '@/components/infor-card';

export default async function Dashboard() {
  const profile = await currentProfile();

  if (!profile) {
    return redirect('/');
  }

  const { completedCourses, coursesInProgress } = await getDashboardCourses(profile.id);

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard icon={Clock} label="Đang học" numberOfItems={coursesInProgress.length} sublabel="khóa học" />
        <InfoCard
          icon={CheckCircle}
          label="Đã hoàn thành"
          numberOfItems={completedCourses.length}
          variant="success"
          sublabel="khóa học"
        />
      </div>
      <CoursesList items={[...coursesInProgress, ...completedCourses]} />
    </div>
  );
}
