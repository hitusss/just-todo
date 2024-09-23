import * as React from "react";

import { getNameShortcut } from "~/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

export const UserAvatar = React.forwardRef<
  React.ElementRef<typeof Avatar>,
  React.ComponentPropsWithoutRef<typeof Avatar> & {
    image?: string;
    name: string;
  }
>(({ image, name, ...props }, ref) => (
  <Avatar ref={ref} {...props}>
    <AvatarImage src={image} />
    <AvatarFallback>{getNameShortcut(name)}</AvatarFallback>
  </Avatar>
));
UserAvatar.displayName = "UserAvatar";
