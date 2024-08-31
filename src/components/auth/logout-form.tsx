import { LogOut } from "lucide-react";

import { logoutAction } from "~/actions/auth";
import { Button } from "~/components/ui/button";

export function LogoutForm() {
  return (
    <form action={logoutAction}>
      <Button variant="destructive" className="gap-2">
        <LogOut size={16} />
        Logout
      </Button>
    </form>
  );
}
