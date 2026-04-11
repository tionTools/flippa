<script setup lang="ts">
import ProjectListSection from '@/components/project/ProjectListSection.vue'
import { getProjects, getFeaturedProjects } from '@/shared/mocks/projects'

const featuredProjects = getFeaturedProjects(3)
const allProjects = getProjects()
</script>

<template>
  <div class="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-16">
    <!-- Featured block -->
    <ProjectListSection
      title="Featured Projects"
      subtitle="Top picks from our marketplace this week."
      :projects="featuredProjects"
      :show-tabs="false"
      :show-view-all="false"
      :show-pagination="false"
    />

    <!-- All listings with tabs and pagination -->
    <ProjectListSection
      title="All Listings"
      subtitle="Browse every business available for acquisition."
      :projects="allProjects"
      :show-tabs="true"
      :show-view-all="false"
      :show-pagination="true"
      :page-size="6"
    />
  </div>
</template>
