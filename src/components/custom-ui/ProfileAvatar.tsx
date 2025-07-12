import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";

const ProfileAvatar = ({
  name,
  image,
  className,
}: {
  name: string;
  image: string;
  className?: string
}) => {
  return (
    <Avatar className={cn("size-16 rounded-md", className)}>
      <AvatarImage src={image || ""} />
      <AvatarFallback>
        {name &&
          name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

export default ProfileAvatar;
