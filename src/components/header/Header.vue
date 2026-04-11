<script setup lang="ts">
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/vue'
</script>

<template>
  <header class="fixed top-0 inset-x-0 z-10 h-16 bg-white border-b border-gray-100 flex items-center px-6 gap-8">
    <RouterLink to="/" class="text-sm font-semibold text-gray-900 shrink-0">
      Flippa
    </RouterLink>

    <nav class="flex items-center gap-1 flex-1">
      <RouterLink
        to="/projects"
        class="px-3 py-1.5 rounded-lg text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
        active-class="text-gray-900 bg-gray-100 font-medium"
      >
        Projects
      </RouterLink>
      <Show when="signed-in">
        <RouterLink
          to="/dashboard"
          class="px-3 py-1.5 rounded-lg text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          active-class="text-gray-900 bg-gray-100 font-medium"
        >
          Dashboard
        </RouterLink>
      </Show>
    </nav>

    <div class="flex items-center gap-3 shrink-0">
      <Show when="signed-out">
        <SignInButton>
          <button class="px-4 py-1.5 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors">
            Sign in
          </button>
        </SignInButton>
        <SignUpButton>
          <button class="px-4 py-1.5 rounded-lg text-sm bg-gray-900 text-white hover:bg-gray-700 transition-colors">
            Sign up
          </button>
        </SignUpButton>
      </Show>
      <Show when="signed-in">
        <UserButton />
      </Show>
    </div>
  </header>
</template>
