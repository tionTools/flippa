import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { clerkPlugin, useAuth } from '@clerk/vue'
import './global.css'

import App from './App.vue'
import router from './router'

const PUBLISHABLE_KEY = 'pk_test_c3RlcmxpbmctamF5YmlyZC00Mi5jbGVyay5hY2NvdW50cy5kZXYk'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(clerkPlugin, { publishableKey: PUBLISHABLE_KEY })

// Centralized auth guard — uses app.runWithContext to access composables outside components
router.beforeEach((to) => {
  if (!to.meta.requiresAuth) return true

  const { isSignedIn, isLoaded } = app.runWithContext(() => useAuth())

  // Clerk is still initializing — let through, DashboardLayout handles the redirect
  if (!isLoaded.value) return true

  if (!isSignedIn.value) return { name: 'home' }

  return true
})

app.mount('#app')
