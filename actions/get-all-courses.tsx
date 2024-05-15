import { db } from '@/lib/db';
import { Course } from '@prisma/client';
type CourseProps = {
  allCourses: Course[];
  coursePublished: Course[];
};

export const getAllCourses = async (): Promise<CourseProps> => {
  try {
    const allCourses = await db.course.findMany({
      orderBy: {
        title: 'desc',
      },
    });
    const coursePublished = allCourses.filter((course) => course.isPublished);
    return { coursePublished, allCourses };
  } catch (error) {
    console.log('Error: ', error);
    return {} as CourseProps;
  }
};
