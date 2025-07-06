<script setup lang="ts">
import { ref, defineProps } from 'vue'

const props = defineProps<{
  typeList: string[]
}>()

const selectedType = ref(props.typeList[0] || '')

function selectType(type: string) {
  selectedType.value = type
}

const scrollRef = ref<HTMLElement | null>(null)

function scrollLeft() {
  stopMomentumAndScroll(-150)
}

function scrollRight() {
  stopMomentumAndScroll(150)
}

function stopMomentumAndScroll(offset: number) {
  const el = scrollRef.value
  if (!el) return

  // Step 1: 暫停慣性滾動
  const prev = el.scrollLeft
  el.style.scrollBehavior = 'auto'
  el.scrollLeft = prev

  // Step 2: 等一幀後執行平滑滾動
  requestAnimationFrame(() => {
    el.style.scrollBehavior = 'smooth'
    el.scrollBy({ left: offset, behavior: 'smooth' })
  })
}

</script>
<template>
  <div>
    <!-- 觸發側邊 Menu Icon -->
    <div class="flex items-center p-2 menu-bar">
      <font-awesome-icon :icon="['fas', 'bars']" class="base-bars-icon" @click="$emit('toggle')" />
    </div>

    <!-- Type 表單 -->
    <div class="flex items-center bg-black px-2 py-2 relative">
      <!-- 左箭頭 -->
      <font-awesome-icon :icon="['fas', 'less-than']" class="text-white px-2 cursor-pointer z-10" @click="scrollLeft" />

      <!-- 固定Search Icon -->
      <button class="action-bar-btn active">
        <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
      </button>

      <!-- 表單內容 -->
      <div ref="scrollRef" class="overflow-x-auto whitespace-nowrap flex-1 px-2 scrollbar-hide">
        <div class="inline-flex gap-2">
          <button v-for="type in typeList" :key="type" class="action-bar-btn" :class="{ active: selectedType === type }"
            @click="selectType(type)">
            {{ type }}
          </button>
        </div>
      </div>

      <!-- 右箭頭 -->
      <font-awesome-icon :icon="['fas', 'greater-than']" class="text-white px-2 cursor-pointer z-10"
        @click="scrollRight" />
    </div>
  </div>
</template>
