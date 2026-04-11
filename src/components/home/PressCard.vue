<script setup lang="ts">
import type { PressItem } from '@/shared/mocks/press'

defineProps<{
  item: PressItem
}>()
</script>

<template>
  <article class="flex flex-col gap-3 p-5 border border-gray-200 rounded-xl">
    <div class="flex items-center justify-between">
      <span class="text-sm font-semibold text-gray-900">{{ item.source }}</span>
      <span class="text-xs text-gray-400 border border-gray-200 rounded-full px-2 py-0.5">
        {{ item.tag }}
      </span>
    </div>

    <p class="text-sm font-medium text-gray-800 leading-snug">{{ item.title }}</p>

    <p class="text-sm text-gray-500 leading-relaxed">{{ item.excerpt }}</p>

    <span class="text-xs text-gray-400 mt-auto">{{ item.date }}</span>
  </article>
</template>
