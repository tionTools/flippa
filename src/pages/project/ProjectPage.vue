<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getProjectById } from '@/shared/mocks/projects'
import { getProjectDetail } from '@/shared/mocks/projectDetails'
import ProjectHeroBlock from '@/components/project/ProjectHeroBlock.vue'
import ProjectDescriptionSection from '@/components/project/ProjectDescriptionSection.vue'
import ProjectStatsGrid from '@/components/project/ProjectStatsGrid.vue'
import ProjectAnalyticsSection from '@/components/project/ProjectAnalyticsSection.vue'
import ProjectInsightsSection from '@/components/project/ProjectInsightsSection.vue'
import ProjectPurchasePanel from '@/components/project/ProjectPurchasePanel.vue'
import ProjectQuestionForm from '@/components/project/ProjectQuestionForm.vue'

const route = useRoute()
const router = useRouter()

const id = computed(() => String(route.params.id))
const project = computed(() => getProjectById(id.value))
const detail = computed(() => getProjectDetail(id.value))

// Redirect to 404 if project not found
if (!project.value) {
  router.replace({ name: 'not-found' })
}
</script>

<template>
  <div v-if="project" class="max-w-6xl mx-auto px-6 py-10">
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
        <ProjectStatsGrid :project="project" :detail="detail" />
        <ProjectDescriptionSection :detail="detail" />
        <ProjectAnalyticsSection :analytics="detail.analytics" />
        <ProjectInsightsSection :insights="detail.externalInsights" />
      </main>
    </div>
  </div>
</template>
