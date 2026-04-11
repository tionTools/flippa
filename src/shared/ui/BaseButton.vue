<script setup lang="ts">
defineProps<{
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'ghost'
  disabled?: boolean
}>()
</script>

<template>
  <button
    :type="type ?? 'button'"
    :disabled="disabled"
    :data-variant="variant ?? 'primary'"
    class="base-button"
  >
    <slot />
  </button>
</template>
