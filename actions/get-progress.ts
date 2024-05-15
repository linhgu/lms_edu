import { db } from "@/lib/db";

export const getProgress = async (
  profileId: string,
  courseId: string,
): Promise<number> => {
  try {
    //lấy các chương của khóa hiện tại đã published chỉ lấy id=> tối ưu hóa truy vấn 
    const publishedChapters = await db.chapter.findMany({
      where: {
        courseId: courseId,
        isPublished: true,
      },
      select: {
        id: true,
      }
    });
    //map qua các chương đã published
    const publishedChapterIds = publishedChapters.map((chapter: { id: any; }) => chapter.id);
    //đếm số chương đã hoàn thành với người dùng hiện tại với điều kiện đã publishedChapterIds
    const validCompletedChapters = await db.userProgress.count({
      where: {
        profileId: profileId,
        chapterId: {
          in: publishedChapterIds,
        },
        isCompleted: true,
      }
    });
    // tính tiến độ hòa thành khóa học :các chương đã hoàn thành / các chương đã publish
    const progressPercentage = (validCompletedChapters / publishedChapterIds.length) * 100;

    return progressPercentage;
  } catch (error) {
    console.log("[GET_PROGRESS]", error);
    return 0;//ko thể tính tiến độ 
  }
}