import Stripe from "stripe";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { currentProfile } from "@/lib/current-profile";
import { getChapter } from "@/actions/get-chapters";
import { Chapter } from "@prisma/client";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
  ) {
    
    const user = await currentUser();
    if(!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    try {
    const profile = await currentProfile()


    if (!profile || !profile.id || !profile.userId||!profile.username) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    //kiểm tra khóa học 
    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        isPublished: true,
      }
    });
    //trang thái mua khóa học của người dùng 
    const purchase = await db.purchase.findUnique({
      where: {
        profileId_courseId: {
          profileId: profile.id,
          courseId: params.courseId
        }
      }
    });

    if (purchase) {
      return new NextResponse("Already purchased", { status: 400 });
    }

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }
    // thông tin thanh toán gói hàng
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: {
            name: course.title,
            description: course.description!,
          },
          unit_amount: Math.round(course.price! * 100),
        }
      }
    ];
    const chapters = await db.chapter.findMany({
      where:{
        courseId: params.courseId,
      }
    })
    if(chapters.length > 0) {
      for (const chapter of chapters) {
        
        await db.lockChapter.upsert({
          where: {
            id:`${chapter.id}${profile.id}`,
          },
          update:{
            isLocked: true,
          },
          create:{
            id:`${chapter.id}${profile.id}`,
            isLocked: true,
            chapterId: chapter.id
        }
        })
      }
    }
    
    let stripeCustomer = await db.stripeCustomer.findUnique({
      where: {
        profileId: profile.id,
      },
      select: {
        stripeCustomerId: true,
      }
    });

    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: user.emailAddresses[0].emailAddress,
      });

      stripeCustomer = await db.stripeCustomer.create({
        data: {
          profileId: profile.id,
          stripeCustomerId: customer.id,
        }
      });
    }

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomer.stripeCustomerId,
      line_items,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.id}?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.id}?canceled=1`,
      metadata: {
        courseId: course.id,
        profileId: profile.id,
      }
    });
    console.log('đã xong bên tạo đơn hàng ');
    

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.log("[COURSE_ID_CHECKOUT]", error);
    return new NextResponse("Internal Error", { status: 500 })
  }
}