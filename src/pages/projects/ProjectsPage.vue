<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { Loader, AlertCircle } from '@lucide/vue'
import { BaseTabs, BasePagination } from '@/shared/ui'
import ProjectListSection from '@/components/project/ProjectListSection.vue'
import ProjectCard from '@/components/project/ProjectCard.vue'
import { categories } from '@/shared/mocks/categories'
import type { Project } from '@/shared/mocks/projects'
import type { ProjectRecord } from '@/types/project'
import { getHomeProjects, getProjectsPage } from '@/api/projects'

const PAGE_SIZE = 6

// ─── Map DB record → card-compatible shape ────────────────────────────────────

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

// ─── Featured section (top 3, is_featured first) ─────────────────────────────

const featuredProjects = ref<Project[]>([])

onMounted(async () => {
  try {
    const records = await getHomeProjects()
    featuredProjects.value = records.map(toProject)
  } catch {
    // featured is non-critical — skip silently
  }
})

// ─── All listings ─────────────────────────────────────────────────────────────

const activeCategory = ref('all')
const currentPage = ref(1)
const allProjects = ref<Project[]>([])
const total = ref(0)
const loading = ref(false)
const error = ref(false)

const totalPages = computed(() => Math.ceil(total.value / PAGE_SIZE))

async function fetchAll() {
  loading.value = true
  error.value = false
  try {
    const result = await getProjectsPage({
      page: currentPage.value,
      pageSize: PAGE_SIZE,
      category: activeCategory.value === 'all' ? undefined : activeCategory.value,
    })
    allProjects.value = result.data.map(toProject)
    total.value = result.total
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
}

function onTabChange(val: string) {
  activeCategory.value = val
  currentPage.value = 1
}

watch(currentPage, fetchAll)
watch(activeCategory, fetchAll)
onMounted(fetchAll)
</script>

<template>
  <div class="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-16">

    <!-- Featured block -->
    <ProjectListSection
      v-if="featuredProjects.length"
      title="Featured Projects"
      subtitle="Top picks from our marketplace this week."
      :projects="featuredProjects"
      :show-tabs="false"
      :show-view-all="false"
      :show-pagination="false"
    />

    <!-- All listings -->
    <section class="flex flex-col gap-6">
      <!-- Header -->
      <div class="flex flex-col gap-1">
        <h2 class="text-2xl font-semibold text-gray-900">All Listings</h2>
        <p class="text-sm text-gray-500">Browse every business available for acquisition.</p>
      </div>

      <!-- Category tabs -->
      <BaseTabs :tabs="categories" :model-value="activeCategory" @update:model-value="onTabChange" />

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center py-20 text-gray-300">
        <Loader :size="20" class="animate-spin" />
      </div>

      <!-- Error -->
      <div
        v-else-if="error"
        class="flex items-center justify-center gap-2 py-10 text-sm text-red-500"
      >
        <AlertCircle :size="16" />
        Failed to load listings. Please try again.
      </div>

      <!-- Cards -->
      <div
        v-else-if="allProjects.length"
        class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        <ProjectCard
          v-for="project in allProjects"
          :key="project.id"
          :project="project"
        />
      </div>

      <!-- Empty -->
      <p v-else class="text-sm text-gray-400 py-10 text-center">
        No listings in this category yet.
      </p>

      <!-- Pagination -->
      <BasePagination
        v-if="totalPages > 1"
        v-model="currentPage"
        :total="totalPages"
        class="pt-4"
      />
    </section>

  </div>
</template>
