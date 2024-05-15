import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, {params}:{params:{courseId:string ,chapterId:string ,questionId:string}}){
    try {
    const {courseId, chapterId} = params;
    const profile = await currentProfile();
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

      const question = await db.question.delete ({
        where: {
          id: params.questionId,
        }
      })
    return NextResponse.json(question);
    } catch (error) {
        console.log("Error: ", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}


export async function PATCH(req: Request, {params}:{params:{courseId:string ,chapterId:string ,questionId:string}}) {
  try {
    const {courseId, chapterId,questionId,} = params;
    const {question,option_a,option_b,option_c,option_d,correct_answer} = await req.json()
    
    const profile = await currentProfile();
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

      const result = await db.question.update({
        where:{
          id: questionId,
        },
        data:{
          question:question,
          option_a,
          option_b,
          option_c,
          option_d,
          answer:correct_answer,
        }
      })
    return NextResponse.json(result);
  } catch (error) {
    console.log("Error: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}