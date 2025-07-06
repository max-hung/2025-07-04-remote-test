<script setup lang="ts">
import { defineProps, defineEmits } from "vue"
type MenuItem = {
  label: string
  icon: [iconPrefix: string, iconName: string]
}

defineProps<{
  isShow: boolean
  menuItems: MenuItem[]
}>()
defineEmits(['close'])
</script>
<template>
  <div
    class="absolute w-52 h-full bg-zinc-800 transition-transform duration-300 will-change-transform touch-manipulation z-40"
    :class="isShow ? 'translate-x-0' : '-translate-x-52'">
    <div class="h-full overflow-y-auto p-4">
      <div class="text-right">
        <font-awesome-icon :icon="['fas', 'xmark']" @click="$emit('close')" class="cursor-pointer" />
      </div>

      <ul class="space-y-2">
        <li v-for="{ label, icon } in menuItems" :key="label"
          class="hover:bg-zinc-700 rounded px-2 py-1 cursor-pointer">
          <div class="flex items-center gap-4">
            <font-awesome-icon :icon="icon" />
            {{ label }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
.overflow-y-auto {
  -webkit-overflow-scrolling: touch;
}
</style>
