"use server";

import { LoginWithEmailSchema } from "~/validators/user";
import { signIn, signOut } from "~/server/auth";
import { actionClient } from "~/lib/safe-action";

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
