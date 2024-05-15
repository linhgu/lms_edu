import { db } from '@/lib/db';
import { Course, Profile, Purchase } from '@prisma/client';

type PurchaseWithCourse = Purchase & {
  course: Course;
};
type UserWithCourse = Profile & {
  course: Course;
};

const groupByCourse = (purchases: PurchaseWithCourse[]) => {
  const grouped: { [courseTitle: string]: number } = {};

  purchases.forEach((purchase) => {
    const courseTitle = purchase.course.title;
    if (!grouped[courseTitle]) {
      grouped[courseTitle] = 0;
    }
    grouped[courseTitle] += purchase.course.price!;
  });

  return grouped;
};

export const getAnalyticsAll = async () => {
  try {
    //lấy ra tổng số người khóa học của từng người dùng
    const listUser: any = await db.profile.findMany({
      orderBy: {
        username: 'asc',
      },
      include: { courses: true },
    });
    //lấy ra tổng số khóa học học từng username
    const dataCourses = listUser.reduce((acc: Record<string, number>, profile: any) => {
      const username = profile.username!;
      acc[username] = (acc[username] || 0) + profile.courses.length;
      return acc;
    }, {});
    //chuyển dataCourses thành 1 mảng theo [{name,total}]
    const dataUsers = Object.entries(dataCourses).map(([name, total]) => ({
      name: name,
      total: total as number,
    }));

    const totalCourses = dataUsers.reduce((acc, curr) => acc + curr.total, 0);
    const totalUsers = listUser.length;
    //lấy ra các khóa học đã mua-----------------------------
    const purchases = await db.purchase.findMany({
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        course: true,
      },
    });

    const groupedEarnings = groupByCourse(purchases);
    const data = Object.entries(groupedEarnings).map(([courseTitle, total]) => ({
      name: courseTitle,
      total: total,
    }));
    //tính tổng tiền các khóa học
    const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
    const totalSales = purchases.length;

    return {
      dataUsers,
      totalCourses,
      totalUsers,
      data,
      totalRevenue,
      totalSales,
    };
  } catch (error) {
    console.log('[GET_ANALYTICS]', error);
    return {
      data: [],
      totalRevenue: 0,
      totalSales: 0,
      dataUsers: [],
      totalCourses: 0,
      totalUsers: 0,
    };
  }
};
