<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  data: number[]
  height?: number
  color?: string
}>()

const W = 400
const h = computed(() => props.height ?? 72)
const stroke = computed(() => props.color ?? '#111827')
const padY = 6

const normalised = computed(() => {
  const max = Math.max(...props.data)
  const min = Math.min(...props.data)
  const range = max - min || 1
  const step = W / (props.data.length - 1)
  return props.data.map((v, i) => ({
    x: i * step,
    y: padY + ((1 - (v - min) / range) * (h.value - padY * 2)),
  }))
})

const linePath = computed(() =>
  normalised.value.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' '),
)

const areaPath = computed(() => {
  const pts = normalised.value
  if (!pts.length) return ''
  const last = pts[pts.length - 1]!
  const first = pts[0]!
  return `${linePath.value} L${last.x},${h.value} L${first.x},${h.value} Z`
})
</script>

<template>
  <svg
    :viewBox="`0 0 ${W} ${h}`"
    preserveAspectRatio="none"
    class="w-full block"
    :style="{ height: `${h}px` }"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="chart-area-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" :stop-color="stroke" stop-opacity="0.12" />
        <stop offset="100%" :stop-color="stroke" stop-opacity="0" />
      </linearGradient>
    </defs>
    <path :d="areaPath" fill="url(#chart-area-grad)" />
    <path
      :d="linePath"
      :stroke="stroke"
      stroke-width="2"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
