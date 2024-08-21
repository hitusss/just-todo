"use client";

import {
  signInWithDiscord,
  signInWithEmail,
  signInWithGithub,
} from "~/actions/auth";
import { LoginWithEmailSchema } from "~/validators/user";
import { useFormWithAction } from "~/lib/form";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

export function LoginForm() {
  const { form, formAction, onSubmit } = useFormWithAction({
    schema: LoginWithEmailSchema,
    action: signInWithEmail,
  });

  return (
    <>
      <Form {...form}>
        <form action={formAction} onSubmit={onSubmit} className="grid">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Login with Email</Button>
        </form>
      </Form>
      <div className="flex items-center gap-2 py-2">
        <span className="h-px flex-1 bg-border" />
        <p>or</p>
        <span className="h-px flex-1 bg-border" />
      </div>
      <ul className="grid gap-4">
        <li>
          <form action={signInWithGithub}>
            <Button type="submit" className="w-full">
              Login with Github
            </Button>
          </form>
        </li>
        <li>
          <form action={signInWithDiscord}>
            <Button type="submit" className="w-full">
              Login with Discord
            </Button>
          </form>
        </li>
      </ul>
    </>
  );
}
