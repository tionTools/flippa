<script setup lang="ts">
import type { ProjectRecord } from '@/types/project'

defineProps<{
  project: ProjectRecord
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

      <div v-if="project.monthly_revenue"
        class="flex flex-col gap-1 p-4 rounded-xl border border-gray-100 bg-gray-50">
        <span class="text-xs text-gray-400 font-medium uppercase tracking-wide">Revenue / mo</span>
        <span class="text-xl font-bold text-gray-900">{{ formatRevenue(project.monthly_revenue) }}</span>
      </div>

      <div v-if="project.monthly_profit"
        class="flex flex-col gap-1 p-4 rounded-xl border border-gray-100 bg-gray-50">
        <span class="text-xs text-gray-400 font-medium uppercase tracking-wide">Profit / mo</span>
        <span class="text-xl font-bold text-emerald-600">{{ formatRevenue(project.monthly_profit) }}</span>
      </div>

      <div v-if="project.monthly_traffic"
        class="flex flex-col gap-1 p-4 rounded-xl border border-gray-100 bg-gray-50">
        <span class="text-xs text-gray-400 font-medium uppercase tracking-wide">Traffic / mo</span>
        <span class="text-xl font-bold text-gray-900">{{ formatTraffic(project.monthly_traffic) }}</span>
      </div>

      <div v-if="project.monthly_revenue && project.monthly_profit"
        class="flex flex-col gap-1 p-4 rounded-xl border border-gray-100 bg-gray-50">
        <span class="text-xs text-gray-400 font-medium uppercase tracking-wide">Margin</span>
        <span class="text-xl font-bold text-gray-900">
          {{ Math.round((project.monthly_profit / project.monthly_revenue) * 100) }}%
        </span>
      </div>

      <div v-if="project.team_size != null"
        class="flex flex-col gap-1 p-4 rounded-xl border border-gray-100 bg-gray-50">
        <span class="text-xs text-gray-400 font-medium uppercase tracking-wide">Team size</span>
        <span class="text-xl font-bold text-gray-900">{{ project.team_size }} FTE</span>
      </div>

      <div v-if="project.founded_year"
        class="flex flex-col gap-1 p-4 rounded-xl border border-gray-100 bg-gray-50">
        <span class="text-xs text-gray-400 font-medium uppercase tracking-wide">Founded</span>
        <span class="text-xl font-bold text-gray-900">{{ project.founded_year }}</span>
      </div>

      <div v-if="project.total_users"
        class="flex flex-col gap-1 p-4 rounded-xl border border-gray-100 bg-gray-50">
        <span class="text-xs text-gray-400 font-medium uppercase tracking-wide">Total users</span>
        <span class="text-xl font-bold text-gray-900">{{ formatTraffic(project.total_users) }}</span>
      </div>

      <div v-if="project.growth_rate != null"
        class="flex flex-col gap-1 p-4 rounded-xl border border-gray-100 bg-gray-50">
        <span class="text-xs text-gray-400 font-medium uppercase tracking-wide">Growth MoM</span>
        <span class="text-xl font-bold text-gray-900">{{ project.growth_rate }}%</span>
      </div>

    </div>
  </div>
</template>
