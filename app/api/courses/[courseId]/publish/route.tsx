import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { currentProfile } from '@/lib/current-profile';

export async function PATCH(req: Request, { params }: { params: { courseId: string } }) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        profileId: profile.id,
      },
      include: {
        chapters: true,
      },
    });

    if (!course) {
      return new NextResponse('Not found', { status: 404 });
    }
    // Kiểm tra xem có chương nào được publish hay không
    const hasPublishedChapter = course.chapters.some((chapter) => chapter.isPublished);

    if (!course.title || !course.description || !course.imageUrl || !course.categoryId || !hasPublishedChapter) {
      return new NextResponse('Missing required fields', { status: 401 });
    }

    const publishedCourse = await db.course.update({
      where: {
        id: params.courseId,
        profileId: profile.id,
      },
      data: {
        isPublished: true,
      },
    });

    return NextResponse.json(publishedCourse);
  } catch (error) {
    console.log('[COURSE_ID_PUBLISH]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
