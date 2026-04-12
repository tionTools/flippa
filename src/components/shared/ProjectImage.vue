<script setup lang="ts">
import { ImageIcon } from '@lucide/vue'

defineProps<{
  src?: string | null
  alt?: string
}>()
</script>

<template>
  <div class="absolute inset-0 bg-gray-100">
    <img
      v-if="src"
      :src="src"
      :alt="alt ?? ''"
      class="w-full h-full object-cover object-center block"
    />
    <div
      v-else
      class="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-300"
    >
      <ImageIcon :size="24" stroke-width="1.5" />
      <span class="text-xs font-medium tracking-wide">No image</span>
    </div>
  </div>
</template>
