"use client";

import { FormDialog } from "./FormDialog";
import { z } from "zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { cn } from "@/lib/utils";
import CustomTooltip from "./CustomTooltip";

const projectSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().optional(),
  type: z.enum(["web2", "web3"]),
  network: z.string().optional(),
  apiUrl: z.string().optional(),
});

export function AddProjectDialog() {
  return (
    <FormDialog
      schema={projectSchema}
      defaultValues={{
        name: "",
        description: "",
        type: "web3",
        network: "",
        apiUrl: "",
      }}
      title="New Project"
      trigger={
        <CirclePlus
          className="cursor-pointer"
          size={18}
        />
      }
      onSubmit={(data) => console.log("Submitted:", data)}
    >
      {(form) => {
        const projectType = form.watch("type");

        return (
          <>
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Project name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Description{" "}
                    <span className="text-muted-foreground text-sm">
                      (optional)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Optional description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Project Type - Styled like cards */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Project Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex flex-col sm:flex-row gap-3"
                    >
                      {["web2", "web3"].map((val) => (
                        <FormItem
                          key={val}
                          className={cn(
                            "flex items-center gap-3 border rounded-md px-4 py-2 cursor-pointer",
                            field.value === val
                              ? "border-primary bg-muted"
                              : "border-muted"
                          )}
                        >
                          <FormControl>
                            <RadioGroupItem
                              value={val}
                              className="sr-only"
                            />
                          </FormControl>
                          <FormLabel className="cursor-pointer capitalize">
                            {val}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Conditional Fields */}
            {projectType === "web3" && (
              <FormField
                control={form.control}
                name="network"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Network{" "}
                      <span className="text-muted-foreground text-sm">
                        (optional)
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select network" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mainnet">Mainnet</SelectItem>
                          <SelectItem value="testnet">Testnet</SelectItem>
                          <SelectItem value="devnet">Devnet</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {projectType === "web2" && (
              <FormField
                control={form.control}
                name="apiUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      API Endpoint{" "}
                      <span className="text-muted-foreground text-sm">
                        (optional)
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://api.myapp.com/ping"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </>
        );
      }}
    </FormDialog>
  );
}
