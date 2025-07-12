"use client";

import { useQuery } from "@tanstack/react-query";
import { ChevronRight, Home, Inbox, Search, Settings2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { getEvents, getProjects } from "@/lib/actions";
import { Separator } from "../ui/separator";
import { AddEventDialog } from "./AddEventDialog";
import { AddProjectDialog } from "./AddProjectBtn";
import { ComboBox } from "./Combobox";
import { Logo } from "./HeroHeader";
import ProfileAvatarWithDropdownMenu from "./ProfileAvatarWithDropdownMenu";

const items = [
  { title: "Home", url: "#", icon: Home },
  { title: "Automation", url: "#", icon: Inbox },
  { title: "Settings", url: "#", icon: Settings2 },
];

export default function AppSidebar({
  currentProjectId,
}: {
  currentProjectId: string;
}) {
  const { data: session } = useSession();

  const {
    data: projects,
    error: projectError,
    isLoading: loadingProjects,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(session?.user.id || ""),
    enabled: !!session?.user.id,
  });

  const {
    data: events,
    error: eventsError,
    isLoading: loadingEvents,
  } = useQuery({
    queryKey: ["events", currentProjectId],
    queryFn: () => getEvents(currentProjectId),
    enabled: !!currentProjectId,
  });

  const currentProject = projects?.find((proj) => proj.id === currentProjectId);
  const comboBoxProjectItem =
    projects?.map((proj) => ({
      url: `/dashboard/${proj.id}`,
      title: proj.name,
    })) || [];
  const comboBoxEventItem =
    events?.map((event) => ({
      url: `/dashboard/${currentProjectId}/${event.id}`,
      title: event.name,
    })) || [];

  if (projectError || eventsError) {
    return (
      <div className="text-red-500 p-4 text-sm">
        Error:{" "}
        {projectError?.message ||
          eventsError?.message ||
          "Something went wrong."}
      </div>
    );
  }

  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <Link href="/">
          <Logo />
        </Link>
      </SidebarHeader>
      <SidebarContent className="mt-5 min-h-fit">
        <Separator />
        <SidebarGroup>
          <SidebarGroupLabel className="flex justify-between items-center text-[12px]">
            <p>PROJECTS</p>
            <AddProjectDialog />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {loadingProjects ? (
                <Skeleton className="h-10 w-full rounded-md" />
              ) : (
                <ComboBox
                  item={comboBoxProjectItem}
                >
                  <div className="w-full px-1 py-2 flex justify-between items-center cursor-pointer group/projects">
                    <div className="flex gap-3 items-center">
                      <div className="p-1 min-w-[30px] min-h-[25px] rounded-[3px] bg-blue-500 text-white text-[16px] flex justify-center items-center font-bold">
                        {currentProject?.name?.split(" ").map((n) => n[0])[0] ||
                          "-"}
                      </div>
                      <p className="font-bold uppercase text-md tracking-wider truncate max-w-[120px]">
                        {currentProject?.name || "Unnamed"}
                      </p>
                    </div>
                    <ChevronRight
                      size={20}
                      className="group-hover/projects:translate-x-1 transition-all duration-300"
                    />
                  </div>
                </ComboBox>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Separator />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    identifier={
                      item.title.toLowerCase() === "home"
                        ? currentProjectId
                        : item.title
                    }
                    tooltip={item.title}
                    asChild
                  >
                    <Link
                      href={item.url}
                      className="text-lg font-semibold tracking-wide"
                    >
                      <item.icon />
                      <span className="tracking-wider">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Separator />
      </SidebarContent>
      <SidebarContent className="hide-scrollbar h-full overflow-hidden">
        <SidebarGroup className="h-full">
          <SidebarGroupLabel className="flex justify-between items-center text-[12px] capitalize mb-2">
            <p>EVENTS</p>
            <div className="flex gap-3">
              <AddEventDialog
                currentProjectId={currentProjectId}
                currentProjectType={currentProject?.type || "web3"}
                allProjects={projects!}
              />
              <ComboBox
                item={comboBoxEventItem}
                className="w-fit p-0 h-fit mt-0"
              >
                <Search
                  size={18}
                  className="cursor-pointer"
                />
              </ComboBox>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent className="h-full overflow-y-scroll hide-scrollbar">
            <SidebarMenu>
              {loadingEvents
                ? Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton
                      key={i}
                      className="h-10 w-full rounded-md mb-2"
                    />
                  ))
                : events?.map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton
                        identifier={item.name}
                        tooltip={item.name}
                        asChild
                      >
                        <Link
                          href={`/dashboard/${item.project_id}/events/${item.id}`}
                          className="text-lg font-semibold tracking-wide"
                        >
                          <div className="w-[25px] h-[25px] rounded-[3px] bg-blue-500 text-white text-[16px] flex justify-center items-center font-bold">
                            {item.name.split("").map((n) => n[0])[0]}
                          </div>
                          <span className="tracking-wide">{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="!pl-4 mt-1">
        <ProfileAvatarWithDropdownMenu session={session!} />
      </SidebarFooter>
    </Sidebar>
  );
}
