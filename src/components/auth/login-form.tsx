"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";

import { LoginWithEmailSchema } from "~/validators/user";
import {
  loginWithDiscordAction,
  loginWithEmailAction,
  loginWithGithubAction,
} from "~/actions/auth";
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
  const { form, handleSubmitWithAction } = useHookFormAction(
    loginWithEmailAction,
    zodResolver(LoginWithEmailSchema),
  );

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmitWithAction} className="grid">
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
          <form action={loginWithGithubAction} className="grid">
            <Button type="submit">Login with Github</Button>
          </form>
        </li>
        <li>
          <form action={loginWithDiscordAction} className="grid">
            <Button type="submit">Login with Discord</Button>
          </form>
        </li>
      </ul>
    </>
  );
}
