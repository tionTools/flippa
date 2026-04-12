<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth, UserButton } from '@clerk/vue'
import { Menu, X } from '@lucide/vue'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar.vue'
import AppLogo from '@/components/shared/AppLogo.vue'

const { isSignedIn, isLoaded } = useAuth()
const router = useRouter()
const route = useRoute()

watch(
  isLoaded,
  (loaded) => {
    if (loaded && !isSignedIn.value) {
      router.replace({ name: 'home' })
    }
  },
  { immediate: true },
)

const drawerOpen = ref(false)

// Close drawer on navigation
watch(
  () => route.fullPath,
  () => {
    drawerOpen.value = false
  },
)
</script>

<template>
  <div class="h-screen bg-gray-50 flex overflow-hidden">
    <!-- Desktop sidebar (always visible on lg+) -->
    <DashboardSidebar class="hidden lg:flex lg:flex-col" />

    <!-- Mobile overlay -->
    <Transition name="overlay-fade">
      <div
        v-if="drawerOpen"
        class="fixed inset-0 z-20 bg-black/40 lg:hidden"
        @click="drawerOpen = false"
      />
    </Transition>

    <!-- Mobile drawer -->
    <Transition name="drawer-slide">
      <div v-if="drawerOpen" class="fixed inset-y-0 left-0 z-30 lg:hidden shadow-xl">
        <DashboardSidebar />
      </div>
    </Transition>

    <!-- Content area -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Mobile / tablet top bar (hidden on lg+) -->
      <header
        class="lg:hidden sticky top-0 z-10 h-14 bg-white border-b border-gray-100 flex items-center justify-between px-4 shrink-0"
      >
        <div class="flex items-center gap-2">
          <button
            class="p-2 -ml-1 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
            :aria-label="drawerOpen ? 'Close menu' : 'Open menu'"
            @click="drawerOpen = !drawerOpen"
          >
            <X v-if="drawerOpen" :size="20" />
            <Menu v-else :size="20" />
          </button>
          <AppLogo />
        </div>
        <UserButton />
      </header>

      <!-- Page content -->
      <main class="flex-1 overflow-y-auto p-6 lg:p-8">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
/* Overlay */
.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: opacity 0.2s ease;
}
.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
}

/* Drawer slide-in from left */
.drawer-slide-enter-active,
.drawer-slide-leave-active {
  transition: transform 0.25s ease;
}
.drawer-slide-enter-from,
.drawer-slide-leave-to {
  transform: translateX(-100%);
}
</style>
