<template>
  <div
    @click="$emit('select', game)"
    class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer transform hover:scale-105"
  >
    <div 
      class="p-6 text-white bg-gradient-to-br" 
      :style="{ 
        backgroundImage: `linear-gradient(to bottom right, ${game.backgroundColor}, ${adjustColor(game.backgroundColor, -30)})` 
      }"
    >
      <span class="text-5xl">{{ game.icon }}</span>
    </div>
    <div class="p-4">
      <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{ game.title }}</h2>
      <p class="text-gray-600 dark:text-gray-400 text-sm">{{ game.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GameDefinition } from '~/types/game';

defineProps<{
  game: GameDefinition;
}>();

defineEmits<{
  select: [game: GameDefinition];
}>();

// Adjust hex color brightness
function adjustColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
  return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
}
</script>