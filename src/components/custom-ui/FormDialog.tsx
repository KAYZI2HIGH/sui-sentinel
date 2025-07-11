"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import CustomTooltip from "./CustomTooltip";

interface FormDialogProps<T extends z.ZodTypeAny> {
  schema: T;
  defaultValues: z.infer<T>;
  trigger: React.ReactNode;
  title: string;
  onSubmit: (values: z.infer<T>) => void;
  children:
    | ((form: UseFormReturn<z.infer<T>>) => React.ReactNode)
    | React.ReactNode;
  submitLabel?: string;
}


export function FormDialog<T extends z.ZodTypeAny>({
  schema,
  defaultValues,
  trigger,
  title,
  onSubmit,
  children,
  submitLabel = "Save",
}: FormDialogProps<T>) {
  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <Dialog>
      <CustomTooltip text={title}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
      </CustomTooltip>
      <DialogContent className="sm:max-w-lg max-h-[70%] overflow-y-auto hide-scrollbar">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >
            {typeof children === "function" ? children(form) : children}

            <DialogFooter>
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
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
