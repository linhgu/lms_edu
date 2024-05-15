'use client';

import { BarChart, Compass, HelpCircle, Layout, List, Sheet, Users } from 'lucide-react';

import { SidebarItem } from './sidebar-item';
import { usePathname } from 'next/navigation';

const guestRoutes = [
  {
    icon: Layout,
    label: 'Trang chủ',
    href: '/home',
  },
  {
    icon: Compass,
    label: 'Tìm kiếm khóa học',
    href: '/search',
  },
  {
    icon: Users,
    label: 'Tìm kiếm giáo viên',
    href: '/contact',
  },
  {
    icon: HelpCircle,
    label: 'Cộng đồng',
    href: '/community',
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: 'Khóa học',
    href: '/teacher/courses',
  },
  {
    icon: BarChart,
    label: 'Phân tích',
    href: '/teacher/analytics',
  },
  {
    icon: Sheet,
    label: 'Thống kê khóa học',
    href: '/teacher/statistics',
  },
];

export const SidebarRoutes = () => {
  const pathname = usePathname();
  const isTeacherPage = pathname?.includes('/teacher');
  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem key={route.href} icon={route.icon} label={route.label} href={route.href} />
      ))}
    </div>
  );
};
