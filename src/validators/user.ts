import { z } from "zod";

export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 40;

export const USER_EMAIL_MIN_LENGTH = 3;
export const USER_EMAIL_MAX_LENGTH = 255;

export const EmailSchema = z
  .string({ required_error: "Email is required" })
  .email({ message: "Email is invalid" })
  .min(USER_EMAIL_MIN_LENGTH, { message: "Email is too short" })
  .max(USER_EMAIL_MAX_LENGTH, { message: "Email is too long" });

export const UsernameSchema = z
  .string({ required_error: "Username is required" })
  .min(USERNAME_MIN_LENGTH, { message: "Username is too short" })
  .max(USERNAME_MAX_LENGTH, { message: "Username is too long" })
  .regex(/^[a-zA-Z0-9_]+$/, {
    message: "Username can only include letters, numbers, and underscores",
  })
  .transform((value) => value.toLowerCase());

export const NameSchema = z
  .string({ required_error: "Name is required" })
  .min(USERNAME_MIN_LENGTH, { message: "Name is too short" })
  .max(USERNAME_MAX_LENGTH, { message: "Name is too long" });

export const LoginWithEmailSchema = z.object({
  email: EmailSchema,
});

export const OnboardingSchema = z.object({
  name: NameSchema,
  username: UsernameSchema,
  redirectTo: z.string().optional(),
});

export const OnboardingSchemaTest = z.object({
  name: NameSchema,
  username: z
    .string({ required_error: "Username is required" })
    .min(USERNAME_MIN_LENGTH, { message: "Username is too short" })
    .max(USERNAME_MAX_LENGTH, { message: "Username is too long" })
    .regex(/^[A-Z0-9_]+$/, {
      message: "Username can only include letters, numbers, and underscores",
    })
    .transform((value) => value.toLowerCase()),
  redirectTo: z.string().optional(),
});
