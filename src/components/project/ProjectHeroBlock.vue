<script setup lang="ts">
import type { ProjectRecord } from '@/types/project'
import { getCategoryLabel } from '@/shared/mocks/categories'
import { RouterLink } from 'vue-router'
import { ChevronRight } from '@lucide/vue'
import ProjectImage from '@/components/shared/ProjectImage.vue'

const props = defineProps<{
  project: ProjectRecord
}>()

function formatPrice(value: number | null): string {
  if (value == null) return '—'
  return '$' + value.toLocaleString('en-US')
}

function formatRevenue(value: number | null): string {
  if (value == null) return '—'
  if (value >= 1000) return '$' + (value / 1000).toFixed(1) + 'K'
  return '$' + value
}

const ageInYears = props.project.founded_year
  ? new Date().getFullYear() - props.project.founded_year
  : null
</script>

<template>
  <div class="flex flex-col gap-6">
    <!-- Breadcrumb -->
    <nav class="flex items-center gap-1 text-sm text-gray-400">
      <RouterLink to="/projects" class="hover:text-gray-700 transition-colors">Projects</RouterLink>
      <ChevronRight :size="14" />
      <span class="text-gray-700 font-medium">{{ project.title }}</span>
    </nav>

    <!-- Main hero content -->
    <div class="flex flex-col gap-4">
      <!-- Category badge -->
      <span
        class="self-start text-xs font-semibold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full"
      >
        {{ getCategoryLabel(project.category) }}
      </span>

      <!-- Title -->
      <h1 class="text-3xl font-bold text-gray-900 leading-tight">{{ project.title }}</h1>

      <!-- Short description -->
      <p class="text-base text-gray-600 leading-relaxed max-w-2xl">{{ project.short_description }}</p>
    </div>

    <!-- Project image -->
    <div v-if="project.image_url" class="relative w-full rounded-xl overflow-hidden aspect-video max-h-96">
      <ProjectImage :src="project.image_url" :alt="project.title" />
    </div>

    <!-- Key metrics row -->
    <div class="flex flex-wrap items-center gap-x-8 gap-y-3 py-5 border-t border-b border-gray-100">
      <div v-if="project.monthly_revenue" class="flex flex-col gap-0.5">
        <span class="text-xs text-gray-400 font-medium uppercase tracking-wide">Revenue / mo</span>
        <span class="text-xl font-bold text-gray-900">{{ formatRevenue(project.monthly_revenue) }}</span>
      </div>
      <div v-if="project.monthly_profit" class="flex flex-col gap-0.5">
        <span class="text-xs text-gray-400 font-medium uppercase tracking-wide">Profit / mo</span>
        <span class="text-xl font-bold text-gray-900">{{ formatRevenue(project.monthly_profit) }}</span>
      </div>
      <div v-if="project.monthly_traffic" class="flex flex-col gap-0.5">
        <span class="text-xs text-gray-400 font-medium uppercase tracking-wide">Traffic / mo</span>
        <span class="text-xl font-bold text-gray-900">
          {{ (project.monthly_traffic / 1000).toFixed(1) }}K
        </span>
      </div>
      <div v-if="ageInYears" class="flex flex-col gap-0.5">
        <span class="text-xs text-gray-400 font-medium uppercase tracking-wide">Age</span>
        <span class="text-xl font-bold text-gray-900">
          {{ ageInYears }} yr{{ ageInYears > 1 ? 's' : '' }}
        </span>
      </div>

      <!-- Asking price pushed to end -->
      <div class="ml-auto flex flex-col gap-0.5 text-right">
        <span class="text-xs text-gray-400 font-medium uppercase tracking-wide">Asking price</span>
        <span class="text-2xl font-extrabold text-gray-900">{{ formatPrice(project.asking_price) }}</span>
      </div>
    </div>
  </div>
</template>
