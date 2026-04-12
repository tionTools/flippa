<script setup lang="ts">
import type { DashboardKpi } from '@/shared/mocks/dashboardData'
import { TrendingUp, Minus } from '@lucide/vue'

defineProps<{
  kpis: DashboardKpi[]
}>()
</script>

<template>
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
    <div
      v-for="kpi in kpis"
      :key="kpi.label"
      class="flex flex-col gap-2 p-5 bg-white rounded-2xl border border-gray-100"
    >
      <span class="text-xs font-semibold text-gray-400 uppercase tracking-widest">
        {{ kpi.label }}
      </span>
      <div class="flex items-end justify-between gap-2">
        <span class="text-2xl font-bold text-gray-900 leading-none">{{ kpi.value }}</span>
        <span v-if="kpi.trend === 'up'" class="mb-0.5 text-emerald-500">
          <TrendingUp :size="16" />
        </span>
        <span v-else class="mb-0.5 text-gray-300">
          <Minus :size="16" />
        </span>
      </div>
      <p class="text-xs text-gray-400 leading-snug">{{ kpi.sub }}</p>
    </div>
  </div>
</template>
