<script setup lang="ts">
defineProps<{
  tabs: { id: string; label: string }[]
  modelValue: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="flex items-center gap-1 pb-1 flex-wrap">
    <button v-for="tab in tabs" :key="tab.id" type="button"
      class="shrink-0 px-3 py-1.5 rounded-lg text-sm transition-colors whitespace-nowrap border " :class="tab.id === modelValue
        ? 'bg-gray-900 text-white font-medium border-transparent'
        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100 border-gray-200'
        " @click="$emit('update:modelValue', tab.id)">
      {{ tab.label }}
    </button>
  </div>
</template>
