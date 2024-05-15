import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import Loading from '@/app/loading';
import { currentProfile } from '@/lib/current-profile';
import { NavbarRoutes } from '@/components/navbar-routes';
import { Separator } from '@/components/ui/separator';

const CourseLayout = async ({ children, params }: { children: React.ReactNode; params: { courseId: string } }) => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect('/');
  }

  return (
    <div className="h-full">
      <div className="h-[80px] fixed inset-y-0 w-full z-50 text-right px-4">
        <div className="flex justify-end items-center h-full ">
          <NavbarRoutes />
        </div>
        <Separator />
      </div>
      <main className=" h-full pt-[80px]">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </main>
    </div>
  );
};

export default CourseLayout;
