<script setup lang="ts">
import type { Component } from 'vue'
import { Briefcase, AtSign, Play, Users, Camera } from '@lucide/vue'

interface InternalLink {
  type: 'internal'
  label: string
  to: string
}

interface PlaceholderLink {
  type: 'placeholder'
  label: string
}

interface ExternalLink {
  type: 'external'
  label: string
  href: string
}

type FooterLink = InternalLink | PlaceholderLink | ExternalLink

interface FooterGroup {
  title: string
  links: FooterLink[]
}

interface SocialLink {
  label: string
  href: string
  icon: Component
}

const groups: FooterGroup[] = [
  {
    title: 'Marketplace',
    links: [
      { type: 'internal', label: 'Browse Projects', to: '/projects' },
      { type: 'placeholder', label: 'Featured Listings' },
      { type: 'placeholder', label: 'Categories' },
      { type: 'internal', label: 'How It Works', to: '/#how-it-works' },
      { type: 'placeholder', label: 'For Sellers' },
      { type: 'placeholder', label: 'For Buyers' },
    ],
  },
  {
    title: 'Company',
    links: [
      { type: 'placeholder', label: 'About Us' },
      { type: 'placeholder', label: 'Team' },
      { type: 'placeholder', label: 'Careers' },
      { type: 'internal', label: 'Press', to: '/#press' },
      { type: 'placeholder', label: 'Contact' },
      { type: 'placeholder', label: 'Partners' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { type: 'placeholder', label: 'Blog' },
      { type: 'placeholder', label: 'Insights' },
      { type: 'placeholder', label: 'Market Reports' },
      { type: 'placeholder', label: 'Buyer Guides' },
      { type: 'placeholder', label: 'Seller Guides' },
      { type: 'placeholder', label: 'FAQ' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { type: 'placeholder', label: 'Terms of Service' },
      { type: 'placeholder', label: 'Privacy Policy' },
      { type: 'placeholder', label: 'Cookie Policy' },
      { type: 'placeholder', label: 'Risk Disclosure' },
      { type: 'placeholder', label: 'Escrow & Payments' },
      { type: 'placeholder', label: 'Listing Rules' },
    ],
  },
  {
    title: 'Support',
    links: [
      { type: 'placeholder', label: 'Help Center' },
      { type: 'placeholder', label: 'Contact Support' },
      { type: 'placeholder', label: 'Report an Issue' },
      { type: 'placeholder', label: 'Trust & Safety' },
      { type: 'placeholder', label: 'Verification' },
      { type: 'placeholder', label: 'Account Settings' },
    ],
  },
]

const socialLinks: SocialLink[] = [
  { label: 'LinkedIn', href: '#', icon: Briefcase },
  { label: 'X', href: '#', icon: AtSign },
  { label: 'YouTube', href: '#', icon: Play },
  { label: 'Facebook', href: '#', icon: Users },
  { label: 'Instagram', href: '#', icon: Camera },
]
</script>

<template>
  <footer class="border-t border-gray-200 mt-16">
    <div class="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-10">

      <!-- Brand + social -->
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-1">
          <span class="text-base font-semibold text-gray-900">Flippa</span>
          <p class="text-sm text-gray-500 max-w-sm">
            The marketplace for buying and selling premium digital businesses, SaaS products, and online assets.
          </p>
        </div>
        <div class="flex items-center gap-4">
          <a
            v-for="social in socialLinks"
            :key="social.label"
            :href="social.href"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 transition-colors"
          >
            <component :is="social.icon" :size="13" />
            {{ social.label }}
          </a>
        </div>
      </div>

      <!-- Link groups -->
      <div class="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
        <div v-for="group in groups" :key="group.title" class="flex flex-col gap-3">
          <span class="text-xs font-semibold uppercase tracking-wider text-gray-400">
            {{ group.title }}
          </span>
          <ul class="flex flex-col gap-2">
            <li v-for="link in group.links" :key="link.label">
              <RouterLink
                v-if="link.type === 'internal'"
                :to="link.to"
                class="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                {{ link.label }}
              </RouterLink>
              <span
                v-else-if="link.type === 'placeholder'"
                class="text-sm text-gray-400 cursor-default"
              >
                {{ link.label }}
              </span>
              <a
                v-else
                :href="link.href"
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="flex flex-col gap-1 pt-6 border-t border-gray-100">
        <span class="text-sm text-gray-500">© 2026 Flippa. All rights reserved.</span>
        <span class="text-xs text-gray-400">
          Marketplace for premium digital businesses and online assets. All transactions are subject to our Terms of Service.
        </span>
      </div>

    </div>
  </footer>
</template>
