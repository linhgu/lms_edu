import { NextApiRequest } from "next";

import { NextApiResponseServerIo } from "@/type"
import { currentProfilePages } from "@/lib/current-profile-pages";
import { db } from "@/lib/db";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
){
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
      }
    try {
        const profile = await currentProfilePages(req)
        const {content} = req.body
        const {chapterId} = req.query
        if (!profile) {
            return res.status(401).json({ error: "Unauthorized" });
          }
        if (!content) {
            return res.status(400).json({ error: "Content missing" });
        }
        if (!chapterId) {
            return res.status(400).json({ error: "ChapterId missing" });
        }

        const chapter = await db.chapter.findUnique({
            where: {
                id: chapterId as any,
            }
        })
        if (!chapter) {
            return res.status(404).json({ error: "Chapter not found" });
        }

        const comment = await db.comment.create({
            data: {
                content,
                chapterId: chapter.id,
                profileId: profile.id,
            },
            include:{
                profile:true,
                chapter:{
                    include:{
                        course:true
                    }
                }
            }
        })
        const chapterKey = `chat:${chapterId}:comment`;

        res?.socket?.server?.io?.emit(chapterKey, comment);

    return res.status(200).json(comment);
    } catch (error) {
        console.log("[COMMENT_POST]", error);
    return res.status(500).json({ message: "Internal Error" });
    }
}

