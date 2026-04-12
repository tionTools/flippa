<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { ArrowRight, AlertCircle } from '@lucide/vue'
import { BaseTabs } from '@/shared/ui'
import ProjectCard from './ProjectCard.vue'
import { categories } from '@/shared/mocks/categories'
import type { Project } from '@/shared/mocks/projects'
import type { ProjectRecord } from '@/types/project'
import { getHomeProjects } from '@/api/projects'

const activeCategory = ref('all')
const projects = ref<Project[]>([])
const loading = ref(false)
const error = ref(false)

function toProject(r: ProjectRecord): Project {
  const currentYear = new Date().getFullYear()
  return {
    id: r.id,
    userId: '',
    title: r.title,
    description: r.short_description,
    category: r.category,
    askingPrice: r.asking_price ?? 0,
    metrics: {
      monthlyRevenue: r.monthly_revenue ?? undefined,
      monthlyProfit: r.monthly_profit ?? undefined,
      monthlyTraffic: r.monthly_traffic ?? undefined,
      ageInYears: r.founded_year ? currentYear - r.founded_year : undefined,
    },
    createdAt: r.created_at,
    image_url: r.image_url || undefined,
  }
}

async function fetchProjects() {
  loading.value = true
  error.value = false
  try {
    const records = await getHomeProjects(activeCategory.value)
    projects.value = records.map(toProject)
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
}

watch(activeCategory, fetchProjects)
onMounted(fetchProjects)
</script>

<template>
  <section class="flex flex-col gap-6">
    <!-- Header row -->
    <div class="flex items-start justify-between gap-4">
      <div class="flex flex-col gap-1">
        <h2 class="text-2xl font-semibold text-gray-900">Featured Listings</h2>
        <p class="text-sm text-gray-500">Handpicked businesses available for acquisition right now.</p>
      </div>
      <RouterLink
        to="/projects"
        class="shrink-0 flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
      >
        View all
        <ArrowRight :size="14" />
      </RouterLink>
    </div>

    <!-- Category tabs -->
    <BaseTabs :tabs="categories" v-model="activeCategory" />

    <!-- Error -->
    <div
      v-if="error"
      class="flex items-center justify-center gap-2 py-10 text-sm text-red-500"
    >
      <AlertCircle :size="16" />
      Failed to load listings.
    </div>

    <!-- Cards (skeleton while loading, real cards when loaded) -->
    <div
      v-else-if="loading || projects.length"
      class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      <template v-if="loading">
        <ProjectCard v-for="n in 3" :key="n" loading />
      </template>
      <template v-else>
        <ProjectCard
          v-for="project in projects"
          :key="project.id"
          :project="project"
        />
      </template>
    </div>

    <!-- Empty -->
    <p v-else class="text-sm text-gray-400 py-10 text-center">
      No listings in this category yet.
    </p>

    <!-- Mobile "View all" CTA -->
    <div class="flex justify-center sm:hidden">
      <RouterLink
        to="/projects"
        class="flex items-center gap-1.5 text-sm font-medium text-gray-700 border border-gray-200 px-5 py-2.5 rounded-lg"
      >
        Browse all listings
        <ArrowRight :size="14" />
      </RouterLink>
    </div>
  </section>
</template>
