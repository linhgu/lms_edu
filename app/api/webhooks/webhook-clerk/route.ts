import { db } from "@/lib/db";

import { IncomingHttpHeaders } from "http";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook, WebhookRequiredHeaders } from "svix";

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || "";

async function handler(request: Request) {
  const payload = await request.json();
  const headersList = headers();
  const heads = {
    "svix-id": headersList.get("svix-id"),
    "svix-timestamp": headersList.get("svix-timestamp"),
    "svix-signature": headersList.get("svix-signature"),
  };
  const wh = new Webhook(webhookSecret);
  let evt: Event | null = null;

  try {
    evt = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as Event;
  } catch (err) {
    console.error((err as Error).message);
    return NextResponse.json({}, { status: 400 });
  }

  const eventType: EventType = evt.type;
  
  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, ...attributes } = evt.data;
    const attribute = attributes as any;

    const username = attribute?.username 
    const email  = attribute?.email_addresses[0].email_address;
    const imageUrl = attribute?.image_url
    // console.log(attributes);

    

    
    await db.profile.upsert({
      where: { userId: id as string },
      create: {
        userId: id as string,
        email:email as string,
        username: username as string,
        imageUrl: imageUrl 
      },
      update: {  
        userId: id as string,
        email:email as string,
        username: username as string, 
        imageUrl: imageUrl 

      }});
  }
  return new NextResponse(null,{status:200})
}

type EventType = "user.created" | "user.updated" | "user.deleted";

type Event = {
  data: Record<string, string | number>;
  object: "event";
  type: EventType;
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;
