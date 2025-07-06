<script setup lang="ts">
defineProps<{ items: string[] }>()
</script>
<template>
  <div class="grid grid-cols-2 p-4">
    <div v-for="(item, index) in items" :key="index" class="grid-item">
      {{ item }}
    </div>
  </div>
</template>
<style lang="css" scoped>
.grid-item {
  background-color: #27272a;
  text-align: center;
  padding: 2.5rem 0;
  border: solid 1px #6a7282;
}
</style>
