import { supabase } from "@/utils/supabase";
import type { ProjectRecord } from "@/types/project";
import type { ProjectFormData } from "@/schemas/project";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function splitLines(s: string): string[] {
  return s
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function splitCommas(s: string): string[] {
  return s
    .split(",")
    .map((l) => l.trim())
    .filter(Boolean);
}

function toRecord(
  data: ProjectFormData,
): Omit<ProjectRecord, "id" | "created_at" | "updated_at"> {
  return {
    title: data.title,
    category: data.category as ProjectRecord["category"],
    status: data.status,
    short_description: data.short_description || "",
    full_description: data.full_description || "",

    asking_price: data.asking_price ?? null,
    monthly_revenue: data.monthly_revenue ?? null,
    monthly_profit: data.monthly_profit ?? null,
    revenue_multiple: data.revenue_multiple ?? null,
    monetization_model: data.monetization_model || "",
    business_model: data.business_model || "",

    monthly_traffic: data.monthly_traffic ?? null,
    total_users: data.total_users ?? null,
    app_installs: data.app_installs ?? null,
    growth_rate: data.growth_rate ?? null,
    founded_year: data.founded_year ?? null,
    team_size: data.team_size ?? null,
    tech_stack: splitCommas(data.tech_stack ?? ""),

    what_is_included: splitLines(data.what_is_included ?? ""),
    growth_opportunities: data.growth_opportunities || "",
    risks_and_notes: data.risks_and_notes || "",

    image_url: data.image_url || "",
    is_featured: data.is_featured,
  };
}

// ─── API ──────────────────────────────────────────────────────────────────────

export async function createProject(data: ProjectFormData): Promise<ProjectRecord> {
  const { data: result, error } = await supabase
    .from("projects")
    .insert(toRecord(data))
    .select()
    .single();

  if (error) throw error;
  return result as ProjectRecord;
}

export async function updateProject(
  id: string,
  data: ProjectFormData,
): Promise<ProjectRecord> {
  const { data: result, error } = await supabase
    .from("projects")
    .update(toRecord(data))
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return result as ProjectRecord;
}

export async function getProjectById(id: string): Promise<ProjectRecord> {
  const { data, error } = await supabase.from("projects").select("*").eq("id", id).single();

  if (error) throw error;
  return data as ProjectRecord;
}

export interface ProjectsPage {
  data: ProjectRecord[];
  total: number;
}

export async function getProjectsPage({
  page,
  pageSize,
  category,
}: {
  page: number;
  pageSize: number;
  category?: string;
}): Promise<ProjectsPage> {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("projects")
    .select("*", { count: "exact" })
    .range(from, to)
    .order("created_at", { ascending: false })
    .order("id", { ascending: true });

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error, count } = await query;

  if (error) throw error;
  return { data: (data ?? []) as ProjectRecord[], total: count ?? 0 };
}

export async function getHomeProjects(category?: string): Promise<ProjectRecord[]> {
  let query = supabase
    .from("projects")
    .select("*")
    .order("is_featured", { ascending: false })
    .order("updated_at", { ascending: false })
    .limit(3);

  if (category && category !== "all") {
    query = query.eq("category", category);
  }

  const { data, error } = await query;

  if (error) throw error;
  return (data ?? []) as ProjectRecord[];
}
