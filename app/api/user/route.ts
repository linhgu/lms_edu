import { currentProfile } from "@/lib/current-profile";
import { clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
  ) {
    try {
        const { name,email ,password } =await req.json()
        console.log(name);
        
        const profile = await currentProfile();
        if(!profile) {
            return new NextResponse('Unauthorized',{status:401})
        }

        const user = await clerkClient.users.createUser({
            username:name,
            password:password,
            emailAddress:[email],
        })
        return NextResponse.json(user);
    } catch (error) {
        console.log("Error: ", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}