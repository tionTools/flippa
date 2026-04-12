<script setup lang="ts">
import { Activity } from '@lucide/vue'
// import { supabase } from '@/utils/supabase'
// import { onMounted } from 'vue'

// onMounted(async () => {
//   const deleteResult = await supabase
//     .from('test_items')
//     .delete()
//     .eq('id', 2)

//   console.log('delete error:', deleteResult.error)

//   const selectResult = await supabase
//     .from('test_items')
//     .select('*')
//     .order('id', { ascending: true })

//   console.log('all test_items after delete:', selectResult.data)
//   console.log('select error:', selectResult.error)
// })
</script>

<template>
  <div class="flex flex-col gap-6 max-w-7xl">
    <!-- Page header -->
    <div>
      <h1 class="text-xl font-bold text-gray-900">Activity</h1>
      <p class="text-sm text-gray-400 mt-1">All events across your portfolio in one place.</p>
    </div>

    <!-- Placeholder state -->
    <div
      class="flex flex-col items-center justify-center gap-4 py-20 px-5 bg-white rounded-2xl border border-gray-100 text-center">
      <span class="flex items-center justify-center w-12 h-12 rounded-2xl bg-gray-100 text-gray-400">
        <Activity :size="22" />
      </span>
      <div class="flex flex-col gap-1.5">
        <p class="text-sm font-semibold text-gray-900">Full activity feed coming soon</p>
        <p class="text-sm text-gray-400 max-w-sm">
          This section will show all bids, questions, deal updates, and listing events across your
          portfolio — filterable and searchable.
        </p>
      </div>
    </div>
  </div>
</template>
