<script setup lang="ts">
defineProps<{
  modelValue?: string
  type?: string
  placeholder?: string
  disabled?: boolean
  id?: string
  name?: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <input
    :value="modelValue"
    :type="type ?? 'text'"
    :placeholder="placeholder"
    :disabled="disabled"
    :id="id"
    :name="name"
    class="base-input"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>
