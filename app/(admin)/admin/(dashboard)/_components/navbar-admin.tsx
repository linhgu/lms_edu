import { NavbarRoutes } from '@/components/navbar-routes';
import { MobileSidebarAdmin } from './mobile-sidebar-admin';

export const NavbarAdminPage = () => {
    return (
        <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
            <MobileSidebarAdmin />
            <NavbarRoutes />
        </div>
    );
};
