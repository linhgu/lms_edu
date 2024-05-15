'use client';

import { ElementRef, Fragment, useRef } from 'react';
import { Loader2, ServerCrash } from 'lucide-react';
import { format } from 'date-fns';

import { Comment, Profile } from '@prisma/client';
import { useChatQuery } from '@/hooks/use-chat-query';
import { useChatSocket } from '@/hooks/use-chat-socket';
import { CommentItem } from './comment-item';

// import { useChatScroll } from "@/hooks/use-chat-scroll";

type CommentWithChapterWithProfile = Comment & {
  profile: Profile;
};

const DATE_FORMAT = 'd-MM-yyyy HH:mm:ss';

interface CommentListProps {
  chapterId: string;
  profile: Profile;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: string;
  paramValue: string;
}

export const CommentList = ({
  chapterId,
  apiUrl,
  socketUrl,
  socketQuery,
  paramKey,
  paramValue,
  profile,
}: CommentListProps) => {
  const queryKey = `chat:${chapterId}`;
  const addKey = `chat:${chapterId}:comment`;
  const updateKey = `chat:${chapterId}:comment:update`;

  const chatRef = useRef<ElementRef<'div'>>(null);
  const bottomRef = useRef<ElementRef<'div'>>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useChatQuery({
    queryKey,
    apiUrl,
    paramKey,
    paramValue,
  });

  useChatSocket({ queryKey, addKey, updateKey });

  if (status === 'pending') {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading comments...</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Something went wrong!</p>
      </div>
    );
  }

  return (
    <div ref={chatRef} className="flex-1 flex flex-col py-4 overflow-y-auto">
      {!hasNextPage && <div className="flex-1" />}
      {/* {!hasNextPage && <ChatWelcome />} */}

      <div className="flex flex-col mt-auto">
        {data?.pages?.map((group: any, i: number) => (
          <div key={i}>
            {group.items.map((message: CommentWithChapterWithProfile) => (
              <div key={message.id}>
                <CommentItem
                  id={message.id}
                  profile={profile}
                  content={message.content}
                  deleted={message.deleted}
                  timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                  isUpdated={message.updatedAt !== message.createdAt}
                  socketUrl={socketUrl}
                  socketQuery={socketQuery}
                  message={message}
                  // fileUrl={null}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      {hasNextPage && (
        <div className="flex justify-center">
          {isFetchingNextPage ? (
            <Loader2 className="h-6 w-6 text-zinc-500 animate-spin my-4" />
          ) : (
            <button
              onClick={() => fetchNextPage()}
              className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 text-xs my-4 dark:hover:text-zinc-300 transition"
            >
              Load messages
            </button>
          )}
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
};
