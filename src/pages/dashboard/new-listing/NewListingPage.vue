<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { AlertCircle } from '@lucide/vue'

import ProjectForm from '@/components/project/ProjectForm.vue'
import { createProject } from '@/api/projects'
import type { ProjectFormData } from '@/schemas/project'

const router = useRouter()

const loading = ref(false)
const serverError = ref<string | null>(null)

async function handleSubmit(data: ProjectFormData) {
  loading.value = true
  serverError.value = null
  try {
    await createProject(data)
    router.push({ name: 'dashboard-listings' })
  } catch {
    serverError.value = 'Failed to create listing. Please try again.'
  } finally {
    loading.value = false
  }
}

function handleCancel() {
  router.push({ name: 'dashboard-listings' })
}
</script>

<template>
  <div class="flex flex-col gap-6 max-w-3xl">
    <!-- Page header -->
    <div>
      <h1 class="text-xl font-bold text-gray-900">Create Listing</h1>
      <p class="text-sm text-gray-400 mt-1">Add a new project to your portfolio.</p>
    </div>

    <!-- Server error -->
    <div
      v-if="serverError"
      class="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-700"
    >
      <AlertCircle :size="16" class="shrink-0" />
      {{ serverError }}
    </div>

    <ProjectForm mode="create" :loading="loading" @submit="handleSubmit" @cancel="handleCancel" />
  </div>
</template>
