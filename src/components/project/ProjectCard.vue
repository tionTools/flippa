<script setup lang="ts">
import type { Project } from '@/shared/mocks/projects'
import { getCategoryLabel } from '@/shared/mocks/categories'
import ProjectImage from '@/components/shared/ProjectImage.vue'

defineProps<{
  project?: Project
  loading?: boolean
}>()

function formatPrice(value: number): string {
  return '$' + value.toLocaleString('en-US')
}

function formatRevenue(value: number): string {
  if (value >= 1000) return '$' + (value / 1000).toFixed(1) + 'K'
  return '$' + value
}
</script>

<template>
  <!-- Skeleton state -->
  <div
    v-if="loading"
    class="flex flex-col border border-gray-100 rounded-xl overflow-hidden animate-pulse"
    aria-hidden="true"
  >
    <div class="aspect-video w-full bg-gray-100" />
    <div class="flex flex-col gap-3 p-4">
      <div class="flex flex-col gap-1.5">
        <div class="h-3 w-16 bg-gray-100 rounded" />
        <div class="h-4 w-3/4 bg-gray-200 rounded" />
        <div class="h-4 w-1/2 bg-gray-100 rounded" />
      </div>
      <div class="flex flex-col gap-1.5">
        <div class="h-3 w-full bg-gray-100 rounded" />
        <div class="h-3 w-5/6 bg-gray-100 rounded" />
      </div>
      <div class="flex items-center gap-4 pt-1 border-t border-gray-100">
        <div class="flex flex-col gap-1">
          <div class="h-2.5 w-10 bg-gray-100 rounded" />
          <div class="h-3.5 w-14 bg-gray-200 rounded" />
        </div>
        <div class="flex flex-col gap-1">
          <div class="h-2.5 w-10 bg-gray-100 rounded" />
          <div class="h-3.5 w-14 bg-gray-200 rounded" />
        </div>
      </div>
      <div class="flex items-center justify-between pt-2 border-t border-gray-100">
        <div class="h-3 w-16 bg-gray-100 rounded" />
        <div class="h-4 w-20 bg-gray-200 rounded" />
      </div>
    </div>
  </div>

  <!-- Loaded state -->
  <RouterLink
    v-else-if="project"
    :to="`/projects/${project.id}`"
    class="flex flex-col border border-gray-200 rounded-xl overflow-hidden hover:border-gray-400 transition-colors"
  >
    <!-- Project image -->
    <div class="relative aspect-video w-full overflow-hidden">
      <ProjectImage :src="(project as any).image_url" :alt="project.title" />
    </div>

    <div class="flex flex-col gap-3 p-4">
      <!-- Category + title -->
      <div class="flex flex-col gap-1">
        <span class="text-xs font-medium text-gray-400 uppercase tracking-wider">
          {{ getCategoryLabel(project.category) }}
        </span>
        <h3 class="text-sm font-semibold text-gray-900 leading-snug">
          {{ project.title }}
        </h3>
      </div>

      <!-- Description -->
      <p class="text-xs text-gray-500 leading-relaxed line-clamp-2">
        {{ project.description }}
      </p>

      <!-- Metrics -->
      <div class="flex items-center gap-4 pt-1 border-t border-gray-100 text-xs text-gray-500">
        <div v-if="project.metrics.monthlyRevenue" class="flex flex-col gap-0.5">
          <span class="text-gray-400">Revenue</span>
          <span class="font-medium text-gray-700">
            {{ formatRevenue(project.metrics.monthlyRevenue) }}/mo
          </span>
        </div>
        <div v-if="project.metrics.monthlyProfit" class="flex flex-col gap-0.5">
          <span class="text-gray-400">Profit</span>
          <span class="font-medium text-gray-700">
            {{ formatRevenue(project.metrics.monthlyProfit) }}/mo
          </span>
        </div>
        <div v-if="project.metrics.ageInYears" class="flex flex-col gap-0.5">
          <span class="text-gray-400">Age</span>
          <span class="font-medium text-gray-700">
            {{ project.metrics.ageInYears }}yr{{ project.metrics.ageInYears > 1 ? 's' : '' }}
          </span>
        </div>
      </div>

      <!-- Price -->
      <div class="flex items-center justify-between pt-2 border-t border-gray-100">
        <span class="text-xs text-gray-400">Asking price</span>
        <span class="text-sm font-bold text-gray-900">
          {{ formatPrice(project.askingPrice) }}
        </span>
      </div>
    </div>
  </RouterLink>
</template>
