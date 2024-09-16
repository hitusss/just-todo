import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import Github from "next-auth/providers/github";
import Resend from "next-auth/providers/resend";
import { useSession } from "next-auth/react";

import { db } from "~/server/db";
import { env } from "~/env";

import { authConfig } from "./auth.config";

export const {
  handlers,
  signIn,
  signOut,
  auth,
  unstable_update: update,
} = NextAuth({
  ...authConfig,
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token }) {
      const dbUser = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.email, token.email),
        columns: {
          id: true,
          username: true,
          name: true,
          email: true,
          image: true,
        },
      });
      if (!dbUser) return null;
      return {
        ...token,
        id: dbUser.id,
        email: dbUser.email,
        username: dbUser.username ?? undefined,
        name: dbUser.name ?? undefined,
        picture: dbUser.image ?? undefined,
      };
    },
  },
  adapter: DrizzleAdapter(db),
  providers: [
    Resend({
      apiKey: env.RESEND_API_KEY,
      from: env.RESEND_FROM,
    }),
    Github({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    Discord({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
  ],
});

export async function requireAuth() {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}
