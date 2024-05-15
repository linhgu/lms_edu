import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string; nextChapterId: string } }
) {
  try {

    const profile = await currentProfile()
    const {nextChapterId,profileId} = await req.json()

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const unLockedChapter = await db.lockChapter.update({
      where: {
        id: `${nextChapterId}${profileId}`,
        chapterId:nextChapterId,
      },
      data: {
        isLocked: false,
      }
    })
 

    return NextResponse.json(unLockedChapter);
  } catch (error) {
    console.log("[CHAPTER_LOCKED]", error);
    return new NextResponse("Internal Error", { status: 500 }); 
  }
}