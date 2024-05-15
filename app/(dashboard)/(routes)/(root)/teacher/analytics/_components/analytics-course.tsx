import { getTotalPurchase } from '@/actions/get-total-purchase';
import { getUser } from '@/actions/get-user';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { UserAvatar } from '@/components/user-avatar';
import { db } from '@/lib/db';
import { cn } from '@/lib/utils';
import { Course } from '@prisma/client';
interface AnalyticsCoursesProps {
  courses: Course[];
  searchParams: {
    username: string;
  };
}

export const AnalyticsCourses = async ({ courses, searchParams }: AnalyticsCoursesProps) => {
  console.log('searchParams', searchParams);

  let index = 0;
  return (
    <>
      <div className="p-6 space-y-4">
        {courses.map(async (course) => {
          const { totalPurchase, detailPurchaserList } = await getTotalPurchase({ id: course.id, ...searchParams });

          return (
            <Accordion key={course.id} type="multiple" className="w-full" defaultValue={[`item-${course.id}`]}>
              <AccordionItem value={`item-${course.id}`} className="group">
                <AccordionTrigger>
                  <div className="flex gap-x-4 justify-between items-center w-full">
                    <div className="flex items-center space-x-2 group-hover:text-sky-500 group-hover:underline">
                      <p>Tên khóa học:</p>
                      <p className="flex gap-x-4 items-center ">{course.title}</p>
                    </div>
                    <p className="font-normal text-sm">{totalPurchase} Học viên</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  {detailPurchaserList?.map(async (item: any) => {
                    index++;

                    const progressList = await db.userProgress.findMany({
                      where: {
                        profileId: item.profile.id,
                      },
                      orderBy: {
                        createdAt: 'asc',
                      },
                      include: {
                        chapter: true,
                      },
                    });
                    // lọc ra các chapter của tường chương
                    const newListAnalytics = progressList.filter((item) => item.chapter.courseId === course.id);
                    /*       console.log('newListAnalytics', newListAnalytics); */

                    return (
                      <Accordion
                        type="multiple"
                        className="pl-8"
                        key={item.profile.id}
                        defaultValue={[`${item.profile.id}${index}`]}
                      >
                        <AccordionItem value={`${item.profile.id}${index}`}>
                          <AccordionTrigger>
                            <div className="flex gap-x-4 items-center w-full space-x-2">
                              <UserAvatar src={item.profile.imageUrl} />
                              <p className="flex gap-x-4 items-center text-sky-600">{item.profile.username}</p>
                            </div>
                          </AccordionTrigger>
                          <Separator />
                          <AccordionContent className="space-y-4">
                            <div>
                              <p className="text-sm font-medium py-4">Tiến độ bài học</p>
                              <div className="space-y-4">
                                {newListAnalytics.map((item) => {
                                  return (
                                    <div key={item.id} className="flex justify-between pl-4">
                                      <p className="text-sm font-medium">{item.chapter.title}</p>
                                      <span>
                                        <Badge
                                          className={cn('bg-slate-500 min-w-32', item.isCompleted && 'bg-sky-700')}
                                        >
                                          {item.isCompleted ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
                                        </Badge>
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    );
                  })}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          );
        })}
      </div>
    </>
  );
};
