"use client";

import { useSession } from "next-auth/react";
import { notFound, useRouter } from "next/navigation";
import Navbar from "@/components/custom-ui/Navbar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProject } from "@/lib/actions";
import { AlertTriangle, CheckCircle } from "lucide-react";

const schema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().optional(),
  type: z.enum(["web2", "web3"]),
  network: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const CreateNewProjectPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      type: "web3",
      network: "",
    },
  });

  const { mutate: createProject, isPending } = useMutation({
    mutationFn: (data: FormValues) => addProject(data, session!.user.id),
    onSuccess: (project) => {
     toast.success("Project created!", {
       icon: <CheckCircle className="text-white" size={18} />,
     });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      router.push(`/dashboard/${project.id}`);
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong.", {
        description: "Please try again or contact support.",
        icon: <AlertTriangle className="text-white" />,
      });
    },
  });

  if (status === "loading") return null;
  if (!session?.user) return notFound();

  return (
    <>
      <Navbar session={session} />
      <div className="w-full px-4 mt-10">
        <div className="max-w-[600px] mx-auto border rounded-lg p-6 shadow-sm bg-background">
          <h2 className="text-2xl font-semibold mb-4">
            Create Your First Project
          </h2>

          <form
            onSubmit={form.handleSubmit((values) => createProject(values))}
            className="space-y-5"
          >
            <div>
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                placeholder="My Cool App"
                {...form.register("name")}
              />
              {form.formState.errors.name && (
                <p className="text-sm text-red-500 mt-1">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea
                id="description"
                placeholder="Describe what this project is about"
                {...form.register("description")}
              />
            </div>

            <div>
              <Label htmlFor="type">Project Type</Label>
              <select
                id="type"
                {...form.register("type")}
                className="w-full mt-1 px-3 py-2 rounded-md border bg-background text-foreground"
              >
                <option value="web2">Web2</option>
                <option value="web3">Web3</option>
              </select>
            </div>

            {form.watch("type") === "web3" && (
              <div>
                <Label htmlFor="network">Network (optional)</Label>
                <Input
                  id="network"
                  placeholder="e.g. mainnet, testnet"
                  {...form.register("network")}
                />
              </div>
            )}

            <Button
              type="submit"
              disabled={isPending}
              className="w-full"
            >
              {isPending ? "Creating..." : "Create Project"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateNewProjectPage;
