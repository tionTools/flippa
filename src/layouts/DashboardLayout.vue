<script setup lang="ts">
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@clerk/vue'
import { UserButton } from '@clerk/vue'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar.vue'
import AppLogo from '@/components/shared/AppLogo.vue'

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
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Sidebar — desktop only -->
    <DashboardSidebar class="hidden lg:flex lg:flex-col" />

    <!-- Content area -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Mobile top bar (hidden on lg+) -->
      <header
        class="lg:hidden sticky top-0 z-10 h-14 bg-white border-b border-gray-100 flex items-center justify-between px-4 shrink-0"
      >
        <AppLogo />
        <UserButton />
      </header>

      <!-- Page content -->
      <main class="flex-1 p-6 lg:p-8">
        <RouterView />
      </main>
    </div>
  </div>
</template>
