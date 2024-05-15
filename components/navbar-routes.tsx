'use client';

import Link from 'next/link';
import { LogOut } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { SearchInput } from './search-input';
import { SearchTeacherInput } from './teachers-search-input';

export const NavbarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith('/teacher');
  const isCoursePage = pathname?.includes('/courses');
  const isSearchPage = pathname === '/search';
  const isContactPage = pathname?.includes('/contact');
  const isStatisticsPage = pathname?.includes('teacher/statistics');

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      {(isContactPage || isStatisticsPage) && (
        <div className="hidden md:block">
          <SearchTeacherInput isContactPage={isContactPage!} isStatisticsPage={isStatisticsPage!} />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isCoursePage ? (
          <Link href="/home">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Thoát
            </Button>
          </Link>
        ) : (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              Chế độ giáo viên
            </Button>
          </Link>
        )}
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
};
