<script setup lang="ts">
import { ref } from 'vue'
import { Search } from '@lucide/vue'
import { categories } from '@/shared/mocks/categories'

const selectedCategory = ref('all')
const searchQuery = ref('')
</script>

<template>
  <div class="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white h-9">
    <!-- Category dropdown -->
    <label for="search-category" class="sr-only">Filter by category</label>
    <select
      id="search-category"
      v-model="selectedCategory"
      class="h-full pl-3 pr-2 text-xs text-gray-600 bg-transparent border-r border-gray-200 outline-none cursor-pointer shrink-0 max-w-32"
    >
      <option
        v-for="cat in categories"
        :key="cat.id"
        :value="cat.id"
      >
        {{ cat.id === 'all' ? 'All Categories' : cat.label }}
      </option>
    </select>

    <!-- Text input -->
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search projects..."
      class="flex-1 h-full px-3 text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none min-w-0"
    />

    <!-- Search icon -->
    <button
      type="button"
      aria-label="Search"
      class="h-full px-3 flex items-center text-gray-400 hover:text-gray-700 transition-colors shrink-0"
      tabindex="-1"
    >
      <Search :size="14" />
    </button>
  </div>
</template>
