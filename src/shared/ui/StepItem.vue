<script setup lang="ts">
defineProps<{
  step: number
  title: string
  description: string
}>()
</script>

<template>
  <div class="flex gap-4">
    <span class="shrink-0 w-6 h-6 flex items-center justify-center rounded-full border border-gray-300 text-xs font-medium text-gray-500">
      {{ step }}
    </span>
    <div class="flex flex-col gap-1">
      <p class="text-sm font-medium text-gray-900">{{ title }}</p>
      <p class="text-sm text-gray-500">{{ description }}</p>
    </div>
  </div>
</template>
