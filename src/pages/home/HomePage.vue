<script setup lang="ts">
import HeroSection from '@/components/home/HeroSection.vue'
import HomeProjectsSection from '@/components/project/HomeProjectsSection.vue'
import PressSection from '@/components/home/PressSection.vue'
import HowItWorksSection from '@/components/home/HowItWorksSection.vue'
</script>

<template>
  <HeroSection />
  <div class="max-w-6xl mx-auto px-6">

    <div class="py-16 border-t border-gray-100">
      <HomeProjectsSection />
    </div>

    <HowItWorksSection />
    <PressSection />
  </div>
</template>
