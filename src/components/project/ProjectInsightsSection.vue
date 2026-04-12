<script setup lang="ts">
import type { ExternalInsights } from '@/shared/mocks/projectDetails'
import { Globe, Clock, TrendingDown, RefreshCw } from '@lucide/vue'

defineProps<{
  insights: ExternalInsights
}>()

const sourceColors: string[] = [
  'bg-indigo-500',
  'bg-cyan-500',
  'bg-emerald-500',
  'bg-amber-400',
  'bg-rose-400',
]
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex items-center justify-between">
      <h2 class="text-lg font-semibold text-gray-900">External insights</h2>
      <span
        class="flex items-center gap-1.5 text-xs text-gray-400 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-full"
      >
        <Globe :size="12" />
        Powered by SimilarWeb
      </span>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <!-- Traffic sources -->
      <div class="flex flex-col gap-4 p-5 rounded-xl border border-gray-100">
        <h3 class="text-sm font-semibold text-gray-700">Traffic sources</h3>
        <div class="flex flex-col gap-2.5">
          <div
            v-for="(source, i) in insights.trafficSources"
            :key="source.label"
            class="flex flex-col gap-1"
          >
            <div class="flex justify-between text-xs text-gray-500">
              <span>{{ source.label }}</span>
              <span class="font-medium text-gray-700">{{ source.value }}%</span>
            </div>
            <div class="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div
                class="h-full rounded-full transition-all"
                :class="sourceColors[i % sourceColors.length]"
                :style="{ width: `${source.value}%` }"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Top countries -->
      <div class="flex flex-col gap-4 p-5 rounded-xl border border-gray-100">
        <h3 class="text-sm font-semibold text-gray-700">Top countries</h3>
        <div class="flex flex-col gap-2">
          <div
            v-for="(item, i) in insights.topCountries"
            :key="item.country"
            class="flex items-center justify-between text-sm"
          >
            <div class="flex items-center gap-2.5">
              <span class="w-5 text-xs font-medium text-gray-300 text-right">{{ i + 1 }}</span>
              <span class="text-gray-600">{{ item.country }}</span>
            </div>
            <span class="font-semibold text-gray-900">{{ item.share }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Engagement stats -->
    <div class="grid grid-cols-3 gap-3">
      <div class="flex flex-col items-center gap-1.5 p-4 rounded-xl border border-gray-100 bg-gray-50">
        <Clock :size="16" class="text-gray-400" />
        <span class="text-base font-bold text-gray-900">{{ insights.avgSessionDuration }}</span>
        <span class="text-xs text-gray-400 text-center">Avg. session</span>
      </div>
      <div class="flex flex-col items-center gap-1.5 p-4 rounded-xl border border-gray-100 bg-gray-50">
        <TrendingDown :size="16" class="text-gray-400" />
        <span class="text-base font-bold text-gray-900">{{ insights.bounceRate }}</span>
        <span class="text-xs text-gray-400 text-center">Bounce rate</span>
      </div>
      <div class="flex flex-col items-center gap-1.5 p-4 rounded-xl border border-gray-100 bg-gray-50">
        <RefreshCw :size="16" class="text-gray-400" />
        <span class="text-base font-bold text-gray-900">{{ insights.returningVisitors }}</span>
        <span class="text-xs text-gray-400 text-center">Returning</span>
      </div>
    </div>
  </div>
</template>
