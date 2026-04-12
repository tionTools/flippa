<script setup lang="ts">
import type { Project } from '@/shared/mocks/projects'
import type { ProjectDetail } from '@/shared/mocks/projectDetails'

defineProps<{
  project: Project
  detail: ProjectDetail
}>()

function formatRevenue(value: number): string {
  if (value >= 1000000) return '$' + (value / 1000000).toFixed(2) + 'M'
  if (value >= 1000) return '$' + (value / 1000).toFixed(1) + 'K'
  return '$' + value
}

function formatTraffic(value: number): string {
  if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M'
  if (value >= 1000) return (value / 1000).toFixed(1) + 'K'
  return String(value)
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <h2 class="text-lg font-semibold text-gray-900">Business overview</h2>
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
      <!-- Monthly Revenue -->
      <div
        v-if="project.metrics.monthlyRevenue"
        class="flex flex-col gap-1 p-4 rounded-xl border border-gray-100 bg-gray-50"
      >
        <span class="text-xs text-gray-400 font-medium uppercase tracking-wide">Revenue / mo</span>
        <span class="text-xl font-bold text-gray-900">
          {{ formatRevenue(project.metrics.monthlyRevenue) }}
        </span>
      </div>

      <!-- Monthly Profit -->
      <div
        v-if="project.metrics.monthlyProfit"
        class="flex flex-col gap-1 p-4 rounded-xl border border-gray-100 bg-gray-50"
      >
        <span class="text-xs text-gray-400 font-medium uppercase tracking-wide">Profit / mo</span>
        <span class="text-xl font-bold text-emerald-600">
          {{ formatRevenue(project.metrics.monthlyProfit) }}
        </span>
      </div>

      <!-- Monthly Traffic -->
      <div
        v-if="project.metrics.monthlyTraffic"
        class="flex flex-col gap-1 p-4 rounded-xl border border-gray-100 bg-gray-50"
      >
        <span class="text-xs text-gray-400 font-medium uppercase tracking-wide">Traffic / mo</span>
        <span class="text-xl font-bold text-gray-900">
          {{ formatTraffic(project.metrics.monthlyTraffic) }}
        </span>
      </div>

      <!-- Profit Margin -->
      <div
        v-if="project.metrics.monthlyRevenue && project.metrics.monthlyProfit"
        class="flex flex-col gap-1 p-4 rounded-xl border border-gray-100 bg-gray-50"
      >
        <span class="text-xs text-gray-400 font-medium uppercase tracking-wide">Margin</span>
        <span class="text-xl font-bold text-gray-900">
          {{
            Math.round((project.metrics.monthlyProfit / project.metrics.monthlyRevenue) * 100)
          }}%
        </span>
      </div>

      <!-- Team Size -->
      <div class="flex flex-col gap-1 p-4 rounded-xl border border-gray-100 bg-gray-50">
        <span class="text-xs text-gray-400 font-medium uppercase tracking-wide">Team size</span>
        <span class="text-xl font-bold text-gray-900">
          {{ detail.teamSize }} FTE
        </span>
      </div>

      <!-- Founded Year -->
      <div class="flex flex-col gap-1 p-4 rounded-xl border border-gray-100 bg-gray-50">
        <span class="text-xs text-gray-400 font-medium uppercase tracking-wide">Founded</span>
        <span class="text-xl font-bold text-gray-900">{{ detail.foundedYear }}</span>
      </div>
    </div>
  </div>
</template>
