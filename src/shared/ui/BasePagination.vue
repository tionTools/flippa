<script setup lang="ts">
import { computed } from 'vue'
import { ChevronLeft, ChevronRight } from '@lucide/vue'

const props = defineProps<{
  modelValue: number
  total: number
}>()

const emit = defineEmits<{
  'update:modelValue': [page: number]
}>()

function goTo(page: number) {
  if (page < 1 || page > props.total || page === props.modelValue) return
  emit('update:modelValue', page)
}

const pages = computed(() => {
  const list: (number | '...')[] = []
  const { total, modelValue: current } = props

  if (total <= 7) {
    for (let i = 1; i <= total; i++) list.push(i)
    return list
  }

  list.push(1)
  if (current > 3) list.push('...')
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
    list.push(i)
  }
  if (current < total - 2) list.push('...')
  list.push(total)

  return list
})
</script>

<template>
  <div class="flex items-center justify-center gap-1">
    <button
      type="button"
      :disabled="modelValue === 1"
      class="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      @click="goTo(modelValue - 1)"
    >
      <ChevronLeft :size="14" />
      Prev
    </button>

    <template v-for="(page, i) in pages" :key="i">
      <span
        v-if="page === '...'"
        class="px-2 py-1.5 text-sm text-gray-400 select-none"
      >
        …
      </span>
      <button
        v-else
        type="button"
        class="min-w-8 px-2 py-1.5 rounded-lg text-sm transition-colors"
        :class="
          page === modelValue
            ? 'bg-gray-900 text-white font-medium'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        "
        @click="goTo(page)"
      >
        {{ page }}
      </button>
    </template>

    <button
      type="button"
      :disabled="modelValue === total"
      class="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      @click="goTo(modelValue + 1)"
    >
      Next
      <ChevronRight :size="14" />
    </button>
  </div>
</template>
