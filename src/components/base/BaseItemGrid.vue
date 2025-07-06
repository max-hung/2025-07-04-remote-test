<script setup lang="ts">
import { defineProps } from "vue"
defineProps<{ items: string[] }>()
</script>
<template>
  <div class="grid grid-cols-2 p-4">
    <div v-for="(item, index) in items" :key="index" class="bg-zinc-800 text-center py-10 border border-gray-500">
      {{ item }}
    </div>
  </div>
</template>
