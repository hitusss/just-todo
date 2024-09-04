"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useAction } from "next-safe-action/hooks";

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
    {
      formProps: {
        defaultValues: { email: "" },
      },
    },
  );

  const loginWithGithub = useAction(loginWithGithubAction);
  const loginWithDiscord = useAction(loginWithDiscordAction);

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
          <Button onClick={() => loginWithGithub.execute()} className="w-full">
            Login with Github
          </Button>
        </li>
        <li>
          <Button onClick={() => loginWithDiscord.execute()} className="w-full">
            Login with Discord
          </Button>
        </li>
      </ul>
    </>
  );
}
