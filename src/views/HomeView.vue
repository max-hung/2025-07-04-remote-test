<script setup lang="ts">
import { ref, reactive } from 'vue'
import AsideMenu from '@/components/aside/AsideMenu.vue'
import BaseActionBar from '@/components/base/BaseActionBar.vue'
import BaseItemGrid from '@/components/base/BaseItemGrid.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useTheme } from '@/composables/useTheme'
const { setTheme } = useTheme()
const items = reactive(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'])
const menuItem: { label: string; icon: [string, string] }[] = [
  { label: 'Home', icon: ['fas', 'house'] },
  { label: 'About', icon: ['fas', 'circle-exclamation'] },
  { label: 'Post1', icon: ['fas', 'pencil'] },
  { label: 'Post2', icon: ['fas', 'pencil'] },
  { label: 'Post3', icon: ['fas', 'pencil'] },
]
const actionItems = reactive(['ALL', 'TYPE1', 'TYPE2', 'TYPE3', 'TYPE4'])
const isShowMenu = ref(false)

function toggleMenu() {
  isShowMenu.value = !isShowMenu.value
}
</script>
<template>
  <DefaultLayout>
    <template #header>
      <div class="text-white font-bold flex items-center justify-between h-12">
        <div class="flex-1 h-12 bg-[#2f4f4f] flex items-center justify-center border border-gray-500">
          Change Color
        </div>
        <div class="flex">
          <button class="btn-switch btn-none-switch" @click="setTheme('none')"></button>
          <button class="btn-switch btn-blue-switch" @click="setTheme('blue')"></button>
        </div>
      </div>
    </template>

    <template #aside>
      <AsideMenu :menuItems="menuItem" :isShow="isShowMenu" @close="toggleMenu" />
    </template>
    <div class="z-30 flex flex-col transition-transform duration-300" :class="{ 'translate-x-52': isShowMenu }">
      <div class="sticky top-0 z-40">
        <BaseActionBar :typeList="actionItems" @toggle="toggleMenu" />
      </div>
      <BaseItemGrid :items="items" />
    </div>

  </DefaultLayout>
</template>
