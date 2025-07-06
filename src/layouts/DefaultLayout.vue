<template>
  <div class="h-screen bg-zinc-900 text-white flex flex-col">
    <!-- Header -->
    <div class="fixed top-0 left-0 right-0 z-50">
      <slot name="header" />
    </div>
    <div class="flex flex-1 my-12 overflow-y-auto">
      <!-- Aside -->
      <div class="relative shrink-0">
        <slot name="aside" />
      </div>
      <!-- Main Content -->
      <div class="flex-1 overflow-x-hidden">
        <slot />
      </div>
    </div>
    <!-- Footer -->
    <div class="footer">
      <slot name="footer" />
    </div>
  </div>
</template>
