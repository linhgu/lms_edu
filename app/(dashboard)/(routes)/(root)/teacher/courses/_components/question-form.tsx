'use client';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Edit, PlusCircle, RotateCw, Trash } from 'lucide-react';
import { Question } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { useModal } from '@/hooks/use-modal-store';
import { ActionTooltip } from '@/components/action-tooltip';
import { useRouter } from 'next/navigation';
import { ConfirmModal } from '@/components/modals/confirm-modal';

interface QuestionsFormProps {
  initialData?: Question[] | null;
  courseId: string;
  chapterId: string;
}

// const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const QuestionsForm = ({ initialData, courseId, chapterId }: QuestionsFormProps) => {
  const { onOpen } = useModal();
  const router = useRouter();
  // const { data } = useSWR(`/api/courses/${courseId}/chapters/${chapterId}/question/`, fetcher);

  // console.log('question', data);
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}/question/${id}/`);
      router.refresh();
      // mutate(`/api/courses/${courseId}/chapters/${chapterId}`);
      toast.success('Question deleted');
    } catch (error) {
      toast.error('Question delete failed');
      console.log('Error', error);
    }
  };
  return (
    <>
      <div className=" bg-slate-100 rounded-md p-4 mt-6">
        <div className="flex items-center justify-between ">
          <h2 className="text-base font-medium">Các câu hỏi</h2>
          <div>
            <Button
              onClick={() => {
                router.refresh();
              }}
              variant={'ghost'}
              className="hover:bg-transparent"
            >
              <RotateCw className="h-4 w-4 " />
            </Button>
            <Button
              variant="ghost"
              className="hover:bg-transparent"
              onClick={() =>
                onOpen('openQuestionModal', {
                  query: {
                    initialData,
                    courseId,
                    chapterId,
                  },
                })
              }
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Thêm câu hỏi
            </Button>
          </div>
        </div>
        {initialData && (
          <>
            <div>
              {initialData.map((item: any) => (
                <span
                  key={item?.id}
                  className=" group flex items-center justify-between bg-white w-full p-4 rounded-sm cursor-pointer mt-4"
                >
                  <h3 className="line-clamp-1 group-hover:text-leadingcolor">{item?.question}</h3>

                  <div className="flex items-center gap-x-2  p-1 -top-2 right-5 bg-white rounded-sm">
                    <ActionTooltip label="Chỉnh sửa">
                      <Edit
                        onClick={() => {
                          onOpen('openEditQuestionModal', item);
                        }}
                        className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
                      />
                    </ActionTooltip>
                    <ActionTooltip label="Xóa">
                      <ConfirmModal
                        onConfirm={() => {
                          handleDelete(item?.id);
                        }}
                      >
                        <Trash className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition" />
                      </ConfirmModal>
                    </ActionTooltip>
                  </div>
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};
