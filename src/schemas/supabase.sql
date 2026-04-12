create extension if not exists pgcrypto;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),

  -- Basic
  title text not null,
  category text not null,
  status text not null check (status in ('active', 'under-offer', 'draft')),
  short_description text not null default '',
  full_description text not null default '',

  -- Financial
  asking_price numeric(14, 2),
  monthly_revenue numeric(14, 2),
  monthly_profit numeric(14, 2),
  revenue_multiple numeric(10, 2),
  monetization_model text not null default '',
  business_model text not null default '',

  -- Metrics
  monthly_traffic integer,
  total_users integer,
  app_installs integer,
  growth_rate numeric(10, 2),
  founded_year integer,
  team_size integer,
  tech_stack text[] not null default '{}',

  -- Additional
  what_is_included text[] not null default '{}',
  growth_opportunities text not null default '',
  risks_and_notes text not null default '',

  -- Media & flags
  image_url text not null default '',
  is_featured boolean not null default false,

  -- Meta
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- Constraints
  constraint projects_title_length check (char_length(title) between 3 and 100),
  constraint projects_short_description_length check (char_length(short_description) <= 300),

  constraint projects_asking_price_positive check (
    asking_price is null or asking_price > 0
  ),
  constraint projects_monthly_revenue_non_negative check (
    monthly_revenue is null or monthly_revenue >= 0
  ),
  constraint projects_monthly_profit_non_negative check (
    monthly_profit is null or monthly_profit >= 0
  ),
  constraint projects_revenue_multiple_positive check (
    revenue_multiple is null or revenue_multiple > 0
  ),

  constraint projects_monthly_traffic_non_negative check (
    monthly_traffic is null or monthly_traffic >= 0
  ),
  constraint projects_total_users_non_negative check (
    total_users is null or total_users >= 0
  ),
  constraint projects_app_installs_non_negative check (
    app_installs is null or app_installs >= 0
  ),
  constraint projects_team_size_non_negative check (
    team_size is null or team_size >= 0
  ),

  constraint projects_growth_rate_range check (
    growth_rate is null or (growth_rate >= -100 and growth_rate <= 10000)
  ),
  constraint projects_founded_year_range check (
    founded_year is null or (founded_year >= 1900 and founded_year <= extract(year from now())::int)
  )
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_projects_set_updated_at on public.projects;

create trigger trg_projects_set_updated_at
before update on public.projects
for each row
execute function public.set_updated_at();