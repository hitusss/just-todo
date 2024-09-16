"use client";

import * as React from "react";
import { LogOut } from "lucide-react";
import { useAction } from "next-safe-action/hooks";

import { logoutAction } from "~/actions/auth";
import { cn } from "~/lib/utils";
import { Button, type ButtonProps } from "~/components/ui/button";

export const LogoutForm = React.forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, "children" | "asChild" | "onClick">
>(({ className, variant = "destructive", ...props }, ref) => {
  const logout = useAction(logoutAction);
  return (
    <Button
      ref={ref}
      onClick={() => logout.execute()}
      variant={variant}
      className={cn("gap-2", className)}
      {...props}
    >
      <LogOut className="h-4 w-4" />
      Logout
    </Button>
  );
});
LogoutForm.displayName = "LogoutForm";
