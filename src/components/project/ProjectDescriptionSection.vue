<script setup lang="ts">
import type { ProjectRecord } from '@/types/project'
import { CheckCircle2 } from '@lucide/vue'

defineProps<{
  project: ProjectRecord
}>()
</script>

<template>
  <div class="flex flex-col gap-8">
    <!-- Full description -->
    <div v-if="project.full_description" class="flex flex-col gap-3">
      <h2 class="text-lg font-semibold text-gray-900">About this business</h2>
      <p class="text-sm text-gray-600 leading-relaxed">{{ project.full_description }}</p>
    </div>

    <!-- What's included -->
    <div v-if="project.what_is_included.length" class="flex flex-col gap-3">
      <h2 class="text-lg font-semibold text-gray-900">What's included</h2>
      <ul class="flex flex-col gap-2">
        <li
          v-for="item in project.what_is_included"
          :key="item"
          class="flex items-start gap-2.5 text-sm text-gray-600"
        >
          <CheckCircle2 :size="16" class="mt-0.5 shrink-0 text-emerald-500" />
          {{ item }}
        </li>
      </ul>
    </div>

    <!-- Monetization model -->
    <div v-if="project.monetization_model" class="flex flex-col gap-3">
      <h2 class="text-lg font-semibold text-gray-900">Monetization model</h2>
      <p class="text-sm text-gray-600 leading-relaxed">{{ project.monetization_model }}</p>
    </div>

    <!-- Business model -->
    <div v-if="project.business_model" class="flex flex-col gap-3">
      <h2 class="text-lg font-semibold text-gray-900">Business model</h2>
      <p class="text-sm text-gray-600 leading-relaxed">{{ project.business_model }}</p>
    </div>

    <!-- Growth opportunities -->
    <div v-if="project.growth_opportunities" class="flex flex-col gap-3">
      <h2 class="text-lg font-semibold text-gray-900">Growth potential</h2>
      <p class="text-sm text-gray-600 leading-relaxed">{{ project.growth_opportunities }}</p>
    </div>

    <!-- Risks & notes -->
    <div v-if="project.risks_and_notes" class="flex flex-col gap-3">
      <h2 class="text-lg font-semibold text-gray-900">Risks & notes</h2>
      <p class="text-sm text-gray-600 leading-relaxed">{{ project.risks_and_notes }}</p>
    </div>

    <!-- Tech stack -->
    <div v-if="project.tech_stack.length" class="flex flex-col gap-3">
      <h2 class="text-lg font-semibold text-gray-900">Tech stack</h2>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="tech in project.tech_stack"
          :key="tech"
          class="px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-600"
        >
          {{ tech }}
        </span>
      </div>
    </div>
  </div>
</template>
