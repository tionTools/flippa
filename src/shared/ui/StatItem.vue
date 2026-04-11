<script setup lang="ts">
defineProps<{
  value: string
  label: string
}>()
</script>

<template>
  <div class="flex flex-col gap-1">
    <strong class="text-2xl font-bold">{{ value }}</strong>
    <span class="text-sm text-gray-500">{{ label }}</span>
  </div>
</template>
