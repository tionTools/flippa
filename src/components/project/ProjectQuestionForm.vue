<script setup lang="ts">
import { ref } from 'vue'
import { useAuth, SignInButton } from '@clerk/vue'
import { Send, LogIn } from '@lucide/vue'

const { isSignedIn } = useAuth()

const question = ref('')
const submitted = ref(false)

function handleSubmit() {
  if (!question.value.trim()) return
  submitted.value = true
  question.value = ''
}
</script>

<template>
  <div class="flex flex-col gap-4 p-6 rounded-2xl border border-gray-200 bg-white shadow-sm">
    <div class="flex flex-col gap-1">
      <h3 class="text-sm font-semibold text-gray-900">Ask the seller</h3>
      <p class="text-xs text-gray-400">Questions are answered within 24 hours.</p>
    </div>

    <!-- Success state -->
    <div
      v-if="submitted"
      class="flex flex-col items-center gap-2 py-4 text-center"
    >
      <span class="text-2xl">✓</span>
      <p class="text-sm font-medium text-gray-700">Question sent!</p>
      <p class="text-xs text-gray-400">The seller will respond to your message shortly.</p>
      <button
        class="mt-2 text-xs text-indigo-600 hover:underline cursor-pointer"
        @click="submitted = false"
      >
        Ask another question
      </button>
    </div>

    <!-- Form (signed in) -->
    <form v-else-if="isSignedIn" class="flex flex-col gap-3" @submit.prevent="handleSubmit">
      <textarea
        v-model="question"
        rows="4"
        placeholder="e.g. What's the monthly churn rate? Are there any pending liabilities?"
        class="w-full resize-none rounded-xl border border-gray-200 px-3.5 py-3 text-sm text-gray-800 placeholder-gray-300 outline-none focus:border-gray-400 transition-colors"
      />
      <button
        type="submit"
        :disabled="!question.trim()"
        class="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        <Send :size="14" />
        Send question
      </button>
    </form>

    <!-- Not signed in -->
    <div v-else class="flex flex-col gap-3">
      <p class="text-xs text-gray-500 text-center">Sign in to message the seller</p>
      <SignInButton mode="modal">
        <button
          class="flex items-center justify-center gap-2 w-full px-4 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <LogIn :size="14" />
          Sign in to ask
        </button>
      </SignInButton>
    </div>
  </div>
</template>
