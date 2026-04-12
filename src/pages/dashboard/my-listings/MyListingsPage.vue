<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { Plus, Loader, AlertCircle } from '@lucide/vue'
import { categories } from '@/shared/mocks/categories'
import type { ProjectRecord } from '@/types/project'
import { getProjectsPage } from '@/api/projects'
import { BaseTabs, BasePagination } from '@/shared/ui'
import DashboardProjectsTable from '@/components/dashboard/DashboardProjectsTable.vue'

const PAGE_SIZE = 5

const categoryFilter = ref('all')
const currentPage = ref(1)

const projects = ref<ProjectRecord[]>([])
const total = ref(0)
const loading = ref(false)
const error = ref<string | null>(null)

const totalPages = computed(() => Math.ceil(total.value / PAGE_SIZE))

async function fetchProjects() {
  loading.value = true
  error.value = null
  try {
    const result = await getProjectsPage({
      page: currentPage.value,
      pageSize: PAGE_SIZE,
      category: categoryFilter.value === 'all' ? undefined : categoryFilter.value,
    })
    projects.value = result.data
    total.value = result.total
  } catch {
    error.value = 'Failed to load projects. Please try again.'
  } finally {
    loading.value = false
  }
}

function onTabChange(val: string) {
  categoryFilter.value = val
  currentPage.value = 1
}

watch(currentPage, fetchProjects)
watch(categoryFilter, fetchProjects)

onMounted(fetchProjects)
</script>

<template>
  <div class="flex flex-col gap-6 max-w-7xl">
    <!-- Page header -->
    <div class="flex items-start justify-between gap-4 flex-wrap">
      <div>
        <h1 class="text-xl font-bold text-gray-900">My Listings</h1>
        <p class="text-sm text-gray-400 mt-1">
          {{ total }} {{ total === 1 ? 'project' : 'projects' }} in your portfolio
        </p>
      </div>
      <RouterLink
        to="/dashboard/listings/new"
        class="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-700 transition-colors shrink-0"
      >
        <Plus :size="15" />
        New Listing
      </RouterLink>
    </div>


    <!-- Category tabs -->
    <BaseTabs :tabs="categories" :model-value="categoryFilter" @update:model-value="onTabChange" />

    <!-- Error -->
    <div
      v-if="error"
      class="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-700"
    >
      <AlertCircle :size="16" class="shrink-0" />
      {{ error }}
    </div>

    <!-- Loading -->
    <div v-else-if="loading && projects.length === 0" class="flex justify-center py-20 text-gray-400">
      <Loader :size="20" class="animate-spin" />
    </div>

    <!-- Table -->
    <div v-else class="relative">
      <!-- Inline loading overlay for subsequent fetches -->
      <div
        v-if="loading"
        class="absolute inset-0 bg-white/60 rounded-2xl z-10 flex items-center justify-center"
      >
        <Loader :size="20" class="animate-spin text-gray-400" />
      </div>
      <DashboardProjectsTable :projects="projects" />
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="flex justify-center pt-2">
      <BasePagination v-model="currentPage" :total="totalPages" />
    </div>
  </div>
</template>
