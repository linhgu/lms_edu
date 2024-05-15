import { clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function DELETE(
    req: Request,
    {params}:{params:{userId:string}}
  ) {
    try {
        const profile = await currentProfile();
        console.log("id",params.userId);
    
        if(!profile) {
            return new NextResponse('Unauthorized',{status:401})
        }
     

        const user = await clerkClient.users.deleteUser(
            params.userId
        )

         await db.profile.delete({
            where: { userId:params.userId  },
          });
        return NextResponse.json(user);
    } catch (error) {
        console.log("Error: ", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PATCH(req: Request,
    { params} :{ params:{ userId:string } }
    ){
    try {
        const profile = await currentProfile();
        const userId = params.userId
        
        const { name ,role} = await req.json();

        if(!profile) {
            return new NextResponse('Unauthorized',{status:401})
        }

        const user = await db.profile.update({
            where:{ userId },
            data:{role}
         })

        await clerkClient.users.updateUser(
            userId,
            {username:name}
        )

        return NextResponse.json(user)
    } catch (error) {
        console.log("Error: ", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
export async function GET(req: Request,
    { params} :{ params:{ userId:string } }
    ){
    try {
        const profile = await currentProfile();
        if(!profile) {
            return new NextResponse('Unauthorized',{status:401})
        }

        const listUser = await db.profile.findMany({
            orderBy:{
                userId:'desc'
            }
         })
        return NextResponse.json(listUser)
    } catch (error) {
        console.log("Error: ", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}