<script setup lang="ts">
import { heroContent } from '@/shared/mocks/hero'
import { StatItem } from '@/shared/ui'
import { SignInButton, useAuth } from '@clerk/vue'
import { ArrowRight, LayoutDashboard, LogIn } from '@lucide/vue'
import heroBg from '@/assets/hero-bg.jpg'

const { isSignedIn } = useAuth()
</script>

<template>
  <section class="relative">
    <img
      :src="heroBg"
      alt=""
      aria-hidden="true"
      fetchpriority="high"
      class="absolute inset-0 w-full h-full object-cover object-right"
    />
    <div class="relative max-w-6xl mx-auto flex flex-col gap-10 py-20 overflow-hidden px-6">
      <div class="flex flex-col gap-4 max-w-2xl">
        <h1 class="text-5xl font-bold tracking-tight">
          {{ heroContent.headline }}
        </h1>
        <p class="text-xl text-gray-600">
          {{ heroContent.subheadline }}
        </p>
        <p class="text-sm text-gray-400">
          {{ heroContent.supportingText }}
        </p>
      </div>

      <div class="flex items-center gap-3">
        <RouterLink :to="heroContent.cta.primary.to"
          class="flex items-center gap-2 px-6 py-2.5 text-sm font-medium bg-gray-900 text-white rounded-lg">
          {{ heroContent.cta.primary.label }}
          <ArrowRight :size="15" />
        </RouterLink>
        <RouterLink v-if="isSignedIn" :to="heroContent.cta.secondary.to"
          class="flex items-center gap-2 px-6 py-2.5 text-sm font-medium border border-gray-300 text-gray-700 rounded-lg">
          <LayoutDashboard :size="15" />
          {{ heroContent.cta.secondary.label }}
        </RouterLink>
        <SignInButton v-else>
          <button
            class="flex items-center gap-2 px-6 py-2.5 text-sm font-medium border border-gray-300 text-gray-700 rounded-lg">
            <LogIn :size="15" />
            Get Started
          </button>
        </SignInButton>
      </div>

      <div class="flex items-start gap-12 pt-4 border-t border-gray-100">
        <StatItem v-for="stat in heroContent.stats" :key="stat.label" :value="stat.value" :label="stat.label" />
      </div>
    </div>
  </section>
</template>

