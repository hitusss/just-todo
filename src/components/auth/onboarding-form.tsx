"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";

import { OnboardingSchema } from "~/validators/user";
import { onboardingAction } from "~/actions/auth";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

export function OnboardingForm() {
  const searchParams = useSearchParams();
  const { form, handleSubmitWithAction } = useHookFormAction(
    onboardingAction,
    zodResolver(OnboardingSchema),
    {
      formProps: {
        defaultValues: {
          username: "",
          name: "",
          agreeToTermsOfServiceAndPrivacyPolicy: false,
          redirectTo: searchParams.get("redirectTo") ?? undefined,
        },
      },
    },
  );

  return (
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction} className="grid">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Username"
                  {...field}
                  className="lowercase"
                />
              </FormControl>
              <FormDescription>
                Username will be your unique identifier on the platform.
                Username will be lowercase and can contain only letters,
                numbers, and underscores.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormDescription>
                Name will be your display name on the platform.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="agreeToTermsOfServiceAndPrivacyPolicy"
          render={({ field }) => (
            <FormItem>
              <div className="flex gap-2">
                <FormControl>
                  <Checkbox
                    name={field.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>
                  Do you agree to our{" "}
                  <Button variant="link" asChild className="inline p-0">
                    <Link href="/tos" target="_blank">
                      Terms of Service
                    </Link>
                  </Button>{" "}
                  and{" "}
                  <Button variant="link" asChild className="inline p-0">
                    <Link href="/privacy" target="_blank">
                      Privacy Policy
                    </Link>
                  </Button>
                  ?
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Go to App</Button>
      </form>
    </Form>
  );
}
