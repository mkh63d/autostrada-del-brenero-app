<template>
  <div>
    <!-- Start Screen -->
    <div v-if="!started" class="text-center py-8">
      <p class="text-gray-600 mb-6">{{ $t('games.millionaires.description') }}</p>
      <button
        @click="start"
        class="bg-amber-600 text-white px-8 py-4 m-4 rounded-lg text-xl font-semibold hover:bg-amber-700 transition-colors"
      >
        {{ $t('games.millionaires.start') }}
      </button>
    </div>

    <!-- Game Screen -->
    <div v-else-if="!gameOver" class="py-4">
      <!-- Prize Ladder -->
      <div class="mb-4 text-center">
        <span class="text-lg font-medium text-gray-700">
          {{ $t('games.millionaires.question') }} {{ questionIndex + 1 }}/10
        </span>
        <div class="text-2xl font-bold text-amber-600 mt-1">💰 {{ currentPrize }}</div>
      </div>

      <!-- Question -->
      <div class="mb-6 p-4 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl border-2 border-amber-200">
        <p class="text-lg font-semibold text-gray-800 text-center">{{ currentQuestion?.question }}</p>
      </div>

      <!-- Answers -->
      <div class="grid grid-cols-1 gap-3">
        <button
          v-for="(answer, index) in currentQuestion?.answers"
          :key="index"
          @click="selectAnswer(index)"
          :disabled="selectedAnswer !== null"
          class="p-4 rounded-lg text-left font-medium transition-all border-2"
          :class="getAnswerClass(index)"
        >
          <span class="font-bold mr-2">{{ ['A', 'B', 'C', 'D'][index] }}:</span>
          {{ answer }}
        </button>
      </div>

      <!-- Next Button -->
      <div 
        v-if="selectedAnswer !== null && selectedAnswer === currentQuestion?.correctIndex" 
        class="mt-4 text-center"
      >
        <button
          @click="nextQuestion"
          class="bg-amber-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-amber-700 transition-colors"
        >
          {{ isLastQuestion ? $t('games.millionaires.finish') : $t('games.millionaires.next') }}
        </button>
      </div>
    </div>

    <!-- Game Over Screen -->
    <div v-else class="text-center py-8">
      <!-- Winner -->
      <div v-if="won" class="mb-4">
        <span class="text-6xl">🎉</span>
        <p class="text-2xl font-bold text-amber-600 mt-4">{{ $t('games.millionaires.winner') }}</p>
        <p class="text-xl text-gray-600 mt-2">{{ prizeLevels[9] }}</p>
      </div>
      
      <!-- Loser -->
      <div v-else class="mb-4">
        <span class="text-6xl">😢</span>
        <p class="text-2xl font-bold text-red-500 mt-4">{{ $t('games.millionaires.lost') }}</p>
        <p class="text-lg text-gray-600 mt-2">
          {{ $t('games.millionaires.correctWas') }}: 
          {{ currentQuestion?.answers[currentQuestion?.correctIndex] }}
        </p>
      </div>
      
      <button
        @click="start"
        class="mt-4 bg-amber-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-amber-700 transition-colors"
      >
        {{ $t('games.millionaires.playAgain') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import useMillionairesGame from './useMillionairesGame';

const {
  started,
  questionIndex,
  selectedAnswer,
  gameOver,
  won,
  currentQuestion,
  currentPrize,
  prizeLevels,
  isLastQuestion,
  start,
  selectAnswer,
  nextQuestion,
  getAnswerClass
} = useMillionairesGame();
</script>