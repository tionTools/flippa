<script setup lang="ts">
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/vue'
import { Vue3Marquee } from 'vue3-marquee'
import { LogIn, UserPlus, LayoutDashboard } from '@lucide/vue'
import SearchBar from './SearchBar.vue'
import AppLogo from '@/components/shared/AppLogo.vue'

interface TickerItem {
  id: string
  name: string
  price: string
  change: string
  trend: 'up' | 'down'
}

const tickerItems: TickerItem[] = [
  { id: '584476ff-17d8-4847-ae7a-f57200236514', name: 'CloudSync AI', price: '$420,000', change: '+12.4%', trend: 'up' },
  { id: '1e75bea8-7266-437b-81ca-7a004e0a187b', name: 'StorePilot', price: '$1,200,000', change: '+8.1%', trend: 'up' },
  { id: '19201259-b9c2-4f97-b227-adb338a6a091', name: 'AdFlow Pro', price: '$780,000', change: '+15.7%', trend: 'up' },
  { id: '1f0b8141-ef24-4a56-bd8b-754ee2f23c1e', name: 'NestMetrics', price: '$340,000', change: '+6.3%', trend: 'up' },
  { id: 'ef4d0fdc-4f8c-47a7-8973-beddd53acd03', name: 'SendLoop', price: '$2,100,000', change: '+9.2%', trend: 'up' },
]
</script>

<template>
  <!-- Ticker: dark, normal document flow -->
  <div class="h-8 bg-indigo-950 border-b border-indigo-900 flex items-center overflow-hidden text-xs">
    <Vue3Marquee :duration="40" :pause-on-hover="true" :clone="true">
      <RouterLink
        v-for="item in tickerItems"
        :key="item.id"
        :to="`/projects/${item.id}`"
        class="flex items-center gap-1.5 px-6 text-indigo-300 hover:text-white transition-colors"
      >
        <span class="font-medium text-white">{{ item.name }}</span>
        <span class="text-indigo-200">{{ item.price }}</span>
        <span class="text-green-400">{{ item.change }}</span>
        <span class="text-green-400">↑</span>
        <span class="text-indigo-800 px-2">·</span>
      </RouterLink>
    </Vue3Marquee>
  </div>

  <!-- Nav: dark, sticky -->
  <header class="sticky top-0 z-10 bg-indigo-950/90 backdrop-blur-md border-b border-indigo-900">
    <div class="h-16 flex items-center px-6 gap-4 justify-between">
      <AppLogo variant="light" class="shrink-0" />

      <nav class="flex items-center gap-1 shrink-0">
        <RouterLink
          to="/projects"
          class="px-3 py-1.5 rounded-lg text-sm text-indigo-200 hover:text-white hover:bg-white/10 transition-colors"
          active-class="text-white bg-white/15 font-medium"
        >
          Projects
        </RouterLink>
        <a
          href="/#press"
          class="px-3 py-1.5 rounded-lg text-sm text-indigo-200 hover:text-white hover:bg-white/10 transition-colors"
        >
          Press
        </a>
        <a
          href="/#how-it-works"
          class="px-3 py-1.5 rounded-lg text-sm text-indigo-200 hover:text-white hover:bg-white/10 transition-colors"
        >
          How It Works
        </a>
      </nav>

      <SearchBar class="flex-1 hidden md:flex max-w-sm lg:max-w-md" />

      <div class="flex items-center gap-3 shrink-0">
        <Show when="signed-out">
          <SignInButton>
            <button class="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm text-indigo-100 hover:bg-white/10 hover:text-white transition-colors">
              <LogIn :size="14" />
              Sign in
            </button>
          </SignInButton>
          <SignUpButton>
            <button class="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm bg-white text-indigo-950 hover:bg-indigo-50 transition-colors font-medium">
              <UserPlus :size="14" />
              Sign up
            </button>
          </SignUpButton>
        </Show>
        <Show when="signed-in">
          <RouterLink
            to="/dashboard"
            class="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm text-indigo-100 hover:bg-white/10 hover:text-white transition-colors"
          >
            <LayoutDashboard :size="14" />
            Dashboard
          </RouterLink>
          <UserButton />
        </Show>
      </div>
    </div>
  </header>
</template>
