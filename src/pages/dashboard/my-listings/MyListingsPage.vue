<script setup lang="ts">
import { ref, computed } from 'vue'
import { Plus } from '@lucide/vue'
import { dashboardProjects } from '@/shared/mocks/dashboardData'
import type { ProjectStatus } from '@/shared/mocks/dashboardData'
import { BaseTabs, BasePagination } from '@/shared/ui'
import DashboardProjectsTable from '@/components/dashboard/DashboardProjectsTable.vue'

const PAGE_SIZE = 5

const statusFilter = ref('all')
const currentPage = ref(1)

const statusTabs = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'under-offer', label: 'Under Offer' },
  { id: 'draft', label: 'Draft' },
]

const filtered = computed(() => {
  if (statusFilter.value === 'all') return dashboardProjects
  return dashboardProjects.filter((p) => p.status === (statusFilter.value as ProjectStatus))
})

const totalPages = computed(() => Math.ceil(filtered.value.length / PAGE_SIZE))

const paginated = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return filtered.value.slice(start, start + PAGE_SIZE)
})

function onTabChange(val: string) {
  statusFilter.value = val
  currentPage.value = 1
}
</script>

<template>
  <div class="flex flex-col gap-6 max-w-7xl">
    <!-- Page header -->
    <div class="flex items-start justify-between gap-4 flex-wrap">
      <div>
        <h1 class="text-xl font-bold text-gray-900">My Listings</h1>
        <p class="text-sm text-gray-400 mt-1">
          {{ dashboardProjects.length }} projects in your portfolio
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

    <!-- Status tabs -->
    <BaseTabs :tabs="statusTabs" :model-value="statusFilter" @update:model-value="onTabChange" />

    <!-- Table -->
    <DashboardProjectsTable :projects="paginated" />

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="flex justify-center pt-2">
      <BasePagination v-model="currentPage" :total="totalPages" />
    </div>
  </div>
</template>
