import { z } from "zod";

export const EmailSchema = z
  .string({ required_error: "Email is required" })
  .email({ message: "Email is invalid" })
  .min(3, { message: "Email is too short" })
  .max(255, { message: "Email is too long" });

export const LoginWithEmailSchema = z.object({
  email: EmailSchema,
});
