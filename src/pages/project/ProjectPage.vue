<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-10">
    <h1 class="text-2xl font-semibold text-gray-900">Project #{{ route.params.id }}</h1>
  </div>
</template>
