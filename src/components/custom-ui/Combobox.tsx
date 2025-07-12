"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import Link from "next/link";

type ItemType = { url: string; title: string };

export function ComboBox({
  children,
  item,
  className,
}: {
  children: React.ReactNode;
  item: ItemType[];
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useIsMobile();
  const [selectedStatus, setSelectedStatus] = React.useState<ItemType | null>(
    null
  );

  if (!isDesktop) {
    return (
      <Popover
        open={open}
        onOpenChange={setOpen}
      >
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent
          className="w-[200px] p-0"
          align="start"
        >
          <StatusList
            selectedStatus={selectedStatus}
            items={item}
            setOpen={setOpen}
            setSelectedStatus={setSelectedStatus}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
    >
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "justify-between bg-transparent! border-none mt-2",
            className
          )}
          asChild
        >
          {children}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusList
            selectedStatus={selectedStatus}
            items={item}
            setOpen={setOpen}
            setSelectedStatus={setSelectedStatus}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function StatusList({
  items,
  setOpen,
  selectedStatus,
  setSelectedStatus,
}: {
  items: ItemType[];
  setOpen: (open: boolean) => void;
  selectedStatus: ItemType | null;
  setSelectedStatus: (status: ItemType | null) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter status..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup defaultValue={selectedStatus?.title}>
          {items.map((status) => (
            <CommandItem
              key={status.title}
              value={status.title}
              onSelect={(value) => {
                setSelectedStatus(
                  items.find((priority) => priority.title === value) || null
                );
                setOpen(false);
              }}
              asChild
            >
              <Link href={status.url}>{status.title}</Link>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
