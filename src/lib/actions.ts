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

export async function addProject(data: Partial<Project>, userId: string): Promise<Project> {
  const { data: newProject, error } = await supabase
    .from("projects")
    .insert([{ ...data, user_id: userId }])
    .select()
    .single();

  if (error) throw new Error(error.message);

  return newProject;
}

export const addEvent = async (event: NewCustomEvent) => {
  const { data, error } = await supabase
    .from("events")
    .insert(event)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};
