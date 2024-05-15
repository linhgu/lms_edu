'use client';

import { useEffect, useState } from 'react';

import { useStore } from '@/hooks/use-store';
import ComposedChartPage from './composed-chart';
import CourseChart from './course-chart';

const StatisticCoursePage = () => {
  const { categories, coursePurchase } = useStore();
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, [client]);
  if (!client) {
    return null;
  }

  return (
    <div className="flex flex-col space-y-4">
      <span className="text-lg font-medium">Thống kê theo danh mục:</span>
      <ComposedChartPage categories={categories} />
      <span className="text-lg font-medium mb-4">Thống kê theo khóa học:</span>
      <CourseChart coursePurchase={coursePurchase} />
    </div>
  );
};
export default StatisticCoursePage;
