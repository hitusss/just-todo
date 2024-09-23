import { type Session } from "next-auth";

import { UserAvatar } from "./avatar";

export function UserPresents({
  user,
}: {
  user: Pick<Session["user"], "name" | "image" | "username">;
}) {
  return (
    <div className="flex items-center gap-2 px-2 py-1.5 text-left text-sm transition-all">
      <UserAvatar name={user.name ?? ""} image={user.image} />
      <div className="grid flex-1 gap-0.5 overflow-hidden">
        <p className="truncate font-medium leading-none">{user.name}</p>
        <p className="truncate text-xs leading-none text-muted-foreground">
          {user.username}
        </p>
      </div>
    </div>
  );
}
