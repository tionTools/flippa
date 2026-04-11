<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div>
    <h1 class="text-2xl font-semibold text-gray-900">Edit Listing #{{ route.params.id }}</h1>
  </div>
</template>
