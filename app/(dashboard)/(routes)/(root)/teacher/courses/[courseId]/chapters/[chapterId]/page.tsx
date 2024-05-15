import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowLeft, Eye, HelpCircle, LayoutDashboard, Video } from 'lucide-react';

import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { IconBadge } from '@/components/icon-badge';
import { Banner } from '@/components/banner';

import { ChapterTitleForm } from './_components/chapter-title-form';
import { ChapterDescriptionForm } from './_components/chapter-description-form';
import { ChapterAccessForm } from '../../../_components/chapter-access-form';
import { ChapterVideoForm } from '../../../_components/chapter-video-form';
import { ChapterActions } from '../../../_components/chapters-action';
import { QuestionsForm } from '../../../_components/question-form';

const ChapterIdPage = async ({ params }: { params: { courseId: string; chapterId: string } }) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect('/');
  }

  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
  });

  const question = await db.question.findMany({
    where: {
      chapterId: params.chapterId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (!chapter) {
    return redirect('/');
  }

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;
  const isCompleted = requiredFields.every(Boolean);

  return (
    <>
      {!chapter.isPublished && (
        <Banner variant="warning" label="Chương này chưa được xuất bản. Nó sẽ không được hiển thị trong khóa học" />
      )}

      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/teacher/courses/${params.courseId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại thiết lập khóa học
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Tạo bài học</h1>
                <span className="text-sm text-slate-700">Hoàn thành tất cả các trường {completionText}</span>
              </div>
              <ChapterActions
                disabled={!isCompleted}
                courseId={params.courseId}
                chapterId={params.chapterId}
                isPublished={chapter.isPublished}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">Tùy chỉnh bài học của bạn</h2>
              </div>
              <ChapterTitleForm initialData={chapter} courseId={params.courseId} chapterId={params.chapterId} />
              <ChapterDescriptionForm initialData={chapter} courseId={params.courseId} chapterId={params.chapterId} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Eye} />
                <h2 className="text-xl">Cài đặt truy cập</h2>
              </div>
              <ChapterAccessForm initialData={chapter} courseId={params.courseId} chapterId={params.chapterId} />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Video} />
              <h2 className="text-xl">Thêm video</h2>
            </div>
            <ChapterVideoForm initialData={chapter} courseId={params.courseId} chapterId={params.chapterId} />
          </div>
          <div>
            <div className="flex items-center justify-between gap-x-2 ">
              <div className="flex items-center gap-x-2">
                <IconBadge icon={HelpCircle} />
                <h2 className="text-xl">Các câu hỏi</h2>
              </div>
            </div>
            <QuestionsForm initialData={question} courseId={params.courseId} chapterId={params.chapterId} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChapterIdPage;
