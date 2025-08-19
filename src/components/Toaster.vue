<template>
  <div class="fixed top-24 right-4 z-50 space-y-2 pointer-events-none">
    <div
      v-for="t in toast.toasts"
      :key="t.id"
      class="pointer-events-auto w-80 rounded-xl border p-3 shadow-lg bg-white/95 backdrop-blur"
      :class="{
        'border-green-200': t.type === 'success',
        'border-red-200': t.type === 'error',
        'border-gray-200': !t.type || t.type === 'info',
      }"
    >
      <div class="flex items-start gap-2">
        <span
          class="mt-1 h-2 w-2 rounded-full"
          :class="{
            'bg-green-500': t.type === 'success',
            'bg-red-500': t.type === 'error',
            'bg-gray-400': !t.type || t.type === 'info',
          }"
        />
        <div class="flex-1">
          <p v-if="t.title" class="text-sm font-medium">{{ t.title }}</p>
          <p class="text-sm text-gray-700">{{ t.message }}</p>
        </div>
        <button
          class="text-gray-400 hover:text-gray-700"
          @click="toast.hide(t.id)"
        >
          ✕
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToastStore } from "../stores/toast";
const toast = useToastStore();
</script>
