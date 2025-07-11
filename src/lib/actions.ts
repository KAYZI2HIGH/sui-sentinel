import { supabase } from "@/supabaseClient";

export const getProjects = async (userId: string): Promise<Project[]> => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    throw new Error(`Failed to fetch: ${error.message}`);
  }

  return data ?? [];
};

export const getEvents = async (projectId: string): Promise<EventType[]> => {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("project_id", projectId);

  if (error) {
    throw new Error(`Failed to fetch: ${error.message}`);
  }

  return data ?? [];
};
