import { db } from '@/lib/db';
import { redirect } from 'next/navigation';

import { SearchInput } from '@/components/search-input';
import { CoursesList } from '@/components/courses-list';

import { getCourses } from '@/actions/get-courses';

import { currentProfile } from '@/lib/current-profile';
import { Categories } from '@/components/categories';

interface SearchPageProps {
  searchParams: {
    categoryId: string;
    title: string;
  };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect('/');
  }
  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  const courses = await getCourses({
    profileId: profile?.id,
    ...searchParams,
  });

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6">
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default SearchPage;
