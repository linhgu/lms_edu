import { redirect } from 'next/navigation';
import { BookOpen, BookOpenCheck, User, UserRoundCheck } from 'lucide-react';

import { getAllCourses } from '@/actions/get-all-courses';
import { getUser } from '@/actions/get-user';
import { currentProfile } from '@/lib/current-profile';
import { getAnalyticsAll } from '@/actions/get-analytics-all';
import { InfoCard } from '@/components/infor-card';

import { DataCard } from './_components/data-card';
import { Chart } from './_components/chart';

const AnalyticsAdminPage = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect('/');
  }

  const { allCourses, coursePublished } = await getAllCourses();
  const { users, userPurchase } = await getUser({ username: '' });
  const { data, totalRevenue, totalSales, dataUsers, totalCourses, totalUsers } = await getAnalyticsAll();

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard icon={BookOpen} label="Tất cả khóa học" numberOfItems={coursePublished.length} sublabel="Khóa học" />
        <InfoCard
          icon={UserRoundCheck}
          label="Tổng số học viên"
          numberOfItems={userPurchase.length}
          sublabel="Học viên"
        />
        <InfoCard
          icon={BookOpenCheck}
          label="Khóa học đã xuất bản"
          numberOfItems={allCourses.length}
          variant="success"
          sublabel="Khóa học"
        />
        <InfoCard icon={User} label="Tổng số người dùng" numberOfItems={users.length} sublabel="Người dùng" />
      </div>
      <div>
        <h1 className="text-xl font-bold mb-4"> Khóa học</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <DataCard label="Tổng doanh thu" value={totalRevenue} shouldFormat />
          <DataCard label="Tổng các khóa học đã bán " value={totalSales} />
        </div>
        <div>
          <Chart data={data} isPrice />
        </div>
      </div>
      <div>
        <h1 className="text-xl font-bold mb-4"> Biểu đồ người dùng</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <DataCard label="Tổng số người dùng" value={totalUsers} />
          <DataCard label="Tổng số các khóa học" value={totalCourses} />
        </div>
        <Chart data={dataUsers} />
      </div>
      <div>
        <h1 className="text-2xl font-bold"> </h1>
      </div>
    </div>
  );
};

export default AnalyticsAdminPage;
