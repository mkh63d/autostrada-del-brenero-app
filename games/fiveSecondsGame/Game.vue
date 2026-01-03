<template>
  <div class="text-center">
    <!-- Start Screen -->
    <div v-if="!started" class="py-8">
      <p class="text-gray-600 mb-6">{{ $t('games.fiveSeconds.description') }}</p>
      <button
        @click="start"
        class="bg-blue-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-blue-700 transition-colors"
      >
        {{ $t('games.fiveSeconds.start') }}
      </button>
    </div>

    <!-- Game Screen -->
    <div v-else-if="!gameOver" class="py-4">
      <!-- Score Display -->
      <div class="mb-4 flex justify-center items-center space-x-4">
        <span class="text-lg font-medium text-gray-700">{{ $t('games.fiveSeconds.score') }}:</span>
        <span class="text-3xl font-bold text-blue-600">{{ score }}</span>
      </div>

      <!-- Timer Circle -->
      <div class="mb-4">
        <div class="relative w-28 h-28 mx-auto">
          <svg class="w-28 h-28 transform -rotate-90">
            <circle cx="56" cy="56" r="48" stroke="#e5e7eb" stroke-width="8" fill="none"/>
            <circle
              cx="56" cy="56" r="48"
              :stroke="timeLeft <= 2 ? '#ef4444' : '#3b82f6'"
              stroke-width="8" fill="none"
              :stroke-dasharray="301.59"
              :stroke-dashoffset="301.59 - (301.59 * timeLeft) / 5"
              class="transition-all duration-1000"
            />
          </svg>
          <span 
            class="absolute inset-0 flex items-center justify-center text-4xl font-bold"
            :class="timeLeft <= 2 ? 'text-red-500' : 'text-blue-600'"
          >
            {{ timeLeft }}
          </span>
        </div>
      </div>

      <!-- Question -->
      <div class="mb-6 p-4 bg-blue-50 rounded-xl">
        <p class="text-xl font-semibold text-gray-800">{{ currentQuestion }}</p>
      </div>

      <!-- Result Message -->
      <div v-if="showResult" class="mb-4">
        <p v-if="markedCorrect" class="text-2xl font-bold text-green-500">
          {{ $t('games.fiveSeconds.correct') }} 🎉
        </p>
        <p v-else class="text-2xl font-bold text-red-500">
          {{ $t('games.fiveSeconds.timeUp') }} ⏰
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col gap-3">
        <!-- Correct Button - available until marked correct -->
        <button
          v-if="!markedCorrect"
          @click="markCorrect"
          class="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors w-full"
        >
          {{ $t('games.fiveSeconds.correct') }} ✓
        </button>

        <!-- Next Question Button -->
        <button
          v-if="showResult && hasMoreQuestions"
          @click="nextQuestion"
          class="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors w-full"
        >
          {{ $t('games.fiveSeconds.nextQuestion') }}
        </button>
      </div>
    </div>

    <!-- Game Over Screen -->
    <div v-else class="py-8">
      <p class="text-2xl font-bold text-gray-800 mb-2">{{ $t('games.fiveSeconds.gameOver') }}</p>
      <p class="text-xl text-gray-600 mb-4">
        {{ $t('games.fiveSeconds.score') }}: {{ score }} / {{ totalQuestions }}
      </p>
      <button
        @click="start"
        class="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        {{ $t('games.fiveSeconds.playAgain') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import useFiveSecondsGame from './useFiveSecondsGame';

const {
  started,
  timeLeft,
  score,
  showResult,
  markedCorrect,
  gameOver,
  currentQuestion,
  hasMoreQuestions,
  totalQuestions,
  start,
  markCorrect,
  nextQuestion
} = useFiveSecondsGame();
</script>