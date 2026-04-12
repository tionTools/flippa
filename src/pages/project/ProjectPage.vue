<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Loader, AlertCircle } from '@lucide/vue'
import { getProjectById } from '@/api/projects'
import type { ProjectRecord } from '@/types/project'
import type { ProjectAnalytics } from '@/shared/mocks/projectDetails'
import ProjectHeroBlock from '@/components/project/ProjectHeroBlock.vue'
import ProjectDescriptionSection from '@/components/project/ProjectDescriptionSection.vue'
import ProjectStatsGrid from '@/components/project/ProjectStatsGrid.vue'
import ProjectAnalyticsSection from '@/components/project/ProjectAnalyticsSection.vue'
import ProjectInsightsSection from '@/components/project/ProjectInsightsSection.vue'
import ProjectPurchasePanel from '@/components/project/ProjectPurchasePanel.vue'
import ProjectQuestionForm from '@/components/project/ProjectQuestionForm.vue'

const route = useRoute()

const loading = ref(true)
const error = ref(false)
const project = ref<ProjectRecord | null>(null)

onMounted(async () => {
  try {
    project.value = await getProjectById(String(route.params.id))
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
})

// ─── Analytics — generated from real project metrics (demo trend) ─────────────

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const NOISE =  [-0.04, 0.03, -0.02, 0.05, -0.01, 0.03, 0.04, -0.02, 0.03, 0.05, -0.01, 0]

function trend(endValue: number): number[] {
  const start = Math.round(endValue * 0.55)
  const step = (endValue - start) / 11
  return MONTHS.map((_, i) => Math.max(0, Math.round((start + step * i) * (1 + NOISE[i]!))))
}

const analytics = computed<ProjectAnalytics | null>(() => {
  if (!project.value) return null
  const r = project.value
  return {
    months: MONTHS,
    revenue: trend(r.monthly_revenue ?? 5000),
    traffic: trend(r.monthly_traffic ?? 10000),
    users: trend(r.total_users ?? 500),
  }
})

// ─── Insights — static demo data (not stored in DB) ──────────────────────────

const insights = {
  trafficSources: [
    { label: 'Organic Search', value: 58 },
    { label: 'Direct', value: 22 },
    { label: 'Referral', value: 12 },
    { label: 'Social', value: 8 },
  ],
  topCountries: [
    { country: 'United States', share: '41%' },
    { country: 'United Kingdom', share: '14%' },
    { country: 'Canada', share: '9%' },
    { country: 'Australia', share: '7%' },
    { country: 'Germany', share: '5%' },
  ],
  avgSessionDuration: '3m 28s',
  bounceRate: '38%',
  returningVisitors: '42%',
}
</script>

<template>
  <div class="max-w-6xl mx-auto px-6 py-10">

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-32 text-gray-300">
      <Loader :size="24" class="animate-spin" />
    </div>

    <!-- Error -->
    <div
      v-else-if="error || !project"
      class="flex flex-col items-center justify-center gap-3 py-32 text-center"
    >
      <AlertCircle :size="32" class="text-gray-300" />
      <p class="text-sm text-gray-400">Project not found or failed to load.</p>
    </div>

    <!-- Content -->
    <template v-else>
      <!-- Hero (full width) -->
      <ProjectHeroBlock :project="project" />

      <!-- Two-column layout -->
      <div class="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <!-- Sidebar — purchase panel + question form -->
        <aside class="flex flex-col gap-5 order-first lg:order-last lg:col-span-1">
          <ProjectPurchasePanel :project="project" />
          <ProjectQuestionForm />
        </aside>

        <!-- Main content column -->
        <main class="flex flex-col gap-10 lg:col-span-2 order-last lg:order-first">
          <ProjectStatsGrid :project="project" />
          <ProjectDescriptionSection :project="project" />
          <ProjectAnalyticsSection v-if="analytics" :analytics="analytics" />
          <ProjectInsightsSection :insights="insights" />
        </main>
      </div>
    </template>

  </div>
</template>
