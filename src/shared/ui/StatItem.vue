<script setup lang="ts">
defineProps<{
  value: string
  label: string
  variant?: 'light'
}>()
</script>

<template>
  <div class="flex flex-col gap-1">
    <strong class="text-2xl font-bold" :class="variant === 'light' ? 'text-white' : 'text-gray-900'">
      {{ value }}
    </strong>
    <span class="text-sm" :class="variant === 'light' ? 'text-indigo-300' : 'text-gray-500'">
      {{ label }}
    </span>
  </div>
</template>
