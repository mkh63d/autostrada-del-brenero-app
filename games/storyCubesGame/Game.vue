<template>
  <div class="text-center">
    <!-- Instructions -->
    <p class="text-gray-600 mb-6">{{ $t('games.storyCubes.instruction') }}</p>

    <!-- Dice Display -->
    <div class="flex flex-wrap justify-center gap-4 mb-6">
      <div 
        v-for="(symbol, index) in symbols" 
        :key="index"
        class="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center text-4xl shadow-md border-2 border-purple-300 transition-transform"
        :class="{ 'animate-bounce': isRolling }"
      >
        {{ symbol }}
      </div>
    </div>

    <!-- Story prompt after rolling -->
    <div v-if="hasRolled" class="mb-6 p-4 bg-purple-50 rounded-xl border border-purple-200">
      <p class="text-gray-700 font-medium">
        🎭 Create a story using these 4 symbols! Be creative and funny!
      </p>
    </div>

    <!-- Roll Button -->
    <div class="text-center">
      <button
        @click="roll"
        :disabled="isRolling"
        class="bg-purple-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="isRolling">🎲 Rolling...</span>
        <span v-else-if="hasRolled">🎲 {{ $t('games.storyCubes.roll') }} Again</span>
        <span v-else>🎲 {{ $t('games.storyCubes.roll') }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import useStoryCubesGame from './useStoryCubesGame';

const {
  symbols,
  isRolling,
  hasRolled,
  roll
} = useStoryCubesGame();
</script>