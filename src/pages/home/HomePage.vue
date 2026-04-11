<script setup lang="ts">
import HeroSection from '@/components/home/HeroSection.vue'
import ProjectListSection from '@/components/project/ProjectListSection.vue'
import PressSection from '@/components/home/PressSection.vue'
import HowItWorksSection from '@/components/home/HowItWorksSection.vue'
import { getProjects } from '@/shared/mocks/projects'

const allProjects = getProjects()
</script>

<template>
  <div class="max-w-6xl mx-auto px-6">
    <HeroSection />

    <div class="py-16 border-t border-gray-100">
      <ProjectListSection
        title="Featured Listings"
        subtitle="Handpicked businesses available for acquisition right now."
        :projects="allProjects"
        :show-tabs="true"
        :show-view-all="true"
        :show-pagination="false"
        :limit="3"
      />
    </div>

    <PressSection />
    <HowItWorksSection />
  </div>
</template>
