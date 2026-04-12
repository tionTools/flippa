<script setup lang="ts">
import Footer from '@/components/Footer.vue'
import Header from '@/components/header/Header.vue';
</script>

<template>
  <div class="min-h-screen flex flex-col main-bg">
    <Header />

    <main class="flex-1">
      <RouterView />
    </main>

    <Footer />
  </div>
</template>
