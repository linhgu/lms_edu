import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: ["/","/api/uploadthing","/api/webhooks/webhook-clerk","/api/webhooks/webhook-stripe",'api/socket/io','/sign-in','/sign-up'],
  // ignoredRoutes: ["/((?!api|trpc))(_next.*|.+\.[\w]+$)", "/api/webhook"],
  /* debug:true, */
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
};