"use client";

import { LogOut } from "lucide-react";
import { useAction } from "next-safe-action/hooks";

import { logoutAction } from "~/actions/auth";
import { Button } from "~/components/ui/button";

export function LogoutForm() {
  const logout = useAction(logoutAction);
  return (
    <Button onClick={() => logout.execute()} className="gap-2">
      <LogOut className="h-4 w-4" />
      Logout
    </Button>
  );
}
