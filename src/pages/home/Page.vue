<script setup lang="ts">

import { useUser } from '@clerk/vue'

const { isSignedIn, user, isLoaded } = useUser()
</script>

<template>
  <div class="flex items-center justify-center bg-white">

    <div class="text-center">
      <div v-if="!isLoaded">Loading...</div>

      <div v-else-if="!isSignedIn">Sign in to view this page</div>

      <div v-else>Hello {{ user?.id }}!</div>
    </div>
  </div>
</template>

<style scoped></style>
