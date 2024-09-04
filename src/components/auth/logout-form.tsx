"use client";

import { ExitIcon } from "@radix-ui/react-icons";
import { useAction } from "next-safe-action/hooks";

import { logoutAction } from "~/actions/auth";
import { Button } from "~/components/ui/button";

export function LogoutForm() {
  const logout = useAction(logoutAction);
  return (
    <Button onClick={() => logout.execute()} className="gap-2">
      <ExitIcon />
      Logout
    </Button>
  );
}
