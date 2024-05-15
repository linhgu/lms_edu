import { redirect } from 'next/navigation';
import { CircleDollarSign, LayoutDashboard, ListChecks } from 'lucide-react';

import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { IconBadge } from '@/components/icon-badge';

import { TitleForm } from '../_components/title-form';
import { DescriptionForm } from '../_components/description-form';
import { ImageForm } from '../_components/image-form';
import { CategoryForm } from '../_components/category-form';
import { PriceForm } from '../_components/price-form';
import { AttachmentForm } from '../_components/attachment-form';
import { ChaptersForm } from '../_components/chapters-form';
import { Banner } from '@/components/banner';
import { Actions } from '../_components/actions';
import { currentProfile } from '@/lib/current-profile';

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect('/');
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        orderBy: {
          position: 'asc',
        },
      },
      attachments: {
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });
  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  if (!course) {
    return redirect('/');
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
    course.chapters.some((chapter) => chapter.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;
  const isCompleted = requiredFields.every(Boolean);
  const isPublished = course.isPublished;

  return (
    <>
      {' '}
      {!isPublished && <Banner label="Khóa học này chưa được xuất bản. Nó sẽ không được nhìn thấy bởi các học viên." />}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Thiết lập khóa học</h1>
            <span className="text-sm text-slate-700">Hoàn thành tất cả các trường {completionText}</span>
          </div>
          <Actions disabled={!isCompleted} courseId={params.courseId} isPublished={course.isPublished} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Tùy chỉnh khóa học của bạn</h2>
            </div>
            <TitleForm initialData={course} courseId={course.id} />
            <DescriptionForm initialData={course} courseId={course.id} />
            <ImageForm initialData={course} courseId={course.id} />
            <CategoryForm
              initialData={course}
              courseId={course.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
          </div>
          <div className="space-y-6">
            <div>{/* <div>TODO: Chapters</div> */}</div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">Bán khóa học của bạn</h2>
              </div>
              <PriceForm initialData={course} courseId={course.id} />
              <AttachmentForm initialData={course} courseId={course.id} />
              <div className=" pt-4 flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Các bài học của khóa học</h2>
              </div>
              <ChaptersForm initialData={course} courseId={course.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseIdPage;
