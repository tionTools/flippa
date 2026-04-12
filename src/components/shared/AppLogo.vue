<script setup lang="ts">
defineProps<{
  size?: 'sm' | 'md' | 'lg'
  variant?: 'light'
}>()
</script>

<template>
  <RouterLink to="/" class="flex items-center gap-2.5 group select-none">
    <span
      class="flex items-center justify-center rounded-lg font-bold leading-none shrink-0"
      :class="[
        variant === 'light' ? 'bg-white text-indigo-950' : 'bg-gray-900 text-white',
        {
          'w-6 h-6 text-xs': size === 'sm',
          'w-8 h-8 text-sm': size === 'lg',
          'w-7 h-7 text-xs': !size || size === 'md',
        }
      ]"
    >
      F
    </span>
    <span
      class="font-bold tracking-tight"
      :class="[
        variant === 'light' ? 'text-white' : 'text-gray-900',
        {
          'text-sm': size === 'sm',
          'text-xl': size === 'lg',
          'text-base': !size || size === 'md',
        }
      ]"
    >
      Flippa
    </span>
  </RouterLink>
</template>
