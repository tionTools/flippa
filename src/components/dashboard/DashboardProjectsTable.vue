<script setup lang="ts">
import type { DashboardProject, ProjectStatus } from '@/shared/mocks/dashboardData'
import { getCategoryLabel } from '@/shared/mocks/categories'
import { ExternalLink, Pencil } from '@lucide/vue'

defineProps<{
  projects: DashboardProject[]
}>()

function formatPrice(value: number): string {
  if (value >= 1000000) return '$' + (value / 1000000).toFixed(2) + 'M'
  return '$' + (value / 1000).toFixed(0) + 'K'
}

function formatRevenue(value: number): string {
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
      <p class="text-sm font-semibold text-gray-900">My Projects</p>
      <RouterLink
        to="/dashboard/listings/new"
        class="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
      >
        + New listing
      </RouterLink>
    </div>

    <!-- Scrollable table wrapper for mobile -->
    <div class="overflow-x-auto">
      <table class="w-full min-w-[720px] text-sm">
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
            <th class="px-4 py-3 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Offers
            </th>
            <th class="px-4 py-3 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Questions
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
          <tr
            v-for="project in projects"
            :key="project.id"
            class="hover:bg-gray-50/60 transition-colors"
          >
            <!-- Project name + category -->
            <td class="px-5 py-3.5">
              <div class="flex flex-col gap-0.5">
                <RouterLink
                  :to="`/projects/${project.id}`"
                  class="font-medium text-gray-900 hover:text-indigo-600 transition-colors"
                >
                  {{ project.title }}
                </RouterLink>
                <span class="text-xs text-gray-400">
                  {{ getCategoryLabel(project.category) }}
                </span>
              </div>
            </td>

            <!-- Status -->
            <td class="px-4 py-3.5">
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
                :class="statusConfig[project.status].classes"
              >
                {{ statusConfig[project.status].label }}
              </span>
            </td>

            <!-- Asking price -->
            <td class="px-4 py-3.5 text-right font-semibold text-gray-900">
              {{ formatPrice(project.askingPrice) }}
            </td>

            <!-- Revenue -->
            <td class="px-4 py-3.5 text-right text-gray-600">
              {{ formatRevenue(project.monthlyRevenue) }}
            </td>

            <!-- Offers -->
            <td class="px-4 py-3.5 text-center">
              <span
                v-if="project.offersCount > 0"
                class="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold bg-amber-100 text-amber-700"
              >
                {{ project.offersCount }}
              </span>
              <span v-else class="text-gray-300 text-xs">—</span>
            </td>

            <!-- Questions -->
            <td class="px-4 py-3.5 text-center">
              <span
                v-if="project.questionsCount > 0"
                class="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold bg-blue-100 text-blue-700"
              >
                {{ project.questionsCount }}
              </span>
              <span v-else class="text-gray-300 text-xs">—</span>
            </td>

            <!-- Updated -->
            <td class="px-4 py-3.5 text-gray-400 text-xs">
              {{ formatDate(project.updatedAt) }}
            </td>

            <!-- Actions -->
            <td class="px-5 py-3.5">
              <div class="flex items-center justify-end gap-2">
                <RouterLink
                  :to="`/projects/${project.id}`"
                  class="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                  title="View listing"
                >
                  <ExternalLink :size="14" />
                </RouterLink>
                <RouterLink
                  :to="`/dashboard/listings/${project.id}/edit`"
                  class="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                  title="Edit listing"
                >
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
