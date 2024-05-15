import { Category, Chapter, Course, Purchase } from "@prisma/client";

import { getProgress } from "@/actions/get-progress";
import { db } from "@/lib/db";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: Chapter[];
  progress: number | null;
};

type GetCourses = {
  profileId: string;
  title?: string;
  categoryId?: string;
};

export const getCoursesPurchase = async ({
  profileId,
  title,
  categoryId
}: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
  try {
    const courses = await db.course.findMany({
      where: {
        profileId,
        isPublished: true,
        title: {
          contains: title,
        },
        categoryId,
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
        },
        purchases: {
          where: {
            profileId,
          }
        }
      },
      orderBy: {
        createdAt: "desc",
      }
    });
   

    const coursesWithProgress: CourseWithProgressWithCategory[] = await Promise.all(
      courses.map(async course => {
        if (course.purchases.length === 0) {
          return {
            ...course,
            progress: null,
          }
        }

        const progressPercentage = await getProgress(profileId, course.id);

        return {
          ...course,
          progress: progressPercentage,
        };
      })
    );

    return courses.map(course => ({
      ...course,
      progress: null,
    }));
  } catch (error) {
    console.log("[GET_COURSES]", error);
    return [];
  }
}