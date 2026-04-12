<script setup lang="ts">
defineProps<{
  step: number
  title: string
  description: string
  variant?: 'light'
}>()
</script>

<template>
  <div class="flex gap-4">
    <span
      class="shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-xs font-medium border"
      :class="variant === 'light'
        ? 'border-white/40 text-white/70'
        : 'border-gray-300 text-gray-500'"
    >
      {{ step }}
    </span>
    <div class="flex flex-col gap-1">
      <p class="text-sm font-medium" :class="variant === 'light' ? 'text-white' : 'text-gray-900'">
        {{ title }}
      </p>
      <p class="text-sm" :class="variant === 'light' ? 'text-white/60' : 'text-gray-500'">
        {{ description }}
      </p>
    </div>
  </div>
</template>
