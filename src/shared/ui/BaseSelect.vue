<script setup lang="ts">
defineProps<{
  modelValue?: string
  options: { value: string; label: string }[]
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
  <select
    :value="modelValue"
    :disabled="disabled"
    :id="id"
    :name="name"
    class="base-select"
    @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
  >
    <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>
