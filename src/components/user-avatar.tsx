import { User } from "@prisma/client";
import { AvatarProps } from "@radix-ui/react-avatar";

import { Icons } from "components/icons";
import { Avatar } from "components/ui/avatar";

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "image" | "name">;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      <Avatar.Image alt="Picture" src={user.image} />
      <Avatar.Fallback>
        <span className="sr-only">{user.name}</span>
        <Icons.user className="h-6 w-6" />
      </Avatar.Fallback>
    </Avatar>
  );
}
