<script setup lang="ts">
import { sellingTrack, buyingTrack } from '@/shared/mocks/howItWorks'
import { StepItem } from '@/shared/ui'
import HiW0 from '@/assets/hiw-bg-0.jpg'
import HiW1 from '@/assets/hiw-bg-1.jpg'


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
      <div v-for="(track, index) in tracks" :key="track.title" class="flex flex-col gap-6 p-6 rounded-xl"
        :style="{ backgroundImage: `url(${index ? HiW0 : HiW1})`, backgroundSize: 'cover', backgroundPosition: 'center right', backgroundRepeat: 'no-repeat' }">
        <div class="flex flex-col gap-1 bg-black/30 backdrop-blur-md px-4 py-3 rounded-xl">
          <h3 class="text-base font-semibold text-white">{{ track.title }}</h3>
          <p class="text-sm text-white/60">{{ track.subtitle }}</p>
        </div>

        <div class="flex flex-col gap-3">
          <div
            v-for="s in track.steps"
            :key="s.step"
            class="bg-black/30 backdrop-blur-md px-4 py-3 rounded-xl"
          >
            <StepItem :step="s.step" :title="s.title" :description="s.description" variant="light" />
          </div>
        </div>

        <RouterLink :to="track.cta.to"
          class="self-start text-sm font-medium text-white underline underline-offset-4 decoration-white/40 hover:decoration-white transition-colors">
          {{ track.cta.label }}
        </RouterLink>
      </div>
    </div>
  </section>
</template>
