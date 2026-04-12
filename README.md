# Business Marketplace Demo

This repository contains a test assignment project: a marketplace-style web application for listing, browsing, and managing digital businesses and online projects.

The project is inspired by platforms like Flippa in terms of structure and user flows, but it is implemented as a standalone product with its own layout, UI, and dashboard logic.

## About the assignment

The goal of this test task was to build a realistic demo of a marketplace where users can:

- browse projects on the public website
- open a single project page with detailed business information
- access a dashboard
- create and edit project listings
- work with categories, pagination, and project management flows
- simulate a professional product environment with real database integration

This project is not intended to be a production-ready marketplace.
It is a technical demo focused on architecture, reusable components, data flow, and realistic product presentation.

## Main features

### Public website

The public-facing part of the application includes:

- Home page
- Projects page
- Single project page

#### Home page
The home page is designed to present the product as a serious marketplace for buying and selling digital businesses.

It includes:

- header with navigation
- hero section
- featured projects section
- category tabs
- supporting marketing sections
- footer
- real project data from Supabase

#### Projects page
The `/projects` page displays real project records from Supabase.

Implemented flows:

- project list rendering from database
- filtering by category
- pagination
- navigation to project details
- consistent reusable listing components

#### Project details page
The single project page displays detailed information about a selected project.

Implemented flows:

- loading project data by real database id
- rendering structured project information
- showing financial and business details
- displaying image / placeholder
- using the same project data source as the rest of the site

Some analytical sections may still use demo-style placeholder data if they are not yet persisted in the database.

---

## Dashboard

The application includes a separate dashboard area with its own layout.

This area is intended to simulate the seller/admin side of the marketplace.

Implemented dashboard flows include:

- dashboard overview page
- my listings page
- activity page placeholder
- create project page
- edit project page

### Dashboard overview
The default dashboard page is a summary screen designed to provide a quick overview of project activity.

It includes:

- KPI/stat cards
- charts / summary blocks
- recent activity section
- quick access to user projects

### My Listings
The `My Listings` page is focused on project management.

Implemented flows:

- real project list from Supabase
- category tabs
- pagination
- table/listing view
- navigation to edit page

### Create Project
Users can create a new project using a structured form.

Implemented flows:

- reusable form component
- validation through Zod
- submission to Supabase
- support for project metadata, metrics, and image URL

### Edit Project
Users can edit an existing project using the same form component as the create page.

Implemented flows:

- loading a project by id
- prefilled values
- update flow through Supabase
- shared form logic with create page

---

## Data and validation

The project uses Supabase as the main data source for projects.

At this stage:

- project records are stored in the `projects` table
- the app uses real database ids (UUID)
- listing pages and edit pages work with real records
- form validation is implemented with Zod

This project originally started with mock data, but the current state already includes real Supabase-backed flows for the main project entity.

## Reusable architecture

A major part of the task was to avoid duplicated UI and logic.

The project is built around reusable parts such as:

- shared layout structure
- reusable project cards / listing blocks
- shared category tabs
- shared pagination
- shared project form for create/edit
- shared image rendering strategy with fallback placeholder support

## Notes

This is a demo / test assignment project.

Some parts of the application are intentionally simplified:

- authentication and ownership rules may be relaxed depending on the current review/demo mode
- some pages may still contain placeholder sections
- some advanced analytics blocks may still be presentation-focused
- some content is seeded/demo content intended to simulate a realistic marketplace

The goal of this repository is to demonstrate:
- component architecture
- routing structure
- dashboard flows
- CRUD integration
- Supabase integration
- validation and form handling
- UI consistency across public and dashboard sections

## Tech stack

Main technologies used in this project:

- Vue 3
- Vite
- TypeScript
- Vue Router
- Pinia
- Zod
- Supabase

Package manager: **pnpm**

## Project setup

Install dependencies:

```sh
pnpm install
```

Run development server:

```sh
pnpm dev
```

Build for production:

```sh
pnpm build
```

Run linting:

```sh
pnpm lint
```

## Environment

To run the project locally, configure the required environment variables for Supabase.

Example values typically include:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_KEY`

Create a local `.env` file if needed and provide valid Supabase credentials for your project.
