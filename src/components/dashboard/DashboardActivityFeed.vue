<script setup lang="ts">
import type { ActivityItem, ActivityType } from '@/shared/mocks/dashboardData'
import { Gavel, MessageCircle, TrendingUp, HandCoins, CheckCircle2 } from '@lucide/vue'
import { RouterLink } from 'vue-router'
import type { Component } from 'vue'

defineProps<{
  items: ActivityItem[]
}>()

const typeConfig: Record<ActivityType, { icon: Component; color: string; bg: string }> = {
  bid: { icon: Gavel, color: 'text-amber-600', bg: 'bg-amber-50' },
  question: { icon: MessageCircle, color: 'text-blue-600', bg: 'bg-blue-50' },
  view_spike: { icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  offer: { icon: HandCoins, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  deal: { icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
}
</script>

<template>
  <div class="flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden h-full">
    <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-4">
      <p class="text-sm font-semibold text-gray-900">Recent Activity</p>
      <RouterLink
        to="/dashboard/activity"
        class="text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors"
      >
        View all →
      </RouterLink>
    </div>

    <ul class="divide-y divide-gray-50 overflow-y-auto flex-1">
      <li
        v-for="item in items"
        :key="item.id"
        class="flex items-start gap-3 px-5 py-3.5 hover:bg-gray-50/60 transition-colors"
      >
        <!-- Icon -->
        <span
          class="mt-0.5 shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
          :class="[typeConfig[item.type].bg, typeConfig[item.type].color]"
        >
          <component :is="typeConfig[item.type].icon" :size="14" />
        </span>

        <!-- Content -->
        <div class="flex-1 min-w-0">
          <RouterLink
            :to="`/projects/${item.projectId}`"
            class="text-xs font-semibold text-gray-700 hover:text-gray-900 transition-colors"
          >
            {{ item.projectTitle }}
          </RouterLink>
          <p class="text-xs text-gray-500 mt-0.5 leading-snug">
            {{ item.description }}
          </p>
        </div>

        <!-- Time -->
        <span class="shrink-0 text-xs text-gray-300 whitespace-nowrap mt-0.5">
          {{ item.timeAgo }}
        </span>
      </li>
    </ul>
  </div>
</template>
