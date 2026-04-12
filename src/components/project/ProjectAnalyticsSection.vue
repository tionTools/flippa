<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ProjectAnalytics } from '@/shared/mocks/projectDetails'
import { LineChart } from '@/shared/ui'

const props = defineProps<{
  analytics: ProjectAnalytics
}>()

type MetricKey = 'revenue' | 'traffic' | 'users'

const activeMetric = ref<MetricKey>('revenue')

const tabs: { key: MetricKey; label: string; color: string }[] = [
  { key: 'revenue', label: 'Revenue', color: '#4f46e5' },
  { key: 'traffic', label: 'Traffic', color: '#0891b2' },
  { key: 'users', label: 'Users', color: '#059669' },
]

const activeTab = computed(() => tabs.find((t) => t.key === activeMetric.value)!)

const activeData = computed(() => props.analytics[activeMetric.value])

const latestValue = computed(() => {
  const d = activeData.value
  return d[d.length - 1] ?? 0
})

function formatValue(val: number, key: MetricKey): string {
  if (key === 'revenue') {
    if (val >= 1000) return '$' + (val / 1000).toFixed(1) + 'K'
    return '$' + val
  }
  if (val >= 1000000) return (val / 1000000).toFixed(1) + 'M'
  if (val >= 1000) return (val / 1000).toFixed(1) + 'K'
  return String(val)
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <h2 class="text-lg font-semibold text-gray-900">Performance analytics</h2>

    <div class="rounded-xl border border-gray-100 overflow-hidden">
      <!-- Tab bar -->
      <div class="flex border-b border-gray-100">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          class="px-5 py-3 text-sm font-medium transition-colors cursor-pointer"
          :class="
            activeMetric === tab.key
              ? 'text-gray-900 border-b-2 -mb-px'
              : 'text-gray-400 hover:text-gray-600'
          "
          :style="activeMetric === tab.key ? { borderColor: tab.color } : {}"
          @click="activeMetric = tab.key"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Chart area -->
      <div class="p-5 flex flex-col gap-4">
        <!-- Current value -->
        <div class="flex items-baseline gap-2">
          <span class="text-2xl font-bold text-gray-900">
            {{ formatValue(latestValue, activeMetric) }}
          </span>
          <span class="text-sm text-gray-400">last month</span>
        </div>

        <!-- Chart -->
        <LineChart :data="activeData" :height="96" :color="activeTab.color" />

        <!-- Month labels -->
        <div class="flex justify-between">
          <span
            v-for="(month, i) in analytics.months"
            :key="month"
            class="text-xs text-gray-300 font-medium"
            :class="{ hidden: i % 2 !== 0 }"
          >
            {{ month }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
