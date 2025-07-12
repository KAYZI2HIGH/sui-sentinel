"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { Loader2, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const LogOutBtn = ({ className }: { className?: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Button
      variant="ghost"
      onClick={async () => {
        setIsLoading(true);
        await signOut({
          callbackUrl: "/auth",
        });
        setIsLoading(false);
      }}
      disabled={isLoading}
      className={cn("gap-2", className)}
    >
      {isLoading ? <Loader2 className="animate-spin" /> : <LogOut size={16} />}
      Logout
    </Button>
  );
};

export default LogOutBtn;
