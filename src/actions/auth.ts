"use server";

import { LoginWithEmailSchema } from "~/validators/user";
import { signOut as authSignOut, signIn } from "~/server/auth";
import { parseFormData } from "~/server/form";

export async function signInWithEmail(prevState: unknown, formData: FormData) {
  const submission = await parseFormData(formData, {
    schema: LoginWithEmailSchema,
  });
  if (!submission.success) {
    return submission.reply();
  }

  return signIn("resend", { email: submission.data.email });
}

export async function signInWithGithub() {
  return signIn("github");
}

export async function signInWithDiscord() {
  return signIn("discord");
}

export async function signOut() {
  return authSignOut();
}
