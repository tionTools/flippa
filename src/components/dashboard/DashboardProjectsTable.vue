<script setup lang="ts">
import { computed } from 'vue'
import type { ProjectRecord, ProjectStatus } from '@/types/project'
import { getCategoryLabel } from '@/shared/mocks/categories'
import { ExternalLink, Pencil } from '@lucide/vue'

const props = defineProps<{
  projects: ProjectRecord[]
  limit?: number
}>()

const displayed = computed(() =>
  props.limit ? props.projects.slice(0, props.limit) : props.projects,
)

function formatPrice(value: number | null): string {
  if (value == null) return '—'
  if (value >= 1000000) return '$' + (value / 1000000).toFixed(2) + 'M'
  return '$' + (value / 1000).toFixed(0) + 'K'
}

function formatRevenue(value: number | null): string {
  if (value == null) return '—'
  return '$' + (value / 1000).toFixed(1) + 'K'
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const statusConfig: Record<ProjectStatus, { label: string; classes: string }> = {
  active: { label: 'Active', classes: 'bg-emerald-50 text-emerald-700' },
  'under-offer': { label: 'Under Offer', classes: 'bg-amber-50 text-amber-700' },
  draft: { label: 'Draft', classes: 'bg-gray-100 text-gray-500' },
}
</script>

<template>
  <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
    <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-4">
      <p class="text-sm font-semibold text-gray-900">Recent Projects</p>
      <RouterLink v-if="limit" to="/dashboard/listings"
        class="text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors">
        View all →
      </RouterLink>
    </div>

    <!-- Scrollable table wrapper for mobile -->
    <div class="overflow-x-auto">
      <table class="w-full min-w-160 text-sm">
        <thead>
          <tr class="border-b border-gray-100">
            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Project
            </th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Status
            </th>
            <th class="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Asking Price
            </th>
            <th class="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Rev / mo
            </th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Updated
            </th>
            <th class="px-5 py-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-50">
          <tr v-for="project in displayed" :key="project.id" class="hover:bg-gray-50/60 transition-colors">
            <!-- Project name + category -->
            <td class="px-5 py-3.5">
              <div class="flex flex-col gap-0.5">
                <RouterLink :to="`/projects/${project.id}`"
                  class="font-medium text-gray-900 hover:text-indigo-600 transition-colors">
                  {{ project.title }}
                </RouterLink>
                <span class="text-xs text-gray-400">
                  {{ getCategoryLabel(project.category) }}
                </span>
              </div>
            </td>

            <!-- Status -->
            <td class="px-4 py-3.5">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
                :class="statusConfig[project.status].classes">
                {{ statusConfig[project.status].label }}
              </span>
            </td>

            <!-- Asking price -->
            <td class="px-4 py-3.5 text-right font-semibold text-gray-900">
              {{ formatPrice(project.asking_price) }}
            </td>

            <!-- Revenue -->
            <td class="px-4 py-3.5 text-right text-gray-600">
              {{ formatRevenue(project.monthly_revenue) }}
            </td>

            <!-- Updated -->
            <td class="px-4 py-3.5 text-gray-400 text-xs">
              {{ formatDate(project.updated_at) }}
            </td>

            <!-- Actions -->
            <td class="px-5 py-3.5">
              <div class="flex items-center justify-end gap-2">
                <RouterLink :to="`/projects/${project.id}`"
                  class="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                  title="View listing">
                  <ExternalLink :size="14" />
                </RouterLink>
                <RouterLink :to="`/dashboard/listings/${project.id}/edit`"
                  class="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                  title="Edit listing">
                  <Pencil :size="14" />
                </RouterLink>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
