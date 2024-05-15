import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req:Request,
    {params}:{params:{courseId:string ,chapterId:string}}) {
    try {
        const {courseId, chapterId} = params;
        const profile =  await currentProfile()
        const values = await req.json()

        if(!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const ownCourse = await db.course.findUnique({
            where: {
              id: courseId,
              profileId: profile.id,
            }
          });
      
          if (!ownCourse) {
            return new NextResponse("Unauthorized", { status: 401 });
          }
      
          const chapter = await db.chapter.findUnique({
            where: {
              id: chapterId,
              courseId: params.courseId,
            }
          });
          if(!chapter) {
            return new NextResponse("Unauthorized", { status: 401 });
          }

        const question = await db.question.create({
            data: {
                question: values?.question ,   
                option_a: values?.option_a, 
                option_b: values?.option_b, 
                option_c: values?.option_c, 
                option_d: values?.option_d, 
                answer: values?.correct_answer, 
                chapterId: params.chapterId,
                courseId: params.courseId,
                profileId: profile.id,
            }
        })
        return new NextResponse(JSON.stringify(question), { status: 200 });
    } catch (error) {
        console.log("Error: ", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const profile = await currentProfile()
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        profileId:profile.id
      }
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapter = await db.chapter.findMany({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
    });
    if (!chapter) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const question = await db.question.findMany({
      where: {
        chapterId: params.chapterId,
        courseId: params.courseId,
      },
    })
    return NextResponse.json(question);
  } catch (error) {
    console.log("[COURSES_CHAPTER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}