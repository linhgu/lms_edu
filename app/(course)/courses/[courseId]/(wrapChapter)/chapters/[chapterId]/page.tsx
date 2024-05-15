import { File } from 'lucide-react';
import { redirect } from 'next/navigation';

import { getChapter } from '@/actions/get-chapters';
import { currentProfile } from '@/lib/current-profile';

import { Separator } from '@/components/ui/separator';
import { Banner } from '@/components/banner';
import { Preview } from '@/components/preview';

import { VideoPlayer } from './_components/video-player';
import { CourseEnrollButton } from './_components/course-enroll-button';
import { CourseProgressButton } from './_components/course-progress-button';
import { CommentInput } from './_components/comment-input';
import { CommentList } from './_components/comment-list';
import { ExamButton } from './question/_components/exam-button';

const ChapterIdPage = async ({ params }: { params: { courseId: string; chapterId: string } }) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect('/');
  }

  const { chapter, course, attachments, nextChapter, userProgress, purchase, questions } = await getChapter({
    profileId: profile.id,
    chapterId: params.chapterId,
    courseId: params.courseId,
  });
  if (!chapter || !course) {
    return redirect('/');
  }
  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;
  const isQuestions = !!questions.length;

  return (
    <div>
      {userProgress?.isCompleted && <Banner variant="success" label="Chúc mừng bạn đã hoàn thành chương này." />}
      {isLocked && <Banner variant="warning" label="Bạn cần mua khóa học này để xem chương này." />}
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            chapterId={params.chapterId}
            videoUrl={chapter.videoUrl!}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
        <div>
          <div className="p-4 text-center md:flex justify-between items-center group">
            <h2 className="text-2xl font-semibold mb-2 text-left ">{chapter.title}</h2>
            {purchase && !isQuestions ? (
              <CourseProgressButton
                profileId={profile.id}
                chapterId={params.chapterId}
                courseId={params.courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
                isQuestions={isQuestions}
              />
            ) : purchase && isQuestions ? (
              <ExamButton
                chapterId={params.chapterId}
                courseId={params.courseId}
                isCompleted={!!userProgress?.isCompleted}
              />
            ) : (
              // price! chuyển đổi giá trị price từ null hoặc undefined sang chuỗi rỗng
              <CourseEnrollButton courseId={params.courseId} price={course.price!} />
            )}
          </div>
          <Separator />
          <div>
            <Preview value={chapter.description!} />
          </div>
          {!!attachments.length && (
            <>
              <Separator />
              <div className="p-4 space-y-2">
                {attachments.map((attachment) => (
                  <a
                    href={attachment.url}
                    target="_blank"
                    key={attachment.id}
                    className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                  >
                    <File />
                    <p className="line-clamp-1">{attachment.name}</p>
                  </a>
                ))}
              </div>
            </>
          )}
          <Separator />
          <div className="p-3 space-y-3">
            <h1 className="text-xl font-bold">Bình luận</h1>
            <div className="  border border-slate-300 rounded h-[600px]">
              <div>
                <CommentInput query={{ chapterId: params.chapterId }} apiUrl="/api/socket/comments" />
              </div>
              <div className="h-[510px] overflow-y-scroll">
                <CommentList
                  profile={profile}
                  chapterId={params.chapterId}
                  apiUrl="/api/comments"
                  socketUrl="/api/socket/comments"
                  socketQuery={{ chapterId: params.chapterId }}
                  paramKey="chapterId"
                  paramValue={params.chapterId}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
