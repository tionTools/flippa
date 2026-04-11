<script setup lang="ts">
import { pressItems } from '@/shared/mocks/press'
import PressCard from './PressCard.vue'
</script>

<template>
  <section id="press" class="flex flex-col gap-8 py-16 border-t border-gray-100">
    <div class="flex flex-col gap-2">
      <h2 class="text-2xl font-semibold text-gray-900">What the Market Is Saying</h2>
      <p class="text-sm text-gray-500">
        Coverage from leading business and technology publications.
      </p>
    </div>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <PressCard v-for="item in pressItems" :key="item.id" :item="item" />
    </div>
  </section>
</template>
