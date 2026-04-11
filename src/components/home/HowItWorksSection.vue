<script setup lang="ts">
import { sellingTrack, buyingTrack } from '@/shared/mocks/howItWorks'
import { StepItem } from '@/shared/ui'

const tracks = [sellingTrack, buyingTrack]
</script>

<template>
  <section id="how-it-works" class="flex flex-col gap-10 py-16 border-t border-gray-100">
    <div class="flex flex-col gap-2">
      <h2 class="text-2xl font-semibold text-gray-900">How It Works</h2>
      <p class="text-sm text-gray-500">
        A simple, structured process for both sides of the deal.
      </p>
    </div>

    <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div
        v-for="track in tracks"
        :key="track.title"
        class="flex flex-col gap-6 p-6 border border-gray-200 rounded-xl"
      >
        <div class="flex flex-col gap-1">
          <h3 class="text-base font-semibold text-gray-900">{{ track.title }}</h3>
          <p class="text-sm text-gray-500">{{ track.subtitle }}</p>
        </div>

        <div class="flex flex-col gap-5">
          <StepItem
            v-for="s in track.steps"
            :key="s.step"
            :step="s.step"
            :title="s.title"
            :description="s.description"
          />
        </div>

        <RouterLink
          :to="track.cta.to"
          class="self-start text-sm font-medium text-gray-900 underline underline-offset-4"
        >
          {{ track.cta.label }}
        </RouterLink>
      </div>
    </div>
  </section>
</template>
