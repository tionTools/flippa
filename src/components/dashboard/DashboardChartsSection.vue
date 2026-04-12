<script setup lang="ts">
import { LineChart } from '@/shared/ui'
import { MONTHS, portfolioViewsData, inquiryTrendData } from '@/shared/mocks/dashboardData'

// Portfolio Views stats
const viewsLast = portfolioViewsData[portfolioViewsData.length - 1]!
const viewsPrev = portfolioViewsData[portfolioViewsData.length - 2]!
const viewsMoM = Math.round(((viewsLast - viewsPrev) / viewsPrev) * 100)
const viewsPeak = Math.max(...portfolioViewsData)

// Inquiry stats
const inquiryLast = inquiryTrendData[inquiryTrendData.length - 1]!
const inquiryPrev = inquiryTrendData[inquiryTrendData.length - 2]!
const inquiryMoM = Math.round(((inquiryLast - inquiryPrev) / inquiryPrev) * 100)
const offersShare = 7   // mock: offers out of total inquiries
const questionsShare = inquiryLast - offersShare
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
    <!-- Portfolio Views -->
    <div class="flex flex-col p-5 bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div class="flex items-start justify-between gap-2">
        <div>
          <p class="text-sm font-semibold text-gray-900">Portfolio Views</p>
          <p class="text-xs text-gray-400 mt-0.5">Total listing views across all projects</p>
        </div>
        <span class="text-xl font-bold text-gray-900">
          {{ (viewsLast / 1000).toFixed(1) }}K
        </span>
      </div>

      <div class="mt-3">
        <LineChart :data="portfolioViewsData" :height="72" color="#4f46e5" />
      </div>

      <div class="flex justify-between mt-1.5 mb-3">
        <span
          v-for="(month, i) in MONTHS"
          :key="month"
          class="text-xs text-gray-300 font-medium"
          :class="{ hidden: i % 2 !== 0 }"
        >
          {{ month }}
        </span>
      </div>

      <!-- Bottom stats strip -->
      <div class="mt-auto pt-3 border-t border-gray-100 grid grid-cols-3 gap-2">
        <div class="flex flex-col gap-0.5">
          <span class="text-xs text-gray-400">MoM growth</span>
          <span class="text-sm font-semibold text-emerald-600">+{{ viewsMoM }}%</span>
        </div>
        <div class="flex flex-col gap-0.5">
          <span class="text-xs text-gray-400">Peak month</span>
          <span class="text-sm font-semibold text-gray-900">{{ (viewsPeak / 1000).toFixed(1) }}K</span>
        </div>
        <div class="flex flex-col gap-0.5">
          <span class="text-xs text-gray-400">Avg / month</span>
          <span class="text-sm font-semibold text-gray-900">
            {{ Math.round(portfolioViewsData.reduce((a, b) => a + b, 0) / portfolioViewsData.length / 1000 * 10) / 10 }}K
          </span>
        </div>
      </div>
    </div>

    <!-- Inquiry Activity -->
    <div class="flex flex-col p-5 bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div class="flex items-start justify-between gap-2">
        <div>
          <p class="text-sm font-semibold text-gray-900">Inquiry Activity</p>
          <p class="text-xs text-gray-400 mt-0.5">Questions and offers received per month</p>
        </div>
        <span class="text-xl font-bold text-gray-900">{{ inquiryLast }}</span>
      </div>

      <div class="mt-3">
        <LineChart :data="inquiryTrendData" :height="72" color="#0891b2" />
      </div>

      <div class="flex justify-between mt-1.5 mb-3">
        <span
          v-for="(month, i) in MONTHS"
          :key="month"
          class="text-xs text-gray-300 font-medium"
          :class="{ hidden: i % 2 !== 0 }"
        >
          {{ month }}
        </span>
      </div>

      <!-- Bottom stats strip -->
      <div class="mt-auto pt-3 border-t border-gray-100 grid grid-cols-3 gap-2">
        <div class="flex flex-col gap-0.5">
          <span class="text-xs text-gray-400">MoM growth</span>
          <span class="text-sm font-semibold text-emerald-600">+{{ inquiryMoM }}%</span>
        </div>
        <div class="flex flex-col gap-0.5">
          <span class="text-xs text-gray-400">Questions</span>
          <span class="text-sm font-semibold text-gray-900">{{ questionsShare }}</span>
        </div>
        <div class="flex flex-col gap-0.5">
          <span class="text-xs text-gray-400">Offers</span>
          <span class="text-sm font-semibold text-gray-900">{{ offersShare }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
