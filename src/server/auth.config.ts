import { NextResponse } from "next/server";
import { type NextAuthConfig } from "next-auth";

export const authConfig = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error: "/login",
    verifyRequest: "/verify-request",
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const protectedRoutes = ["/app"];

      if (request.nextUrl.pathname.startsWith("/login") && isLoggedIn) {
        return NextResponse.redirect(new URL("/app", request.nextUrl.origin));
      }
      if (
        protectedRoutes.some((route) =>
          request.nextUrl.pathname.startsWith(route),
        )
      ) {
        if (!isLoggedIn) {
          return false;
        }
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
