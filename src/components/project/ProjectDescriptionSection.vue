<script setup lang="ts">
import type { ProjectDetail } from '@/shared/mocks/projectDetails'
import { CheckCircle2 } from '@lucide/vue'

defineProps<{
  detail: ProjectDetail
}>()
</script>

<template>
  <div class="flex flex-col gap-8">
    <!-- Full description -->
    <div class="flex flex-col gap-3">
      <h2 class="text-lg font-semibold text-gray-900">About this business</h2>
      <p class="text-sm text-gray-600 leading-relaxed">{{ detail.fullDescription }}</p>
    </div>

    <!-- What's included -->
    <div class="flex flex-col gap-3">
      <h2 class="text-lg font-semibold text-gray-900">What's included</h2>
      <ul class="flex flex-col gap-2">
        <li
          v-for="item in detail.whatIsIncluded"
          :key="item"
          class="flex items-start gap-2.5 text-sm text-gray-600"
        >
          <CheckCircle2 :size="16" class="mt-0.5 shrink-0 text-emerald-500" />
          {{ item }}
        </li>
      </ul>
    </div>

    <!-- Monetization model -->
    <div class="flex flex-col gap-3">
      <h2 class="text-lg font-semibold text-gray-900">Monetization model</h2>
      <p class="text-sm text-gray-600 leading-relaxed">{{ detail.monetizationModel }}</p>
    </div>

    <!-- Growth potential -->
    <div class="flex flex-col gap-3">
      <h2 class="text-lg font-semibold text-gray-900">Growth potential</h2>
      <p class="text-sm text-gray-600 leading-relaxed">{{ detail.growthPotential }}</p>
    </div>
  </div>
</template>
