import { SidebarRoutesAdmin } from './sidebar-routes-admin';

export const SidebarAdmin = () => {
    return (
        <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
            <div className="p-6">
                <h1 className=" text-2xl text-center font-black text-sky-700">Admin Page</h1>
            </div>
            <div className="flex flex-col w-full">
                <SidebarRoutesAdmin />
            </div>
        </div>
    );
};
