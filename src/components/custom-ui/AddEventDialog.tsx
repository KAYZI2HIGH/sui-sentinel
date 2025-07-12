/* eslint-disable */
"use client";

import { z } from "zod";
import { FormDialog } from "./FormDialog";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { CirclePlus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addEvent } from "@/lib/actions";

const WEB3_EVENT_TEMPLATES = {
  "SUI Transfer": {
    targetModule: "0x2::coin::transfer",
    defaults: { receiver: "", sender: "" },
    //eslint-disable-next-line
    validate: (data: any) => {
      if (!data.sender && !data.receiver) {
        return "Either sender or receiver must be provided.";
      }
      return null;
    },
  },
  "NFT Mint": {
    targetModule: "0x3::nft::mint",
    defaults: { creator: "", smartContract: "" },
    //eslint-disable-next-line
    validate: (data: any) => {
      if (!data.creator && !data.smartContract) {
        return "Either creator or smartContract must be provided.";
      }
      return null;
    },
  },
  Custom: {
    targetModule: "",
    defaults: { sender: "", receiver: "", creator: "", smartContract: "" },
    validate: () => null,
  },
} as const;

const WEB2_EVENT_TEMPLATES = {
  Error: {
    slug: "error-log",
  },
  Payment: {
    slug: "payment-success",
  },
  Custom: {
    slug: "",
  },
} as const;

const baseSchema = z.object({
  name: z.string().min(1, "Event name is required"),
  useCurrentProject: z.boolean(),
  projectId: z.string().min(1, "Project is required"),
  eventType: z.string().min(1, "Event type is required"),
  sourceType: z.enum(["web2", "web3"]),
  active: z.boolean(),
  description: z.string().optional(),
  targetModule: z.string(),
  slug: z.string(),
});

export function AddEventDialog({
  currentProjectId,
  currentProjectType,
  allProjects,
}: {
  currentProjectId: string;
  currentProjectType: "web2" | "web3";
  allProjects: Project[];
}) {
  const [selectedType, setSelectedType] = useState<"web2" | "web3">(
    currentProjectType
  );
  const [formError, setFormError] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { mutate: createEvent } = useMutation({
    mutationFn: (data: NewCustomEvent) => addEvent(data),
    onSuccess: () => {
      toast.success("Event created!");
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong.");
    },
  });

  return (
    <FormDialog
      schema={baseSchema}
      defaultValues={{
        name: "",
        useCurrentProject: true,
        projectId: currentProjectId,
        eventType: selectedType === "web3" ? "SUI Transfer" : "Error",
        targetModule:
          selectedType === "web3"
            ? WEB3_EVENT_TEMPLATES["SUI Transfer"].targetModule
            : "",
        slug: selectedType === "web2" ? WEB2_EVENT_TEMPLATES["Error"].slug : "",
        sourceType: selectedType,
        active: true,
        description: "",
      }}
      title="New Event"
      trigger={
        <CirclePlus
          className="cursor-pointer"
          size={18}
        />
      }
      onSubmit={(data, close) => {
        setFormError(null);

        if (selectedType === "web3") {
          const validator =
            WEB3_EVENT_TEMPLATES[
              data.eventType as keyof typeof WEB3_EVENT_TEMPLATES
            ]?.validate;
          const validationError = validator?.(data);
          if (validationError) {
            setFormError(validationError);
            return;
          }
        }

        const payload: NewCustomEvent = {
          name: data.name,
          project_id: data.projectId,
          type: data.eventType,
          source_type: data.sourceType,
          active: data.active,
          target_module: data.targetModule,
          slug: data.slug,
          description: data.description,
        };

        createEvent(payload, {
          onSuccess: () => {
            toast.success("Event created!");
            queryClient.invalidateQueries({ queryKey: ["events"] });
            close();
          },
          onError: (err) => {
            if (err instanceof Error) {
              toast.error(err.message);
            } else {
              toast.error("Something went wrong.");
            }
          },
        });
      }}
    >
      {(form) => {
        const useCurrent = form.watch("useCurrentProject");
        const eventType = form.watch("eventType");
        const selectedProjectId = form.watch("projectId");

        const templateMap = useMemo(() => {
          return selectedType === "web3"
            ? WEB3_EVENT_TEMPLATES
            : WEB2_EVENT_TEMPLATES;
        }, [selectedType]);

        const template = useMemo(() => {
          return templateMap[eventType as keyof typeof templateMap];
        }, [templateMap, eventType]);

        useEffect(() => {
          if (!useCurrent) {
            const selectedProject = allProjects.find(
              (p) => p.id === selectedProjectId
            );
            if (selectedProject) {
              setSelectedType(selectedProject.type as "web2" | "web3");
              form.setValue(
                "sourceType",
                selectedProject.type as "web2" | "web3"
              );
              form.setValue(
                "eventType",
                selectedProject.type === "web3" ? "SUI Transfer" : "Error"
              );
            }
          } else {
            setSelectedType(currentProjectType);
            form.setValue("sourceType", currentProjectType);
          }
        }, [selectedProjectId, useCurrent]);

        useEffect(() => {
          if (
            selectedType === "web3" &&
            template &&
            "targetModule" in template &&
            template.targetModule !== undefined
          ) {
            form.setValue("targetModule", template.targetModule);
            const defaults =
              (
                template as (typeof WEB3_EVENT_TEMPLATES)[keyof typeof WEB3_EVENT_TEMPLATES]
              ).defaults || {};
            Object.entries(defaults).forEach(([k, v]) => {
              form.setValue(k as keyof typeof baseSchema.shape, v);
            });
          } else if (
            selectedType === "web2" &&
            template &&
            "slug" in template &&
            template.slug !== undefined
          ) {
            form.setValue("slug", template.slug);
          }
        }, [eventType, selectedType, template]);

        const renderFields =
          selectedType === "web3" && "defaults" in (template || {})
            ? Object.keys(
                (
                  template as (typeof WEB3_EVENT_TEMPLATES)[keyof typeof WEB3_EVENT_TEMPLATES]
                ).defaults || {}
              )
            : [];

        return (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Event Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Track wallet transfer"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="useCurrentProject"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(v) => {
                        field.onChange(v);
                        if (v) form.setValue("projectId", currentProjectId);
                      }}
                    />
                  </FormControl>
                  <FormLabel>Use current project</FormLabel>
                </FormItem>
              )}
            />

            {!useCurrent && (
              <FormField
                control={form.control}
                name="projectId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Select Project <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Choose project" />
                        </SelectTrigger>
                        <SelectContent>
                          {allProjects.map((p) => (
                            <SelectItem
                              key={p.id}
                              value={p.id}
                            >
                              {p.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="eventType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Event Type <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(templateMap).map((key) => (
                          <SelectItem
                            key={key}
                            value={key}
                          >
                            {key}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedType === "web3" ? (
              <>
                <FormField
                  control={form.control}
                  name="targetModule"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Target Module <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. 0x2::coin::transfer"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {renderFields.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {renderFields.map((key) => (
                      <FormField
                        key={key}
                        control={form.control}
                        name={key as any}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="capitalize">{key}</FormLabel>
                            <FormControl>
                              <Input
                                placeholder={`0x${key}...`}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                )}
                {formError && (
                  <p className="text-red-500 text-sm">{formError}</p>
                )}
              </>
            ) : (
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Slug <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. payment-success"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g. Track wallet activity or error logs"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel>Activate Event</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        );
      }}
    </FormDialog>
  );
}
