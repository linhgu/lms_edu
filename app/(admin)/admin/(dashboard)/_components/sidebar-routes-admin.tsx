'use client';

import { Compass, Layout, PieChart } from 'lucide-react';

import { SidebarItemAdmin } from './sidebar-item-admin';

const AdminRoutes = [
  {
    icon: Layout,
    label: 'Trang chủ',
    href: '/admin',
  },
  {
    icon: Compass,
    label: 'Phân tích',
    href: '/admin/analytics',
  },
  {
    icon: PieChart,
    label: 'Thống kê',
    href: '/admin/statistic',
  },
];

export const SidebarRoutesAdmin = () => {
  return (
    <div className="flex flex-col w-full">
      {AdminRoutes.map((route) => (
        <SidebarItemAdmin key={route.href} icon={route.icon} label={route.label} href={route.href} />
      ))}
    </div>
  );
};
