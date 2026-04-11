<script setup lang="ts">
defineProps<{
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  rows?: number
  id?: string
  name?: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <textarea
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :rows="rows ?? 4"
    :id="id"
    :name="name"
    class="base-textarea"
    @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
  />
</template>
