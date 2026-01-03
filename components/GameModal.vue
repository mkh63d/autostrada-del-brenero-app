<template>
  <div  
    class="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto"
    @click.self="$emit('close')"
  >
    <div class="min-h-full flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl shadow-2xl max-w-lg w-full my-8" @click.stop>
        <!-- Modal Header -->
        <div 
          class="p-4 flex justify-between items-center rounded-t-2xl"
          :style="{ 
            backgroundImage: `linear-gradient(to bottom right, ${game.backgroundColor}, ${adjustColor(game.backgroundColor, -30)})` 
          }"
        >
          <h2 class="text-2xl font-bold text-white flex items-center">
            <span class="mr-2">{{ game.icon }}</span> {{ game.title }}
          </h2>
          <button @click="$emit('close')" class="text-white hover:text-gray-200 text-3xl">&times;</button>
        </div>
        <!-- Modal Content -->
        <div class="p-6">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GameDefinition } from '~/types/game';

defineProps<{
  game: GameDefinition;
}>();

defineEmits<{
  close: [];
}>();

// Adjust hex color brightness
function adjustColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
  return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
};
</script>