import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

 
// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config:{
    callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/uploadthing`,
    uploadthingId:process.env.UPLOADTHING_APP_ID,
    uploadthingSecret:process.env.UPLOADTHING_SECRET,
    isDev:true,
  }
});


