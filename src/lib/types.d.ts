type EventType = {
  id: string;
  project_id: string;
  name: string;
  type: string;
  source_type: "web2" | "web3";
  slug?: string | null;
  target_module?: string | null;
  description?: string | null;
  active: boolean;
  created_at: string;
  sender?: string | null;
  receiver?: string | null;
  creator?: string | null;
  smartContract?: string | null;
};

type Project = {
  id: string;
  user_id: string;
  name: string;
  type: "web2" | "web3";
  description?: string;
  network?: string;
  created_at: string;
};

type NewProject = Omit<Project, "id" | "created_at" | "user_id">;
type NewCustomEvent = Omit<EventType, "id" | "created_at">;
