import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';
import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';

const CoursesPage = async () => {
    const profile = await currentProfile();
    if (!profile) {
        return redirect('/');
    }

    const courses = await db.course.findMany({
        where: {
            profileId: profile.id,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
    return (
        <div className="p-6">
            <DataTable columns={columns} data={courses} />
        </div>
    );
};

export default CoursesPage;
