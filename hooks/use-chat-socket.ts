import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {  Chapter, Profile,Comment } from "@prisma/client";

import { useSocket } from "@/components/providers/socket-provider";

type ChatSocketProps = {
  addKey: string;
  updateKey: string;
  queryKey: string;
};

type CommentChapterWithProfile = Comment & {
  profile: Profile;
  chapter: Chapter
};

export const useChatSocket = ({
  addKey,
  updateKey,
  queryKey,
}: ChatSocketProps) => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on(updateKey, (comment: CommentChapterWithProfile) => {
      queryClient.setQueryData([queryKey], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return oldData;
        }

        const newData = oldData.pages.map((page: any) => {
          return {
            ...page,
            items: page.items.map((item: CommentChapterWithProfile) => {
              if (item.id === comment.id) {
                return comment;
              }
              return item;
            }),
          };
        });

        return {
          ...oldData,
          pages: newData,
        };
      });
    });

    socket.on(addKey, (comment: CommentChapterWithProfile) => {
      queryClient.setQueryData([queryKey], (oldData: any) => {
        
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return {
            pages: [
              {
                items: [comment],
              },
            ],
          };
        }
        console.log("oldData",oldData);
        

        const newData = [...oldData.pages];
        console.log("newData chứa dữ liệu cũ",newData);


        newData[0] = {
          //giữ nguyên các thuộc tính của trang
          ...newData[0],
          //cập nhật lại trang với comment mới add vào đầu
          items: [comment, ...newData[0].items],
        };
        console.log("newData chứa dữ liệu mới",newData);

        return {
          ...oldData,
          pages: newData,
        };
      });
    });

    return () => {
      socket.off(addKey);
      socket.off(updateKey);
    };
  }, [queryClient, addKey, queryKey, socket, updateKey]);
};
