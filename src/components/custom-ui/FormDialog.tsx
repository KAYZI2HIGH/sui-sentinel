"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import * as z from "zod";
import CustomTooltip from "./CustomTooltip";

interface FormDialogProps<T extends z.ZodTypeAny> {
  schema: T;
  defaultValues: z.infer<T>;
  trigger: React.ReactNode;
  title: string;
  onSubmit: (values: z.infer<T>, close: () => void) => void;
  children:
    | ((form: UseFormReturn<z.infer<T>>) => React.ReactNode)
    | React.ReactNode;
  submitLabel?: string;
  action?: React.ReactNode;
}

export function FormDialog<T extends z.ZodTypeAny>({
  schema,
  defaultValues,
  trigger,
  title,
  onSubmit,
  children,
  submitLabel = "Save",
  action,
}: FormDialogProps<T>) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleSubmit = (values: z.infer<T>) => {
    onSubmit(values, () => {
      setOpen(false);
      form.reset();
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <CustomTooltip text={title}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
      </CustomTooltip>
      <DialogContent className="sm:max-w-lg max-h-[70%] overflow-y-auto hide-scrollbar">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4 py-4"
          >
            {typeof children === "function" ? children(form) : children}

            <DialogFooter>
              {action ? (
                action
              ) : (
                <>
                  <DialogClose asChild>
                    <Button
                      variant="outline"
                      type="button"
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                  >
                    {submitLabel}
                  </Button>
                </>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
