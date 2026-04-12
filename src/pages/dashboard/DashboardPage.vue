<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUser } from '@clerk/vue'
import { Plus } from '@lucide/vue'
import { dashboardKpis, recentActivity } from '@/shared/mocks/dashboardData'
import type { ProjectRecord } from '@/types/project'
import { getProjectsPage } from '@/api/projects'
import DashboardKpiGrid from '@/components/dashboard/DashboardKpiGrid.vue'
import DashboardChartsSection from '@/components/dashboard/DashboardChartsSection.vue'
import DashboardActivityFeed from '@/components/dashboard/DashboardActivityFeed.vue'
import DashboardProjectsTable from '@/components/dashboard/DashboardProjectsTable.vue'

const { user } = useUser()

const greeting = (() => {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
})()

const previewProjects = ref<ProjectRecord[]>([])

onMounted(async () => {
  try {
    const result = await getProjectsPage({ page: 1, pageSize: 3 })
    previewProjects.value = result.data
  } catch {
    // preview table is non-critical — silently skip on error
  }
})
</script>

<template>
  <div class="flex flex-col gap-7 max-w-7xl">
    <!-- Page header -->
    <div class="flex items-start justify-between gap-4 flex-wrap">
      <div>
        <h1 class="text-xl font-bold text-gray-900">
          {{ greeting }}, {{ user?.firstName ?? 'there' }}
        </h1>
        <p class="text-sm text-gray-400 mt-1">Here's what's happening with your portfolio today.</p>
      </div>
      <RouterLink to="/dashboard/listings/new"
        class="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-700 transition-colors shrink-0">
        <Plus :size="15" />
        New Listing
      </RouterLink>
    </div>

    <!-- KPI cards -->
    <DashboardKpiGrid :kpis="dashboardKpis" />

    <!-- Charts + Activity feed — all blocks share the same fixed height -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="lg:col-span-2">
        <DashboardChartsSection />
      </div>
      <div class="h-70">
        <DashboardActivityFeed :items="recentActivity" />
      </div>
    </div>

    <!-- Projects preview (real data, first 3) -->
    <DashboardProjectsTable :projects="previewProjects" :limit="3" />
  </div>
</template>
