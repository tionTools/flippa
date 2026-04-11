import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Public routes — MainLayout
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/pages/home/HomePage.vue'),
        },
        {
          path: 'projects',
          name: 'projects',
          component: () => import('@/pages/projects/ProjectsPage.vue'),
        },
        {
          path: 'projects/:id',
          name: 'project',
          component: () => import('@/pages/project/ProjectPage.vue'),
        },
      ],
    },

    // Protected routes — DashboardLayout
    {
      path: '/dashboard',
      component: DashboardLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('@/pages/dashboard/DashboardPage.vue'),
        },
        {
          path: 'listings/new',
          name: 'dashboard-listing-new',
          component: () => import('@/pages/dashboard/new-listing/NewListingPage.vue'),
        },
        {
          path: 'listings/:id/edit',
          name: 'dashboard-listing-edit',
          component: () => import('@/pages/dashboard/edit-listing/EditListingPage.vue'),
        },
      ],
    },

    // 404 — DefaultLayout
    {
      path: '/:pathMatch(.*)*',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'not-found',
          component: () => import('@/pages/not-found/NotFoundPage.vue'),
        },
      ],
    },
  ],
})

export default router
