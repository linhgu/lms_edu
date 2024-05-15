import { currentProfile } from '@/lib/current-profile';
import { AnalyticsCourses } from '../analytics/_components/analytics-course';
import { redirect } from 'next/navigation';
import { getCoursesPurchase } from '@/actions/get-courses-purchase';

interface courseStatisticsPageProps {
  searchParams: {
    username: string;
  };
}

const courseStatisticsPage = async ({ searchParams }: courseStatisticsPageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect('/');
  }
  const courses = await getCoursesPurchase({
    profileId: profile?.id,
  });

  return (
    <div className="p-6">
      <h1 className="font-bold text-2xl pb-6">Thống kê khóa học:</h1>
      <AnalyticsCourses courses={courses} searchParams={searchParams} />
    </div>
  );
};
export default courseStatisticsPage;
