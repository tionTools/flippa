<script setup lang="ts">
defineProps<{
  size?: 'sm' | 'md' | 'lg'
}>()
</script>

<template>
  <RouterLink to="/" class="flex items-center gap-2.5 group select-none">
    <span
      class="flex items-center justify-center rounded-lg bg-gray-900 text-white font-bold leading-none shrink-0"
      :class="{
        'w-6 h-6 text-xs': size === 'sm',
        'w-8 h-8 text-sm': size === 'lg',
        'w-7 h-7 text-xs': !size || size === 'md',
      }"
    >
      F
    </span>
    <span
      class="font-bold text-gray-900 tracking-tight"
      :class="{
        'text-sm': size === 'sm',
        'text-xl': size === 'lg',
        'text-base': !size || size === 'md',
      }"
    >
      Flippa
    </span>
  </RouterLink>
</template>
