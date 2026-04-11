<script setup lang="ts">
defineProps<{
  level?: 1 | 2 | 3 | 4 | 5 | 6
}>()
</script>

<template>
  <component :is="`h${level ?? 1}`" class="base-heading">
    <slot />
  </component>
</template>
