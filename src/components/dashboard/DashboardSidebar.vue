<script setup lang="ts">
import { useUser, useClerk } from '@clerk/vue'
import { LayoutDashboard, List, Activity, Plus, Settings, UserCircle, LogOut } from '@lucide/vue'
import AppLogo from '@/components/shared/AppLogo.vue'

const { user } = useUser()
const clerk = useClerk()

interface NavItem {
  to: string
  label: string
  icon: unknown
  exact?: boolean
  badge?: number
}

interface PlaceholderItem {
  label: string
  icon: unknown
}

const navItems: NavItem[] = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { to: '/dashboard/listings', label: 'My Listings', icon: List },
  { to: '/dashboard/activity', label: 'Activity', icon: Activity, badge: 5 },
  { to: '/dashboard/listings/new', label: 'Create Listing', icon: Plus },
]

const placeholderItems: PlaceholderItem[] = [
  { label: 'Settings', icon: Settings },
  { label: 'Profile', icon: UserCircle },
]

function signOut() {
  clerk.value?.signOut()
}
</script>

<template>
  <aside class="w-60 shrink-0 flex flex-col border-r border-gray-100 bg-white h-full">
    <!-- Logo -->
    <div class="h-16 flex items-center px-5 border-b border-gray-100">
      <AppLogo size="lg" />
    </div>

    <!-- Nav -->
    <nav class="flex flex-col gap-0.5 px-3 py-4 flex-1">
      <!-- Section label -->
      <span class="px-3 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-widest">
        Workspace
      </span>

      <!-- Active routes -->
      <RouterLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
        active-class="!text-gray-900 bg-gray-100 font-medium"
        :exact-active-class="item.exact ? '!text-gray-900 bg-gray-100 font-medium' : undefined"
      >
        <component :is="item.icon" :size="16" class="shrink-0" />
        <span class="flex-1">{{ item.label }}</span>
        <span
          v-if="item.badge"
          class="shrink-0 min-w-4 h-4 px-1 rounded text-[10px] font-bold bg-indigo-600 text-white flex items-center justify-center leading-none"
        >
          {{ item.badge }}
        </span>
      </RouterLink>

      <!-- Divider -->
      <hr class="my-3 border-gray-100" />

      <!-- Section label -->
      <span class="px-3 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-widest">
        Account
      </span>

      <!-- Placeholder items -->
      <div
        v-for="item in placeholderItems"
        :key="item.label"
        class="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-gray-300 cursor-default group"
      >
        <div class="flex items-center gap-2.5">
          <component :is="item.icon" :size="16" class="shrink-0" />
          {{ item.label }}
        </div>
        <span class="text-xs bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded font-medium">
          Soon
        </span>
      </div>
    </nav>

    <!-- User block -->
    <div class="border-t border-gray-100 p-3">
      <div class="flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-gray-50 transition-colors group">
        <!-- Avatar -->
        <img
          v-if="user?.imageUrl"
          :src="user.imageUrl"
          :alt="user?.fullName ?? 'User'"
          class="w-8 h-8 rounded-full shrink-0 object-cover"
        />
        <div
          v-else
          class="w-8 h-8 rounded-full shrink-0 bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-500"
        >
          {{ user?.firstName?.charAt(0) ?? '?' }}
        </div>

        <!-- Name + email -->
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900 truncate">
            {{ user?.fullName ?? user?.firstName ?? 'User' }}
          </p>
          <p class="text-xs text-gray-400 truncate">
            {{ user?.primaryEmailAddress?.emailAddress ?? '' }}
          </p>
        </div>

        <!-- Sign out -->
        <button
          class="shrink-0 p-1.5 rounded-lg text-gray-300 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
          title="Sign out"
          @click="signOut"
        >
          <LogOut :size="14" />
        </button>
      </div>
    </div>
  </aside>
</template>
