<template>
  <div class="pb-20 md:pb-0">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">{{ $t('games.title') }}</h1>
      <p class="text-gray-600 dark:text-gray-400">{{ $t('games.description') }}</p>
    </div>

    <!-- Games Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <GameIcon
        v-for="game in enabledGames"
        :key="game.id"
        :game="game"
        @select="openGame"
      />
    </div>

    <!-- Game Modal -->
    <GameModal
      v-if="activeGame"
      :game="activeGame"
      @close="closeGame"
    >
      <component :is="activeGameComponent" />
    </GameModal>
  </div>
</template>

<script setup lang="ts">
import type { GameDefinition } from '~/types/game';
import games from '~/games/index';

// Filter only enabled games
const enabledGames = computed(() => games.filter(game => game.enabled));

// Active game state
const activeGame = ref<GameDefinition | null>(null);
const activeGameComponent = shallowRef<any>(null);

// Open a game modal
const openGame = async (game: GameDefinition) => {
  activeGame.value = game;
  // Load the game component dynamically
  const module = await game.component();
  activeGameComponent.value = module.default;
};

// Close the game modal
const closeGame = () => {
  activeGame.value = null;
  activeGameComponent.value = null;
};
</script>
