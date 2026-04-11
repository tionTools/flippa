<script setup lang="ts">
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@clerk/vue'
import Header from '@/components/header/Header.vue'

const { isSignedIn, isLoaded } = useAuth()
const router = useRouter()

watch(
  isLoaded,
  (loaded) => {
    if (loaded && !isSignedIn.value) {
      router.replace({ name: 'home' })
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header />

    <div class="flex flex-1 pt-16">
      <aside class="w-56 shrink-0 border-r border-gray-100 px-3 py-6">
        <nav class="flex flex-col gap-1">
          <RouterLink
            to="/dashboard"
            class="px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            active-class="bg-gray-100 font-medium text-gray-900"
            :exact="true"
          >
            My Listings
          </RouterLink>
          <RouterLink
            to="/dashboard/listings/new"
            class="px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            active-class="bg-gray-100 font-medium text-gray-900"
          >
            Add Project
          </RouterLink>
        </nav>
      </aside>

      <main class="flex-1 p-8">
        <RouterView />
      </main>
    </div>
  </div>
</template>
