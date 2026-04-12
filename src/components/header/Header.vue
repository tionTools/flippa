<script setup lang="ts">
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/vue'
import { Vue3Marquee } from 'vue3-marquee'
import { LogIn, UserPlus } from '@lucide/vue'
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
  { id: '1', name: 'CloudSync AI', price: '$420,000', change: '+12.4%', trend: 'up' },
  { id: '2', name: 'StorePilot', price: '$1,200,000', change: '+8.1%', trend: 'up' },
  { id: '3', name: 'AdFlow Pro', price: '$780,000', change: '+15.7%', trend: 'up' },
  { id: '4', name: 'NestMetrics', price: '$340,000', change: '+6.3%', trend: 'up' },
  { id: '5', name: 'SendLoop', price: '$2,100,000', change: '+9.2%', trend: 'up' },
]
</script>

<template>
  <header class="fixed top-0 inset-x-0 z-10 bg-white/80 backdrop-blur-md">
    <div class="h-8 border-b border-gray-100 flex items-center overflow-hidden text-xs text-gray-500">
      <Vue3Marquee :duration="40" :pause-on-hover="false" :clone="true">
        <div v-for="item in tickerItems" :key="item.id" class="flex items-center gap-1.5 px-6">
          <span class="font-medium text-gray-700">{{ item.name }}</span>
          <span>{{ item.price }}</span>
          <span class="text-green-600">{{ item.change }}</span>
          <span class="text-green-600">↑</span>
          <span class="text-gray-300 px-2">·</span>
        </div>
      </Vue3Marquee>
    </div>

    <div class="h-16 border-b border-gray-100 flex items-center px-6 gap-4 justify-between">
      <AppLogo class="w-32" />

      <nav class="flex items-center gap-1 shrink-0">
        <RouterLink to="/projects"
          class="px-3 py-1.5 rounded-lg text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          active-class="text-gray-900 bg-gray-100 font-medium">
          Projects
        </RouterLink>
        <a href="/#press"
          class="px-3 py-1.5 rounded-lg text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">
          Press
        </a>
        <a href="/#how-it-works"
          class="px-3 py-1.5 rounded-lg text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">
          How It Works
        </a>
        <Show when="signed-in">
          <RouterLink to="/dashboard"
            class="px-3 py-1.5 rounded-lg text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            active-class="text-gray-900 bg-gray-100 font-medium">
            Dashboard
          </RouterLink>
        </Show>
      </nav>

      <SearchBar class="flex-1 hidden md:flex max-w-sm lg:max-w-md" />

      <div class="flex items-center gap-3 shrink-0">
        <Show when="signed-out">
          <SignInButton>
            <button
              class="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors">
              <LogIn :size="14" />
              Sign in
            </button>
          </SignInButton>
          <SignUpButton>
            <button
              class="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm bg-gray-900 text-white hover:bg-gray-700 transition-colors">
              <UserPlus :size="14" />
              Sign up
            </button>
          </SignUpButton>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </div>
    </div>
  </header>
</template>
