import { ExitIcon } from "@radix-ui/react-icons";

import { logoutAction } from "~/actions/auth";
import { Button } from "~/components/ui/button";

export function LogoutForm() {
  return (
    <form action={logoutAction}>
      <Button variant="destructive" className="gap-2">
        <ExitIcon />
        Logout
      </Button>
    </form>
  );
}
