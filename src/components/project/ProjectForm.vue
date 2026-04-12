<script setup lang="ts">
import { ref, watch } from 'vue'
import { BaseInput, BaseTextarea, BaseSelect } from '@/shared/ui'
import { categories } from '@/shared/mocks/categories'
import { projectSchema } from '@/schemas/project'
import { EMPTY_FORM_VALUES } from '@/types/project'
import type { ProjectFormData } from '@/schemas/project'
import type { ProjectFormValues } from '@/types/project'
import { ImageIcon, Star } from '@lucide/vue'
import ProjectImage from '@/components/shared/ProjectImage.vue'

const props = defineProps<{
  mode: 'create' | 'edit'
  initialValues?: Partial<ProjectFormValues>
  loading?: boolean
}>()

const emit = defineEmits<{
  submit: [data: ProjectFormData]
  cancel: []
}>()

const form = ref<ProjectFormValues>({ ...EMPTY_FORM_VALUES, ...props.initialValues })
const errors = ref<Partial<Record<keyof ProjectFormValues, string>>>({})

watch(
  () => props.initialValues,
  (vals) => {
    if (vals) form.value = { ...EMPTY_FORM_VALUES, ...vals }
  },
  { deep: true },
)

const categoryOptions = categories
  .filter((c) => c.id !== 'all')
  .map((c) => ({ value: c.id, label: c.label }))

const statusOptions = [
  { value: 'draft', label: 'Draft' },
  { value: 'active', label: 'Active' },
  { value: 'under-offer', label: 'Under Offer' },
]

function handleSubmit() {
  errors.value = {}
  const result = projectSchema.safeParse(form.value)

  if (!result.success) {
    for (const issue of result.error.issues) {
      const field = issue.path[0] as keyof ProjectFormValues
      if (field && !errors.value[field]) {
        errors.value[field] = issue.message
      }
    }
    // Scroll to first error
    const firstError = document.querySelector('[data-field-error]')
    firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    return
  }

  emit('submit', result.data)
}
</script>

<template>
  <form class="flex flex-col gap-5" novalidate @submit.prevent="handleSubmit">
    <!-- ── Section 1: Basic Information ──────────────────────────────────── -->
    <section class="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-5">
      <h2 class="text-sm font-semibold text-gray-900">Basic Information</h2>

      <!-- Title -->
      <div class="flex flex-col gap-1.5">
        <label for="title" class="text-xs font-medium text-gray-600">
          Title <span class="text-red-400">*</span>
        </label>
        <BaseInput
          id="title"
          v-model="form.title"
          placeholder="e.g. CloudSync AI"
        />
        <p v-if="errors.title" data-field-error class="text-xs text-red-500">
          {{ errors.title }}
        </p>
      </div>

      <!-- Category + Status -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="flex flex-col gap-1.5">
          <label for="category" class="text-xs font-medium text-gray-600">
            Category <span class="text-red-400">*</span>
          </label>
          <BaseSelect
            id="category"
            v-model="form.category"
            :options="categoryOptions"
            placeholder="Select category"
          />
          <p v-if="errors.category" data-field-error class="text-xs text-red-500">
            {{ errors.category }}
          </p>
        </div>

        <div class="flex flex-col gap-1.5">
          <label for="status" class="text-xs font-medium text-gray-600">Status</label>
          <BaseSelect
            id="status"
            v-model="form.status"
            :options="statusOptions"
          />
        </div>
      </div>

      <!-- Short description -->
      <div class="flex flex-col gap-1.5">
        <label for="short_description" class="text-xs font-medium text-gray-600">
          Short Description
          <span class="text-gray-400 font-normal">(shown on listing card, max 300 chars)</span>
        </label>
        <BaseTextarea
          id="short_description"
          v-model="form.short_description"
          :rows="2"
          placeholder="One-paragraph summary of the business..."
        />
        <p v-if="errors.short_description" data-field-error class="text-xs text-red-500">
          {{ errors.short_description }}
        </p>
      </div>

      <!-- Full description -->
      <div class="flex flex-col gap-1.5">
        <label for="full_description" class="text-xs font-medium text-gray-600">
          Full Description
        </label>
        <BaseTextarea
          id="full_description"
          v-model="form.full_description"
          :rows="6"
          placeholder="Detailed overview of the business, its history, and what makes it unique..."
        />
      </div>
    </section>

    <!-- ── Section 2: Financial Data ─────────────────────────────────────── -->
    <section class="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-5">
      <h2 class="text-sm font-semibold text-gray-900">Financial Data</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="flex flex-col gap-1.5">
          <label for="asking_price" class="text-xs font-medium text-gray-600">Asking Price ($)</label>
          <BaseInput
            id="asking_price"
            v-model="form.asking_price"
            type="number"
            placeholder="e.g. 420000"
          />
          <p v-if="errors.asking_price" data-field-error class="text-xs text-red-500">
            {{ errors.asking_price }}
          </p>
        </div>

        <div class="flex flex-col gap-1.5">
          <label for="revenue_multiple" class="text-xs font-medium text-gray-600">
            Revenue Multiple (x)
          </label>
          <BaseInput
            id="revenue_multiple"
            v-model="form.revenue_multiple"
            type="number"
            placeholder="e.g. 3.5"
          />
          <p v-if="errors.revenue_multiple" data-field-error class="text-xs text-red-500">
            {{ errors.revenue_multiple }}
          </p>
        </div>

        <div class="flex flex-col gap-1.5">
          <label for="monthly_revenue" class="text-xs font-medium text-gray-600">
            Monthly Revenue ($)
          </label>
          <BaseInput
            id="monthly_revenue"
            v-model="form.monthly_revenue"
            type="number"
            placeholder="e.g. 14200"
          />
        </div>

        <div class="flex flex-col gap-1.5">
          <label for="monthly_profit" class="text-xs font-medium text-gray-600">
            Monthly Profit ($)
          </label>
          <BaseInput
            id="monthly_profit"
            v-model="form.monthly_profit"
            type="number"
            placeholder="e.g. 8100"
          />
        </div>
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="monetization_model" class="text-xs font-medium text-gray-600">
          Monetization Model
        </label>
        <BaseTextarea
          id="monetization_model"
          v-model="form.monetization_model"
          :rows="3"
          placeholder="Describe how the business generates revenue..."
        />
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="business_model" class="text-xs font-medium text-gray-600">
          Business Model
        </label>
        <BaseTextarea
          id="business_model"
          v-model="form.business_model"
          :rows="3"
          placeholder="Describe the overall business model (B2B, B2C, SaaS, marketplace...)..."
        />
      </div>
    </section>

    <!-- ── Section 3: Metrics & Details ──────────────────────────────────── -->
    <section class="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-5">
      <h2 class="text-sm font-semibold text-gray-900">Metrics & Details</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="flex flex-col gap-1.5">
          <label for="monthly_traffic" class="text-xs font-medium text-gray-600">
            Monthly Traffic (sessions)
          </label>
          <BaseInput
            id="monthly_traffic"
            v-model="form.monthly_traffic"
            type="number"
            placeholder="e.g. 28000"
          />
        </div>

        <div class="flex flex-col gap-1.5">
          <label for="total_users" class="text-xs font-medium text-gray-600">
            Total Users / Customers
          </label>
          <BaseInput
            id="total_users"
            v-model="form.total_users"
            type="number"
            placeholder="e.g. 3800"
          />
        </div>

        <div class="flex flex-col gap-1.5">
          <label for="app_installs" class="text-xs font-medium text-gray-600">
            App Installs
            <span class="text-gray-400 font-normal">(if applicable)</span>
          </label>
          <BaseInput
            id="app_installs"
            v-model="form.app_installs"
            type="number"
            placeholder="e.g. 80000"
          />
        </div>

        <div class="flex flex-col gap-1.5">
          <label for="growth_rate" class="text-xs font-medium text-gray-600">
            Growth Rate (% MoM)
          </label>
          <BaseInput
            id="growth_rate"
            v-model="form.growth_rate"
            type="number"
            placeholder="e.g. 8.5"
          />
        </div>

        <div class="flex flex-col gap-1.5">
          <label for="founded_year" class="text-xs font-medium text-gray-600">Founded Year</label>
          <BaseInput
            id="founded_year"
            v-model="form.founded_year"
            type="number"
            placeholder="e.g. 2022"
          />
          <p v-if="errors.founded_year" data-field-error class="text-xs text-red-500">
            {{ errors.founded_year }}
          </p>
        </div>

        <div class="flex flex-col gap-1.5">
          <label for="team_size" class="text-xs font-medium text-gray-600">Team Size (FTE)</label>
          <BaseInput
            id="team_size"
            v-model="form.team_size"
            type="number"
            placeholder="e.g. 2"
          />
        </div>
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="tech_stack" class="text-xs font-medium text-gray-600">
          Tech Stack
          <span class="text-gray-400 font-normal">(comma-separated)</span>
        </label>
        <BaseInput
          id="tech_stack"
          v-model="form.tech_stack"
          placeholder="e.g. Vue, Node.js, PostgreSQL, AWS"
        />
      </div>
    </section>

    <!-- ── Section 4: Additional Details ─────────────────────────────────── -->
    <section class="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-5">
      <h2 class="text-sm font-semibold text-gray-900">Additional Details</h2>

      <div class="flex flex-col gap-1.5">
        <label for="what_is_included" class="text-xs font-medium text-gray-600">
          What's Included
          <span class="text-gray-400 font-normal">(one item per line)</span>
        </label>
        <BaseTextarea
          id="what_is_included"
          v-model="form.what_is_included"
          :rows="5"
          placeholder="Full source code and infrastructure&#10;All customer data and account history&#10;Domain, hosting, and SSL accounts&#10;Documentation and SOPs"
        />
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="growth_opportunities" class="text-xs font-medium text-gray-600">
          Growth Opportunities
        </label>
        <BaseTextarea
          id="growth_opportunities"
          v-model="form.growth_opportunities"
          :rows="4"
          placeholder="Describe the main growth levers available to a new owner..."
        />
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="risks_and_notes" class="text-xs font-medium text-gray-600">
          Risks & Notes
        </label>
        <BaseTextarea
          id="risks_and_notes"
          v-model="form.risks_and_notes"
          :rows="3"
          placeholder="Any known risks, dependencies, or important context for buyers..."
        />
      </div>
    </section>

    <!-- ── Section 5: Listing Image ───────────────────────────────────────── -->
    <section class="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-5">
      <h2 class="text-sm font-semibold text-gray-900">Listing Image</h2>

      <!-- File upload placeholder -->
      <div
        class="flex flex-col items-center justify-center gap-2 py-8 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 text-center cursor-not-allowed opacity-60"
      >
        <ImageIcon :size="20" class="text-gray-400" />
        <p class="text-xs text-gray-400 font-medium">File upload — coming soon</p>
        <p class="text-xs text-gray-300">Use the URL field below for now</p>
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="image_url" class="text-xs font-medium text-gray-600">Image URL</label>
        <BaseInput
          id="image_url"
          v-model="form.image_url"
          placeholder="https://example.com/image.png"
        />
        <p v-if="errors.image_url" data-field-error class="text-xs text-red-500">
          {{ errors.image_url }}
        </p>
      </div>

      <!-- Preview -->
      <div class="flex flex-col gap-1.5">
        <span class="text-xs font-medium text-gray-600">Preview</span>
        <div class="aspect-video w-full max-w-sm rounded-xl overflow-hidden border border-gray-100">
          <ProjectImage :src="form.image_url || null" alt="Image preview" />
        </div>
      </div>
    </section>

    <!-- ── Section 6: Options ─────────────────────────────────────────────── -->
    <section class="bg-white rounded-2xl border border-gray-100 p-6">
      <label class="flex items-start gap-3 cursor-pointer group">
        <input
          v-model="form.is_featured"
          type="checkbox"
          class="mt-0.5 w-4 h-4 rounded border-gray-300 accent-gray-900 cursor-pointer"
        />
        <div class="flex flex-col gap-0.5">
          <span class="flex items-center gap-1.5 text-sm font-medium text-gray-900">
            <Star :size="14" class="text-amber-400" />
            Featured Listing
          </span>
          <span class="text-xs text-gray-400">
            Featured listings are highlighted in search results and shown first on the homepage.
          </span>
        </div>
      </label>
    </section>

    <!-- ── Footer: actions ────────────────────────────────────────────────── -->
    <div class="flex items-center justify-end gap-3 pt-1">
      <button
        type="button"
        class="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
        @click="emit('cancel')"
      >
        Cancel
      </button>
      <button
        type="submit"
        :disabled="loading"
        class="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-gray-900 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        <span v-if="loading" class="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
        {{ mode === 'create' ? 'Create Listing' : 'Save Changes' }}
      </button>
    </div>
  </form>
</template>
