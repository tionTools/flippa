# PROJECT_CONTEXT.md
> Context restore point for AI assistant. Read this first when starting a new session.

---

## 1. What This Project Is

A **test assignment** — a Flippa-inspired marketplace demo for buying and selling digital businesses (SaaS, apps, online assets). The goal is to demonstrate professional full-stack product thinking: clean architecture, real data layer, reusable UI, dashboard UX. Not a production app, but built as if it were one.

**Product direction:** a two-sided marketplace with a public-facing listing site and a seller dashboard. Think Flippa.com, but simplified.

---

## 2. Architectural Approach

**Core principle:** clean separation of concerns, no premature abstraction, no duplication.

### Public vs Dashboard
- **Public** (`/`, `/projects`, `/projects/:id`): read-only, uses `MainLayout.vue` with `Header` + `Footer`
- **Dashboard** (`/dashboard/*`): authenticated-only, uses `DashboardLayout.vue` with `Sidebar`
- Auth guard is on the router level (`beforeEach`), uses Clerk

### Layout system
- `src/layouts/MainLayout.vue` — wraps all public pages
- `src/layouts/DashboardLayout.vue` — wraps all dashboard pages
- Never mix layout logic into pages themselves

### Component hierarchy
- `src/pages/` — smart (data-fetching) components, one per route
- `src/components/` — domain components (project cards, forms, sections)
- `src/components/shared/` — cross-domain reusable components (AppLogo, ProjectImage, etc.)
- `src/shared/ui/` — pure UI kit (BaseInput, BaseSelect, BaseTextarea, BaseTabs, BasePagination, StatItem, StepItem, etc.)
- `src/shared/mocks/` — mock data (being phased out as Supabase is connected)

**Rule:** if something is used in 2+ places, it lives in `shared/`. If it's domain-specific, it lives in `components/<domain>/`.

---

## 3. UI Approach

**Style:** professional, clean, minimal noise. No gradients for gradients' sake. Tailwind only.

- **Cards:** `border border-gray-200 rounded-xl`, hover `border-gray-400`
- **Forms:** white `rounded-2xl border border-gray-100 p-6` sections
- **Tables:** in dashboard only, not in public pages
- **Images:** always via `ProjectImage` component, parent sets the aspect ratio container
- **Navigation (public):** dark indigo-950 header with blur — `bg-indigo-950/90 backdrop-blur-md`
- **Footer:** same dark indigo-950 palette as header
- **Dashboard sidebar:** separate styling, lighter, professional control-panel feel

### Dark/light variants
Some shared components have a `variant="light"` prop for use on dark backgrounds:
- `AppLogo` — `variant="light"` for header/footer
- `StatItem` — `variant="light"` for dark sections
- `StepItem` — `variant="light"` for HowItWorks on dark bg

Do not add new color variants without a real need.

---

## 4. Data Layer

### Source of truth
- Started with mock data (`src/shared/mocks/projects.ts`)
- Public pages + dashboard now use **Supabase** as source of truth
- Mock data still used in some older components (being phased out gradually)

### Types
- `ProjectRecord` — snake_case, matches DB schema exactly (`src/types/project.ts`)
- `Project` — camelCase mock type (`src/shared/mocks/projects.ts`), kept for backward compat with older components
- `toProject(r: ProjectRecord): Project` — mapping function used in smart components when `ProjectCard` needs mock-shaped data

### Supabase rules
- API calls live in `src/api/projects.ts`
- Always use `.order("created_at", { ascending: false }).order("id", { ascending: true })` for stable pagination — rows inserted at the same time have identical `created_at`, secondary sort on `id` prevents duplicates across pages
- Pagination uses `.range(from, to)` with `{ count: 'exact' }` for total count
- IDs are UUIDs — used directly in routes (`/projects/:id`) and API calls
- `user_id` is **not used** at this stage — all projects are globally visible, no per-user filtering yet (intentional simplification)

### Schema (table: `projects`)
Key fields: `id` (uuid), `title`, `category`, `status`, `short_description`, `full_description`, `asking_price`, `monthly_revenue`, `monthly_profit`, `monthly_traffic`, `total_users`, `app_installs`, `growth_rate`, `founded_year`, `team_size`, `tech_stack`, `monetization_model`, `business_model`, `what_is_included`, `growth_opportunities`, `risks_and_notes`, `image_url`, `is_featured`, `created_at`, `updated_at`

---

## 5. Forms

- Create and edit use the **same form component**: `src/components/project/ProjectForm.vue`
- Props: `mode: 'create' | 'edit'`, `initialValues?`, `loading?`
- Emits: `submit: [data: ProjectFormData]`, `cancel: []`
- Validation via **Zod** (`src/schemas/project.ts`) — `projectSchema.safeParse()`
- String→number coercion via `z.preprocess` in schema
- `EMPTY_FORM_VALUES` in `src/types/project.ts` — default form state
- Never duplicate the form structure between create/edit pages

---

## 6. Lists & Pagination

- `BaseTabs` + `BasePagination` from `src/shared/ui/` — reuse everywhere
- Category tabs use `src/shared/mocks/categories.ts` — same list across public and dashboard
- Page-level state manages `activePage` and `activeCategory`, fetches on watch
- `ProjectCard` is the standard card — don't create parallel card implementations
- `ProjectListSection` renders a grid of cards — use it for simple static lists
- For smart lists (own fetch + filters + pagination), write a dedicated page or section component

---

## 7. Images

- **Single component:** `src/components/shared/ProjectImage.vue`
- Root is `absolute inset-0` — **parent must have `relative` + explicit size**
- Standard container pattern: `<div class="relative aspect-video w-full overflow-hidden rounded-xl">`
- With `src`: renders `<img class="w-full h-full object-cover object-center">`
- Without `src`: gray bg + `ImageIcon` placeholder
- Do not render the image container at all if no image and context doesn't need a placeholder (e.g., project hero hides the block entirely when `image_url` is null)

---

## 8. Dashboard

- Separate layout: `DashboardLayout.vue` with `AppSidebar`
- Dashboard pages: `DashboardPage`, `MyListingsPage`, `CreateListingPage`, `EditListingPage`
- Uses `ProjectRecord` directly — no `toProject()` mapping needed in dashboard
- `DashboardProjectsTable` accepts `projects: ProjectRecord[]`
- Mobile behavior: sidebar collapses (hamburger), main content full-width — implement with `v-show`/`v-if` toggle on sidebar

---

## 9. Auth

- **Clerk** is the auth provider (credentials hardcoded in `src/lib/clerk.ts` — do not move to `.env`)
- **Supabase** credentials also hardcoded (same reason — test assignment, `.env` not used)
- Auth guard in router: checks `useAuth()` before entering `/dashboard/*`
- No server-side auth — purely client-side for this demo

---

## 10. Analytics & Insights (demo-only)

- `ProjectAnalyticsSection` and `ProjectInsightsSection` are on the project detail page
- Analytics data is **generated**, not real: `trend(endValue)` function in `ProjectPage.vue` creates 12-month series from real metrics
- `insights` object is static demo data — not stored in DB
- These sections are explicitly **demo-only** — do not try to persist this data

---

## 11. Rules for Continuing Work

### Don't break
- `ProjectImage` positioning contract (parent must be `relative`)
- `toProject()` mapping — needed as long as `ProjectCard` uses mock `Project` type
- Stable pagination sort (dual `order` on `created_at` + `id`)
- `variant="light"` on shared components in dark contexts
- Router `scrollBehavior` for hash anchor navigation
- `src/global.css` `html { scroll-behavior: smooth }`

### Don't rewrite
- The form component — it works, extend via props if needed
- `ProjectImage` — the positioning approach is intentional
- Auth setup — Clerk integration is complete enough for this demo

### When adding new features
1. Check if a shared UI component already exists before creating a new one
2. Check if an API function already exists in `src/api/projects.ts`
3. Smart data fetching belongs in pages, not in display components
4. New pages go in `src/pages/<route>/<PageName>.vue`
5. New reusable components go in `src/components/shared/` or `src/shared/ui/`
6. Maintain the same visual style — don't introduce new color palettes

### Intentional simplifications
- No real file upload (image URL field only) — "coming soon" placeholder in form
- No real offer/messaging system — placeholders in dashboard nav
- No server-side rendering
- No i18n
- `user_id` filtering skipped — all listings are global
- Time-series analytics are generated, not real

---

## 12. Key File Locations

```
src/
  api/projects.ts          # All Supabase queries
  types/project.ts         # ProjectRecord, ProjectFormValues, EMPTY_FORM_VALUES
  schemas/project.ts       # Zod schema for form validation
  shared/
    ui/                    # BaseInput, BaseSelect, BaseTextarea, BaseTabs, BasePagination, StatItem, StepItem
    mocks/
      projects.ts          # Mock Project type + data (legacy, being phased out)
      categories.ts        # Shared category list
  components/
    shared/
      AppLogo.vue          # variant="light" for dark bg
      ProjectImage.vue     # Universal image with placeholder
    project/
      ProjectCard.vue      # Standard listing card
      ProjectForm.vue      # Shared create/edit form
      ProjectHeroBlock.vue # Detail page hero
    header/Header.vue      # Dark indigo-950 nav + ticker
    Footer.vue             # Dark indigo-950 footer
  layouts/
    MainLayout.vue         # Public layout
    DashboardLayout.vue    # Dashboard layout
  pages/
    home/HomePage.vue
    projects/ProjectsPage.vue
    project/ProjectPage.vue
    dashboard/
      DashboardPage.vue
      my-listings/MyListingsPage.vue
      create-listing/CreateListingPage.vue
      edit-listing/EditListingPage.vue
  router/index.ts          # Routes + auth guard + scrollBehavior
  global.css               # scroll-behavior: smooth
```
