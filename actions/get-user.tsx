import { db } from '@/lib/db';
import { Profile, Purchase, Course, Category } from '@prisma/client';

type CourseProps = Course & {
  category: Category;
};

type TeacherWithCourse = Profile & {
  courses: CourseProps[];
};
type User = {
  users: Profile[];
  userPurchase: Purchase[];
  ListTeacher: TeacherWithCourse[];
};

export const getUser = async ({ username }: { username: string }): Promise<User> => {
  try {
    const users = await db.profile.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    const userPurchase = await db.purchase.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    const ListTeacher = await db.profile.findMany({
      where: {
        username: {
          contains: username,
        },
        courses: {
          some: {},
        },
      },
      include: {
        courses: {
          include: {
            category: true,
          },
        },
      },
    });

    return { users, userPurchase, ListTeacher: ListTeacher as TeacherWithCourse[] };
  } catch (error) {
    console.log('Error: ', error);
    return { users: [], userPurchase: [], ListTeacher: [] };
  }
};
