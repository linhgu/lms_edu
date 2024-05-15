import { db } from '@/lib/db';

interface getTotalPurchaseProps {
  id: string;
  username?: string;
}
export const getTotalPurchase = async ({ id, username }: getTotalPurchaseProps) => {
  try {
    const totalPurchase = await db.purchase.count({
      where: {
        courseId: id,
      },
    });
    const detailPurchaserList = await db.purchase.findMany({
      where: {
        courseId: id,
        profile: {
          username: {
            contains: username,
          },
        },
      },
      select: {
        profile: true,
        course: {
          include: {
            chapters: true,
          },
        },
      },
    });
    const totalPurchaseAll = await db.purchase.count({});

    return {
      totalPurchase,
      totalPurchaseAll,
      detailPurchaserList,
    };
  } catch (error) {
    console.log('[GET_PURCHASE_COURSE]', error);
    return {};
  }
};
