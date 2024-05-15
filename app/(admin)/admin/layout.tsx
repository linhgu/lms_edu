import { Suspense } from 'react';

import Loading from '@/app/loading';
import { SidebarAdmin } from './(dashboard)/_components/sidebar-admin';
import { NavbarAdminPage } from './(dashboard)/_components/navbar-admin';

const AdminPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <NavbarAdminPage />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <SidebarAdmin />
      </div>
      <main className="md:pl-56 pt-[80px] h-full">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </main>
    </div>
  );
};

export default AdminPage;
