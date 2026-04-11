<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { ArrowRight } from '@lucide/vue'
import { BaseTabs, BasePagination } from '@/shared/ui'
import ProjectCard from './ProjectCard.vue'
import { categories } from '@/shared/mocks/categories'
import { getProjectsByCategory } from '@/shared/mocks/projects'
import type { Project } from '@/shared/mocks/projects'

const props = defineProps<{
  title: string
  subtitle?: string
  projects: Project[]
  // Display options
  showTabs?: boolean
  showViewAll?: boolean
  showPagination?: boolean
  // Limit without pagination (e.g. home page shows 3)
  limit?: number
  // Pagination options
  pageSize?: number
}>()

const activeCategory = ref('all')
const currentPage = ref(1)

// Reset page when category changes
watch(activeCategory, () => {
  currentPage.value = 1
})

const filteredProjects = computed(() => {
  if (activeCategory.value === 'all') return props.projects
  return props.projects.filter((p) => p.category === activeCategory.value)
})

const resolvedPageSize = computed(() => props.pageSize ?? 6)

const totalPages = computed(() =>
  Math.ceil(filteredProjects.value.length / resolvedPageSize.value),
)

const displayedProjects = computed(() => {
  if (props.showPagination) {
    const start = (currentPage.value - 1) * resolvedPageSize.value
    return filteredProjects.value.slice(start, start + resolvedPageSize.value)
  }
  if (props.limit) {
    return filteredProjects.value.slice(0, props.limit)
  }
  return filteredProjects.value
})

// Only show categories that have at least one project in the current set
const availableCategories = computed(() => {
  const ids = new Set(props.projects.map((p) => p.category))
  return categories.filter((c) => c.id === 'all' || ids.has(c.id))
})
</script>

<template>
  <section class="flex flex-col gap-6">
    <!-- Header row -->
    <div class="flex items-start justify-between gap-4">
      <div class="flex flex-col gap-1">
        <h2 class="text-2xl font-semibold text-gray-900">{{ title }}</h2>
        <p v-if="subtitle" class="text-sm text-gray-500">{{ subtitle }}</p>
      </div>
      <RouterLink
        v-if="showViewAll"
        to="/projects"
        class="shrink-0 flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
      >
        View all
        <ArrowRight :size="14" />
      </RouterLink>
    </div>

    <!-- Category tabs -->
    <BaseTabs
      v-if="showTabs"
      :tabs="availableCategories"
      v-model="activeCategory"
    />

    <!-- Cards grid -->
    <div
      v-if="displayedProjects.length"
      class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      <ProjectCard
        v-for="project in displayedProjects"
        :key="project.id"
        :project="project"
      />
    </div>

    <p v-else class="text-sm text-gray-400 py-10 text-center">
      No listings in this category yet.
    </p>

    <!-- Pagination -->
    <BasePagination
      v-if="showPagination && totalPages > 1"
      v-model="currentPage"
      :total="totalPages"
      class="pt-4"
    />

    <!-- Mobile "View all" CTA -->
    <div v-if="showViewAll" class="flex justify-center sm:hidden">
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
