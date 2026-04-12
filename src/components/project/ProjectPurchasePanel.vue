<script setup lang="ts">
import type { ProjectRecord } from '@/types/project'
import { useAuth, SignInButton } from '@clerk/vue'
import { HandCoins, Gavel, Heart, ShieldCheck, LogIn } from '@lucide/vue'

defineProps<{
  project: ProjectRecord
}>()

const { isSignedIn } = useAuth()

function formatPrice(value: number | null): string {
  if (value == null) return 'Price on request'
  return '$' + value.toLocaleString('en-US')
}
</script>

<template>
  <div class="flex flex-col gap-5 p-6 rounded-2xl border border-gray-200 bg-white shadow-sm">
    <!-- Price -->
    <div class="flex flex-col gap-1">
      <span class="text-xs text-gray-400 font-medium uppercase tracking-wide">Asking price</span>
      <span class="text-3xl font-extrabold text-gray-900">
        {{ formatPrice(project.asking_price) }}
      </span>
      <span v-if="project.asking_price && project.monthly_revenue" class="text-xs text-gray-400">
        {{ Math.round(project.asking_price / project.monthly_revenue) }}x monthly revenue
      </span>
    </div>

    <hr class="border-gray-100" />

    <!-- CTA buttons (signed in) -->
    <div v-if="isSignedIn" class="flex flex-col gap-2.5">
      <button
        class="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition-colors cursor-pointer"
      >
        <HandCoins :size="16" />
        Make an offer
      </button>
      <button
        class="flex items-center justify-center gap-2 w-full px-4 py-3 border border-gray-200 text-gray-800 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
      >
        <Gavel :size="16" />
        Place a bid
      </button>
      <button
        class="flex items-center justify-center gap-2 w-full px-4 py-3 border border-gray-200 text-gray-500 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
      >
        <Heart :size="16" />
        Express interest
      </button>
    </div>

    <!-- CTA buttons (not signed in) -->
    <div v-else class="flex flex-col gap-3">
      <p class="text-xs text-gray-500 text-center">Sign in to make an offer or place a bid</p>
      <SignInButton mode="modal">
        <button
          class="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition-colors cursor-pointer"
        >
          <LogIn :size="16" />
          Sign in to purchase
        </button>
      </SignInButton>
    </div>

    <!-- Trust note -->
    <div class="flex items-start gap-2.5 pt-1 border-t border-gray-100">
      <ShieldCheck :size="16" class="mt-0.5 shrink-0 text-emerald-500" />
      <p class="text-xs text-gray-400 leading-relaxed">
        Transactions are protected by Flippa Escrow. Funds are only released once all transfer
        conditions are met.
      </p>
    </div>
  </div>
</template>
