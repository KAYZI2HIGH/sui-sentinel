import { auth } from "@/auth";
import { Logo } from "@/components/custom-ui/HeroHeader";
import ProfileAvatar from "@/components/custom-ui/ProfileAvatar";
import { Divide } from "lucide-react";
import { notFound } from "next/navigation";
import React from "react";

const DashoardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  if (!session?.user) return notFound();

  return (
    <>
      <div className="flex w-full px-10 py-4 justify-between items-center">
        <Logo />
        <ProfileAvatar
          image={session.user.image || ""}
          name={session.user.name || ""}
        />
      </div>
      <main>{children}</main>
    </>
  );
};

export default DashoardLayout;
