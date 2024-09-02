"use server";

import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { returnValidationErrors } from "next-safe-action";

import { LoginWithEmailSchema, OnboardingSchema } from "~/validators/user";
import { signIn, signOut, update } from "~/server/auth";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { actionClient, authActionClient } from "~/lib/safe-action";

export const loginWithEmailAction = actionClient
  .schema(LoginWithEmailSchema)
  .action(async ({ parsedInput }) => {
    return signIn("resend", { email: parsedInput.email });
  });

export async function loginWithGithubAction() {
  await signIn("github");
}

export async function loginWithDiscordAction() {
  await signIn("discord");
}

export async function logoutAction() {
  await signOut();
}

export const onboardingAction = authActionClient
  .schema(OnboardingSchema)
  .action(async ({ ctx, parsedInput }) => {
    const redirectTo = parsedInput.redirectTo ?? "/app";

    const isUsernameTaken = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.username, parsedInput.username));
    if (isUsernameTaken.length > 0) {
      returnValidationErrors(OnboardingSchema, {
        username: {
          _errors: ["Username already taken"],
        },
      });
    }

    await db
      .update(users)
      .set({
        username: parsedInput.username,
        name: parsedInput.name,
      })
      .where(eq(users.id, ctx.session.user.id));

    await update({
      user: {
        username: parsedInput.username,
        name: parsedInput.name,
      },
    });
    return redirect(redirectTo);
  });
