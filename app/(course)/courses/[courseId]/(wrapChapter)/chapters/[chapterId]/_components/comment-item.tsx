'use client';

import * as z from 'zod';
import axios from 'axios';
import qs from 'query-string';
import { useForm } from 'react-hook-form';
import { Edit, FileIcon, ShieldAlert, ShieldCheck, Trash } from 'lucide-react';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Profile, Comment, Role } from '@prisma/client';
import { cn } from '@/lib/utils';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useModal } from '@/hooks/use-modal-store';
import { UserAvatar } from '@/components/user-avatar';
import { ActionTooltip } from '@/components/action-tooltip';
import toast from 'react-hot-toast';

interface ChatItemProps {
  id: string;
  content: string;
  profile: Profile;
  message: Comment & {
    profile: Profile;
  };
  timestamp: string;
  // fileUrl: string | null;
  deleted: boolean;
  isUpdated: boolean;
  socketUrl: string;
  socketQuery: Record<string, string>;
}

const roleIconMap = {
  member: null,
  admin: <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />,
};

const formSchema = z.object({
  content: z.string().min(1),
});

export const CommentItem = ({
  id,

  content,
  message,
  timestamp,
  profile,
  // fileUrl,
  deleted,
  isUpdated,
  socketUrl,
  socketQuery,
}: ChatItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { onOpen } = useModal();
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === 'Escape' || event.keyCode === 27) {
        setIsEditing(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keyDown', handleKeyDown);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: content,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);

    try {
      const url = qs.stringifyUrl({
        // socketUrl:/api/socket/comments
        url: `${socketUrl}/${id}`,
        query: socketQuery,
      });

      await axios.patch(url, values);
      toast.success('Chỉnh sửa hoàn tất');
      router.refresh();
      form.reset();
      setIsEditing(false);
    } catch (error) {
      console.log(error);
      toast.error('Chỉnh sửa lỗi');
    }
  };

  useEffect(() => {
    form.reset({
      content: content,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  // const fileType = fileUrl?.split('.').pop();
  const isAdmin = profile?.role === Role.admin;
  const isOwner = message?.profile?.id === profile.id;
  const canDeleteMessage = !deleted && (isAdmin || isOwner);
  const canEditMessage = !deleted && isOwner;
  // const isPDF = fileType === 'pdf' && fileUrl;
  // const isImage = !isPDF && fileUrl;

  return (
    <div className="relative group flex items-center hover:bg-black/5 p-4 transition w-full">
      <div className="group flex gap-x-2 items-start w-full">
        <ActionTooltip label={message.profile?.username}>
          <div className="cursor-pointer hover:drop-shadow-md transition">
            <UserAvatar src={message.profile?.imageUrl} />
          </div>
        </ActionTooltip>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-x-2">
            <div className="flex items-center">
              <p className="font-semibold text-sm hover:underline cursor-pointer">{message.profile?.username}</p>
              <ActionTooltip label={message.profile?.role}>{roleIconMap[message.profile?.role]}</ActionTooltip>
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">{timestamp}</span>
          </div>
          {!isEditing && (
            <p
              className={cn(
                'text-sm text-zinc-600 dark:text-zinc-300',
                deleted && 'italic text-zinc-500 dark:text-zinc-400 text-xs mt-1',
              )}
            >
              {content}
              {isUpdated && !deleted && (
                <span className="text-[10px] mx-2 text-zinc-500 dark:text-zinc-400">(đã chỉnh sửa)</span>
              )}
            </p>
          )}
          {isEditing && (
            <Form {...form}>
              <form className="flex items-center w-full gap-x-2 pt-2" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className="relative w-full">
                          <Input
                            disabled={isLoading}
                            className="p-2 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                            placeholder="Edited message"
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button disabled={isLoading} size="sm" variant="primary">
                  Lưu
                </Button>
              </form>
              <span className="text-[10px] mt-1 text-zinc-400">Nhấn thoát để hủy, nhập để lưu</span>
            </Form>
          )}
        </div>
      </div>

      <div className="hidden group-hover:flex items-center gap-x-2 absolute p-1 -top-2 right-5 bg-white dark:bg-zinc-800 border rounded-sm">
        {canEditMessage && canDeleteMessage && (
          <ActionTooltip label="Chỉnh sửa">
            <Edit
              onClick={() => setIsEditing(true)}
              className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
            />
          </ActionTooltip>
        )}
        {canDeleteMessage && (
          <ActionTooltip label="Xóa">
            <Trash
              onClick={() => {
                onOpen('deleteComment', {
                  apiUrl: `${socketUrl}/${id}`,
                  query: socketQuery,
                });
              }}
              className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
            />
          </ActionTooltip>
        )}
      </div>
    </div>
  );
};
