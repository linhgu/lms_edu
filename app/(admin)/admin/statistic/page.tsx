import { redirect } from 'next/navigation';

import { currentProfile } from '@/lib/current-profile';

import { DatePickerWithRange } from './_components/data-picker';
import StatisticCoursePage from './_components/statistic-course-page';

const StatisticPage = async () => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect('/');
  }

  return (
    <div className="p-6 space-y-4">
      <span className="text-2xl font-bold">Thống kê:</span>
      <div className="flex items-center space-x-2">
        <span className="text-xl font-medium">Tìm kiếm: </span>
        <DatePickerWithRange />
      </div>

      <StatisticCoursePage />
    </div>
  );
};

export default StatisticPage;
