import { NextApiRequest } from "next";

import { NextApiResponseServerIo } from "@/type";
import { currentProfilePages } from "@/lib/current-profile-pages";
import { db } from "@/lib/db";
import { Role } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  if (req.method !== "DELETE" && req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const profile = await currentProfilePages(req);
    const { chapterId,commentId } = req.query;

    const { content } = req.body;

    if (!profile) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!chapterId) {
      return res.status(400).json({ error: "Chapter ID missing" });
    }
    
    const chapter = await db.chapter.findFirst({
      where: {
        id: chapterId as string,
      },
    });

    if (!chapter) {
      return res.status(404).json({ error: "Chapter not found" });
    }
    let comment = await db.comment.findFirst({
        where:{
            id:commentId as string,
            chapterId:chapterId as string
        },
        include:{
            profile:true,
            chapter:true
        }
    });

    if (!comment || comment.deleted) {
        return res.status(404).json({ error: "Comment not found" });
      }

    const isMessageOwner = comment.profileId === profile.id;
    const isAdmin = profile.role === Role.admin;
    const canModify = isMessageOwner || isAdmin ;

    if (!canModify) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (req.method === "DELETE") {
      comment = await db.comment.update({
        where: {
          id: commentId as string,
        },
        data: {
        //   fileUrl: null,
          content: "Bình luận đã bị xóa.",
          deleted: true,
        },
        include: {
            chapter:true,
            profile: true,
          },
      });
    }

    if (req.method === "PATCH") {
      if (!isMessageOwner) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      comment = await db.comment.update({
        where: {
          id: commentId as string,
        },
        data: {
          content,
        },
        include: {
            chapter:true,
            profile: true,
          },
      });
    }

    const updateKey = `chat:${chapterId}:comment:update`;

    res?.socket?.server?.io?.emit(updateKey, comment);

    return res.status(200).json(comment);
  } catch (error) {
    console.log("[MESSAGE_ID]", error);
    return res.status(500).json({ error: "Internal Error" });
  }
}
