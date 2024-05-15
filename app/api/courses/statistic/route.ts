import { DateRange } from 'react-day-picker';
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

export async function GET(
  req: Request,
) {
  const profile = await currentProfile()
  const { searchParams } = new URL(req.url);

  const data = searchParams.get("dayRange");
  const dayRange: DateRange = JSON.parse(data!);
    
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
  try {

    const categories = await db.category.findMany({
        include:{
            courses:{
                where:{
                  createdAt: {
                    gte: new Date(dayRange.from!).toISOString(), // Chuyển đổi sang ISO
                    lte: new Date(dayRange.to!).toISOString(), // Chuyển đổi sang ISO
                  },
                }
            }
        }
    }) 
  
    return NextResponse.json(categories);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}