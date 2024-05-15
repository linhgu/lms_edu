import { NextResponse } from "next/server";
import { Comment } from "@prisma/client";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

const COMMENT_BATCH = 10;

export async function GET(req: Request) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    

    const cursor = searchParams.get("cursor");
    const chapterId = searchParams.get("chapterId");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!chapterId) {
      return new NextResponse("Channel ID missing", { status: 400 });
    }

    let comment: Comment[] = [];

    if (cursor) {
        comment = await db.comment.findMany({
        take: COMMENT_BATCH,
        skip: 1,
        cursor: {
          id: cursor,
        },
        where: {
            chapterId,
        },
        include: {
          profile:true,
          chapter: {
            include: {
              course: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      comment = await db.comment.findMany({
        take: COMMENT_BATCH,
        where: {
            chapterId,
        },
        include: {
          profile:true,
          chapter: {
            include: {
              course: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    let nextCursor = null;

    if (comment.length === COMMENT_BATCH) {
      nextCursor = comment[COMMENT_BATCH - 1].id;
    }

    return NextResponse.json({
      items: comment,
      nextCursor,
    });
  } catch (error) {
    console.log("[MESSAGES_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
