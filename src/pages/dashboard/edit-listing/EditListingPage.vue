<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { AlertCircle, Loader } from '@lucide/vue'
import ProjectForm from '@/components/project/ProjectForm.vue'
import { getProjectById, updateProject } from '@/api/projects'
import { recordToFormValues } from '@/types/project'
import type { ProjectFormValues } from '@/types/project'
import type { ProjectFormData } from '@/schemas/project'

const route = useRoute()
const router = useRouter()

const id = computed(() => String(route.params.id))

const fetching = ref(true)
const saving = ref(false)
const fetchError = ref<string | null>(null)
const saveError = ref<string | null>(null)
const initialValues = ref<ProjectFormValues | null>(null)

onMounted(async () => {
  try {
    const record = await getProjectById(id.value)
    initialValues.value = recordToFormValues(record)
  } catch {
    fetchError.value = 'Project not found or you do not have access.'
  } finally {
    fetching.value = false
  }
})

async function handleSubmit(data: ProjectFormData) {
  saving.value = true
  saveError.value = null
  try {
    await updateProject(id.value, data)
    router.push({ name: 'dashboard-listings' })
  } catch {
    saveError.value = 'Failed to save changes. Please try again.'
  } finally {
    saving.value = false
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
      <h1 class="text-xl font-bold text-gray-900">Edit Listing</h1>
      <p class="text-sm text-gray-400 mt-1">Update your project details.</p>
    </div>

    <!-- Loading state -->
    <div
      v-if="fetching"
      class="flex items-center justify-center py-20 text-gray-400"
    >
      <Loader :size="20" class="animate-spin" />
    </div>

    <!-- Fetch error -->
    <div
      v-else-if="fetchError"
      class="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-700"
    >
      <AlertCircle :size="16" class="shrink-0" />
      {{ fetchError }}
    </div>

    <!-- Form -->
    <template v-else-if="initialValues">
      <div
        v-if="saveError"
        class="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-700"
      >
        <AlertCircle :size="16" class="shrink-0" />
        {{ saveError }}
      </div>

      <ProjectForm
        mode="edit"
        :initial-values="initialValues"
        :loading="saving"
        @submit="handleSubmit"
        @cancel="handleCancel"
      />
    </template>
  </div>
</template>
