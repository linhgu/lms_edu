import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";

export async function POST(req: Request) {
//Nội dung
// Khi nhận được yêu cầu webhook, bạn cần lấy chữ ký từ header Stripe-Signature.
// Sau đó, bạn sử dụng thư viện Stripe để tạo lại chữ ký dựa trên nội dung body của yêu cầu và bí mật webhook của bạn.
// So sánh chữ ký được tạo lại với chữ ký trong header.
// Nếu hai chữ ký khớp, bạn có thể xác nhận rằng yêu cầu webhook là hợp lệ và đến từ Stripe.


  const body = await req.text();

  
  //Lấy chữ kí từ header tạo bởi stripe
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    //tạo event
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    console.log(error)
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
  }
  // lấy phiên thanh toán từ sự kiện 
  const session = event.data.object as Stripe.Checkout.Session;
  const profileId = session?.metadata?.profileId;
  const courseId = session?.metadata?.courseId;

  if (event.type === "checkout.session.completed") {
    if (!profileId || !courseId) {
      return new NextResponse(`Webhook Error: Missing metadata`, { status: 400 });
    }

    await db.purchase.create({
      data: {
        courseId: courseId,
        profileId:profileId,
      }
    });

    const chapters = await db.chapter.findMany({
      where:{
        courseId
      }
    })

    chapters.map(async(chapter) =>{
      return await db.userProgress.upsert({
        where:{
          profileId_chapterId: {
            profileId,
            chapterId: chapter.id,
          },
        },
        update:{
          isCompleted: false,
        },
        create: {
          chapterId: chapter.id,
          profileId: profileId,
          isCompleted: false,
        }
      })
    })
  } else {
    return new NextResponse(`Webhook Error: Unhandled event type ${event.type}`, { status: 200 })
  }

  return new NextResponse(null, { status: 200 });
}