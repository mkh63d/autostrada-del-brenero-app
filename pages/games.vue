<template>
  <div class="pb-20 md:pb-0">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ $t('games.title') }}</h1>
      <p class="text-gray-600">{{ $t('games.description') }}</p>
    </div>

    <!-- Quick Games Section -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <span class="mr-2">🎮</span> {{ $t('games.quickGames') }}
      </h2>
      <div class="flex flex-wrap gap-6">
        <!-- 5 Seconds Game Card -->
        <div 
          @click="openFiveSecondsGame"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer transform hover:scale-105 w-full sm:w-64"
        >
          <div class="bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white">
            <span class="text-5xl">⏱️</span>
          </div>
          <div class="p-4">
            <h2 class="text-xl font-bold text-gray-900 mb-2">{{ $t('games.fiveSeconds.title') }}</h2>
            <p class="text-gray-600 text-sm">{{ $t('games.fiveSeconds.description') }}</p>
          </div>
        </div>

        <!-- Story Cubes Game Card -->
        <div 
          @click="openStoryCubesGame"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer transform hover:scale-105 w-full sm:w-64"
        >
          <div class="bg-gradient-to-br from-purple-500 to-purple-600 p-6 text-white">
            <span class="text-5xl">🎲</span>
          </div>
          <div class="p-4">
            <h2 class="text-xl font-bold text-gray-900 mb-2">{{ $t('games.storyCubes.title') }}</h2>
            <p class="text-gray-600 text-sm">{{ $t('games.storyCubes.description') }}</p>
          </div>
        </div>

        <!-- Millionaires Game Card -->
        <div 
          @click="openMillionairesGame"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer transform hover:scale-105 w-full sm:w-64"
        >
          <div class="bg-gradient-to-br from-yellow-500 to-amber-600 p-6 text-white">
            <span class="text-5xl">💰</span>
          </div>
          <div class="p-4">
            <h2 class="text-xl font-bold text-gray-900 mb-2">{{ $t('games.millionaires.title') }}</h2>
            <p class="text-gray-600 text-sm">{{ $t('games.millionaires.description') }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Vocal/Narrative Games Section -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <span class="mr-2">🎭</span> {{ $t('games.vocalGames') }}
      </h2>
      <p class="text-gray-600 mb-4">{{ $t('games.vocalGamesDesc') }}</p>
      <div class="flex flex-wrap gap-6">
        <!-- Last Notes of Unit 23 -->
        <div 
          @click="openLastNotesGame"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer transform hover:scale-105 w-full sm:w-64"
        >
          <div class="bg-gradient-to-br from-slate-700 to-slate-900 p-6 text-white">
            <span class="text-5xl">🔍</span>
          </div>
          <div class="p-4">
            <h2 class="text-xl font-bold text-gray-900 mb-2">{{ $t('games.lastNotes.title') }}</h2>
            <p class="text-gray-600 text-sm">{{ $t('games.lastNotes.description') }}</p>
          </div>
        </div>

        <!-- The Thought-Locked Vault -->
        <div 
          @click="openVaultGame"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer transform hover:scale-105 w-full sm:w-64"
        >
          <div class="bg-gradient-to-br from-emerald-600 to-teal-700 p-6 text-white">
            <span class="text-5xl">🔐</span>
          </div>
          <div class="p-4">
            <h2 class="text-xl font-bold text-gray-900 mb-2">{{ $t('games.vault.title') }}</h2>
            <p class="text-gray-600 text-sm">{{ $t('games.vault.description') }}</p>
          </div>
        </div>

        <!-- Courier From the Future -->
        <div 
          @click="openCourierGame"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer transform hover:scale-105 w-full sm:w-64"
        >
          <div class="bg-gradient-to-br from-cyan-500 to-blue-700 p-6 text-white">
            <span class="text-5xl">⏳</span>
          </div>
          <div class="p-4">
            <h2 class="text-xl font-bold text-gray-900 mb-2">{{ $t('games.courier.title') }}</h2>
            <p class="text-gray-600 text-sm">{{ $t('games.courier.description') }}</p>
          </div>
        </div>

        <!-- The Archive That Lies -->
        <div 
          @click="openArchiveGame"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer transform hover:scale-105 w-full sm:w-64"
        >
          <div class="bg-gradient-to-br from-red-600 to-rose-800 p-6 text-white">
            <span class="text-5xl">📜</span>
          </div>
          <div class="p-4">
            <h2 class="text-xl font-bold text-gray-900 mb-2">{{ $t('games.archive.title') }}</h2>
            <p class="text-gray-600 text-sm">{{ $t('games.archive.description') }}</p>
          </div>
        </div>

        <!-- The Lost Labyrinth of Text -->
        <div 
          @click="openLabyrinthGame"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer transform hover:scale-105 w-full sm:w-64"
        >
          <div class="bg-gradient-to-br from-indigo-600 to-violet-800 p-6 text-white">
            <span class="text-5xl">🌀</span>
          </div>
          <div class="p-4">
            <h2 class="text-xl font-bold text-gray-900 mb-2">{{ $t('games.labyrinth.title') }}</h2>
            <p class="text-gray-600 text-sm">{{ $t('games.labyrinth.description') }}</p>
          </div>
        </div>

        <!-- Signal 77 -->
        <div 
          @click="openSignalGame"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer transform hover:scale-105 w-full sm:w-64"
        >
          <div class="bg-gradient-to-br from-green-500 to-lime-600 p-6 text-white">
            <span class="text-5xl">📡</span>
          </div>
          <div class="p-4">
            <h2 class="text-xl font-bold text-gray-900 mb-2">{{ $t('games.signal.title') }}</h2>
            <p class="text-gray-600 text-sm">{{ $t('games.signal.description') }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 5 Seconds Modal -->
    <div 
      v-if="showFiveSecondsModal" 
      class="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto"
      @click.self="closeFiveSecondsGame"
    >
      <div class="min-h-full flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-2xl max-w-lg w-full my-8" @click.stop>
        <!-- Modal Header -->
        <div class="bg-gradient-to-br from-blue-500 to-blue-600 p-4 flex justify-between items-center rounded-t-2xl">
          <h2 class="text-2xl font-bold text-white flex items-center">
            <span class="mr-2">⏱️</span> {{ $t('games.fiveSeconds.title') }}
          </h2>
          <button @click="closeFiveSecondsGame" class="text-white hover:text-gray-200 text-3xl">&times;</button>
        </div>

        <!-- Modal Content -->
        <div class="p-6">
          <!-- Start Screen -->
          <div v-if="!fiveSecondsStarted" class="text-center py-8">
            <p class="text-gray-600 mb-6">{{ $t('games.fiveSeconds.description') }}</p>
            <button
              @click="startFiveSecondsGame"
              class="bg-blue-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              {{ $t('games.fiveSeconds.start') }}
            </button>
          </div>

          <!-- Game Screen -->
          <div v-else class="text-center py-4">
            <!-- Score Display -->
            <div class="mb-4 flex justify-center items-center space-x-4">
              <span class="text-lg font-medium text-gray-700">{{ $t('games.fiveSeconds.score') }}:</span>
              <span class="text-3xl font-bold text-blue-600">{{ fiveSecondsScore }}</span>
            </div>

            <!-- Timer -->
            <div class="mb-4">
              <div class="relative w-28 h-28 mx-auto">
                <svg class="w-28 h-28 transform -rotate-90">
                  <circle cx="56" cy="56" r="48" stroke="#e5e7eb" stroke-width="8" fill="none"/>
                  <circle
                    cx="56" cy="56" r="48"
                    :stroke="fiveSecondsTimeLeft <= 2 ? '#ef4444' : '#3b82f6'"
                    stroke-width="8" fill="none"
                    :stroke-dasharray="301.59"
                    :stroke-dashoffset="301.59 - (301.59 * fiveSecondsTimeLeft) / 5"
                    class="transition-all duration-1000"
                  />
                </svg>
                <span 
                  class="absolute inset-0 flex items-center justify-center text-4xl font-bold"
                  :class="fiveSecondsTimeLeft <= 2 ? 'text-red-500' : 'text-blue-600'"
                >
                  {{ fiveSecondsTimeLeft }}
                </span>
              </div>
            </div>

            <!-- Question -->
            <div class="mb-6">
              <p class="text-xl font-semibold text-gray-800">{{ currentFiveSecondsQuestion }}</p>
            </div>

            <!-- Result Message -->
            <div v-if="fiveSecondsShowResult" class="mb-4">
              <p v-if="fiveSecondsMarkedCorrect" class="text-2xl font-bold text-green-500">
                {{ $t('games.fiveSeconds.correct') }} 🎉
              </p>
              <p v-else class="text-2xl font-bold text-red-500">
                {{ $t('games.fiveSeconds.timeUp') }} ⏰
              </p>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col gap-3">
              <!-- Correct Button - always available until marked or game over -->
              <button
                v-if="!fiveSecondsMarkedCorrect && !fiveSecondsGameOver"
                @click="markFiveSecondsCorrect"
                class="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors w-full"
              >
                {{ $t('games.fiveSeconds.correct') }} ✓
              </button>

              <!-- Next Question Button -->
              <button
                v-if="fiveSecondsShowResult && !fiveSecondsGameOver"
                @click="nextFiveSecondsQuestion"
                class="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors w-full"
              >
                {{ $t('games.fiveSeconds.nextQuestion') }}
              </button>
            </div>

            <!-- Game Over -->
            <div v-if="fiveSecondsGameOver" class="mt-6">
              <p class="text-2xl font-bold text-gray-800 mb-2">{{ $t('games.fiveSeconds.gameOver') }}</p>
              <p class="text-xl text-gray-600 mb-4">{{ $t('games.fiveSeconds.score') }}: {{ fiveSecondsScore }}</p>
              <button
                @click="startFiveSecondsGame"
                class="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                {{ $t('games.fiveSeconds.playAgain') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>

    <!-- Story Cubes Modal -->
    <div 
      v-if="showStoryCubesModal" 
      class="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto"
      @click.self="closeStoryCubesGame"
    >
      <div class="min-h-full flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-2xl max-w-lg w-full my-8" @click.stop>
        <!-- Modal Header -->
        <div class="bg-gradient-to-br from-purple-500 to-purple-600 p-4 flex justify-between items-center rounded-t-2xl">
          <h2 class="text-2xl font-bold text-white flex items-center">
            <span class="mr-2">🎲</span> {{ $t('games.storyCubes.title') }}
          </h2>
          <button @click="closeStoryCubesGame" class="text-white hover:text-gray-200 text-3xl">&times;</button>
        </div>

        <!-- Modal Content -->
        <div class="p-6">
          <p class="text-gray-600 mb-6 text-center">{{ $t('games.storyCubes.instruction') }}</p>

          <!-- Dice Display -->
          <div class="flex flex-wrap justify-center gap-4 mb-6">
            <div 
              v-for="(symbol, index) in storyCubesSymbols" 
              :key="index"
              class="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center text-4xl shadow-md border-2 border-purple-300"
              :class="{ 'animate-bounce': isRolling }"
            >
              {{ symbol }}
            </div>
          </div>

          <!-- Roll Button -->
          <div class="text-center">
            <button
              @click="rollStoryCubes"
              :disabled="isRolling"
              class="bg-purple-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              {{ $t('games.storyCubes.roll') }}
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>

    <!-- Millionaires Modal -->
    <div 
      v-if="showMillionairesModal" 
      class="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto"
      @click.self="closeMillionairesGame"
    >
      <div class="min-h-full flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-2xl max-w-lg w-full my-8" @click.stop>
          <!-- Modal Header -->
          <div class="bg-gradient-to-br from-yellow-500 to-amber-600 p-4 flex justify-between items-center rounded-t-2xl">
            <h2 class="text-2xl font-bold text-white flex items-center">
              <span class="mr-2">💰</span> {{ $t('games.millionaires.title') }}
            </h2>
            <button @click="closeMillionairesGame" class="text-white hover:text-gray-200 text-3xl">&times;</button>
          </div>

          <!-- Modal Content -->
          <div class="p-6">
            <!-- Start Screen -->
            <div v-if="!millionairesStarted" class="text-center py-8">
              <p class="text-gray-600 mb-6">{{ $t('games.millionaires.description') }}</p>
              <button
                @click="startMillionairesGame"
                class="bg-amber-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-amber-700 transition-colors"
              >
                {{ $t('games.millionaires.start') }}
              </button>
            </div>

            <!-- Game Screen -->
            <div v-else-if="!millionairesGameOver" class="py-4">
              <!-- Prize Ladder -->
              <div class="mb-4 text-center">
                <span class="text-lg font-medium text-gray-700">{{ $t('games.millionaires.question') }} {{ millionairesQuestionIndex + 1 }}/10</span>
                <div class="text-2xl font-bold text-amber-600 mt-1">💰 {{ prizeLevels[millionairesQuestionIndex] }}</div>
              </div>

              <!-- Question -->
              <div class="mb-6 p-4 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl border-2 border-amber-200">
                <p class="text-lg font-semibold text-gray-800 text-center">{{ currentMillionairesQuestion?.question }}</p>
              </div>

              <!-- Answers -->
              <div class="grid grid-cols-1 gap-3">
                <button
                  v-for="(answer, index) in currentMillionairesQuestion?.answers"
                  :key="index"
                  @click="selectMillionairesAnswer(index)"
                  :disabled="millionairesAnswerSelected !== null"
                  class="p-4 rounded-lg text-left font-medium transition-all border-2"
                  :class="getAnswerClass(index)"
                >
                  <span class="font-bold mr-2">{{ ['A', 'B', 'C', 'D'][index] }}:</span>
                  {{ answer }}
                </button>
              </div>

              <!-- Next Button -->
              <div v-if="millionairesAnswerSelected !== null && millionairesAnswerSelected === currentMillionairesQuestion?.correctIndex" class="mt-4 text-center">
                <button
                  @click="nextMillionairesQuestion"
                  class="bg-amber-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-amber-700 transition-colors"
                >
                  {{ millionairesQuestionIndex < 9 ? $t('games.millionaires.next') : $t('games.millionaires.finish') }}
                </button>
              </div>
            </div>

            <!-- Game Over -->
            <div v-else class="text-center py-8">
              <div v-if="millionairesWon" class="mb-4">
                <span class="text-6xl">🎉</span>
                <p class="text-2xl font-bold text-amber-600 mt-4">{{ $t('games.millionaires.winner') }}</p>
                <p class="text-xl text-gray-600 mt-2">{{ prizeLevels[9] }}</p>
              </div>
              <div v-else class="mb-4">
                <span class="text-6xl">😢</span>
                <p class="text-2xl font-bold text-red-500 mt-4">{{ $t('games.millionaires.lost') }}</p>
                <p class="text-lg text-gray-600 mt-2">{{ $t('games.millionaires.correctWas') }}: {{ currentMillionairesQuestion?.answers[currentMillionairesQuestion?.correctIndex] }}</p>
              </div>
              <button
                @click="startMillionairesGame"
                class="mt-4 bg-amber-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-amber-700 transition-colors"
              >
                {{ $t('games.millionaires.playAgain') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ==================== VOCAL GAMES MODALS ==================== -->

    <!-- Last Notes of Unit 23 Modal -->
    <div 
      v-if="showLastNotesModal" 
      class="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto"
      @click.self="closeLastNotesGame"
    >
      <div class="min-h-full flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8" @click.stop>
          <div class="bg-gradient-to-br from-slate-700 to-slate-900 p-4 flex justify-between items-center rounded-t-2xl">
            <h2 class="text-2xl font-bold text-white flex items-center">
              <span class="mr-2">🔍</span> {{ $t('games.lastNotes.title') }}
            </h2>
            <button @click="closeLastNotesGame" class="text-white hover:text-gray-200 text-3xl">&times;</button>
          </div>
          <div class="p-6">
            <!-- Start Screen -->
            <div v-if="!lastNotesStarted" class="text-center py-6">
              <p class="text-gray-600 mb-4">{{ $t('games.lastNotes.intro') }}</p>
              <p class="text-sm text-gray-500 mb-6 italic">{{ $t('games.lastNotes.players') }}: 2-6</p>
              <button @click="startLastNotesGame" class="bg-slate-700 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-slate-800 transition-colors">
                {{ $t('games.lastNotes.start') }}
              </button>
            </div>
            <!-- Game Screen -->
            <div v-else>
              <div class="mb-4 flex justify-between items-center">
                <span class="text-sm text-gray-500">{{ $t('games.lastNotes.log') }} {{ lastNotesCurrentLog + 1 }}/{{ lastNotesLogs.length }}</span>
                <span class="text-sm font-bold" :class="lastNotesContradictions > 0 ? 'text-green-600' : 'text-gray-400'">
                  {{ $t('games.lastNotes.contradictions') }}: {{ lastNotesContradictions }}
                </span>
              </div>
              <!-- Log Entry -->
              <div class="bg-slate-100 p-4 rounded-lg mb-4 border-l-4 border-slate-600 font-mono text-sm">
                <p class="text-gray-800 whitespace-pre-line">{{ currentLastNotesLog?.text }}</p>
                <p class="text-xs text-gray-500 mt-2">{{ currentLastNotesLog?.timestamp }}</p>
              </div>
              <!-- Filter Buttons -->
              <div class="flex flex-wrap gap-2 mb-4">
                <button @click="filterLastNotesLogs('locations')" class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200">
                  📍 {{ $t('games.lastNotes.filterLocations') }}
                </button>
                <button @click="filterLastNotesLogs('suspects')" class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm hover:bg-red-200">
                  👤 {{ $t('games.lastNotes.filterSuspects') }}
                </button>
                <button @click="filterLastNotesLogs('times')" class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm hover:bg-green-200">
                  🕐 {{ $t('games.lastNotes.filterTimes') }}
                </button>
              </div>
              <!-- Actions -->
              <div class="flex gap-2">
                <button @click="markContradiction" class="flex-1 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
                  ⚠️ {{ $t('games.lastNotes.markContradiction') }}
                </button>
                <button @click="nextLastNotesLog" class="flex-1 bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-700">
                  {{ lastNotesCurrentLog < lastNotesLogs.length - 1 ? $t('games.lastNotes.next') : $t('games.lastNotes.solve') }}
                </button>
              </div>
              <!-- Hidden Message Clue -->
              <div v-if="lastNotesHiddenMessage" class="mt-4 p-3 bg-yellow-100 border border-yellow-400 rounded-lg">
                <p class="text-sm text-yellow-800">💡 {{ $t('games.lastNotes.hiddenClue') }}: "{{ lastNotesHiddenMessage }}"</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- The Thought-Locked Vault Modal -->
    <div 
      v-if="showVaultModal" 
      class="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto"
      @click.self="closeVaultGame"
    >
      <div class="min-h-full flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8" @click.stop>
          <div class="bg-gradient-to-br from-emerald-600 to-teal-700 p-4 flex justify-between items-center rounded-t-2xl">
            <h2 class="text-2xl font-bold text-white flex items-center">
              <span class="mr-2">🔐</span> {{ $t('games.vault.title') }}
            </h2>
            <button @click="closeVaultGame" class="text-white hover:text-gray-200 text-3xl">&times;</button>
          </div>
          <div class="p-6">
            <div v-if="!vaultStarted" class="text-center py-6">
              <p class="text-gray-600 mb-6">{{ $t('games.vault.intro') }}</p>
              <button @click="startVaultGame" class="bg-emerald-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-emerald-700 transition-colors">
                {{ $t('games.vault.start') }}
              </button>
            </div>
            <div v-else>
              <div class="mb-4 text-center">
                <span class="text-sm text-gray-500">{{ $t('games.vault.round') }} {{ vaultRound }}/5</span>
                <p class="text-lg font-bold text-emerald-700 mt-2">{{ $t('games.vault.score') }}: {{ vaultScore }}</p>
              </div>
              <!-- Current Rule -->
              <div class="bg-emerald-50 p-4 rounded-lg mb-4 border-2 border-emerald-200 text-center">
                <p class="text-emerald-800 font-mono text-lg">🔒 {{ currentVaultRule?.hint }}</p>
              </div>
              <!-- Test Input -->
              <div class="mb-4">
                <input 
                  v-model="vaultGuess" 
                  @keyup.enter="testVaultGuess"
                  type="text" 
                  :placeholder="$t('games.vault.placeholder')"
                  class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <!-- Response -->
              <div v-if="vaultResponse" class="mb-4 p-3 rounded-lg text-center font-bold" :class="vaultResponseClass">
                {{ vaultResponse }}
              </div>
              <!-- Actions -->
              <div class="flex gap-2">
                <button @click="testVaultGuess" class="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700">
                  {{ $t('games.vault.test') }}
                </button>
                <button @click="guessVaultRule" class="flex-1 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700">
                  {{ $t('games.vault.guessRule') }}
                </button>
              </div>
              <!-- Rule Guess Modal -->
              <div v-if="showVaultRuleGuess" class="mt-4 p-4 bg-gray-100 rounded-lg">
                <p class="text-sm text-gray-600 mb-2">{{ $t('games.vault.whatRule') }}</p>
                <input v-model="vaultRuleGuess" type="text" class="w-full p-2 border rounded mb-2" />
                <button @click="submitVaultRuleGuess" class="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700">
                  {{ $t('games.vault.submit') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Courier From the Future Modal -->
    <div 
      v-if="showCourierModal" 
      class="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto"
      @click.self="closeCourierGame"
    >
      <div class="min-h-full flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8" @click.stop>
          <div class="bg-gradient-to-br from-cyan-500 to-blue-700 p-4 flex justify-between items-center rounded-t-2xl">
            <h2 class="text-2xl font-bold text-white flex items-center">
              <span class="mr-2">⏳</span> {{ $t('games.courier.title') }}
            </h2>
            <button @click="closeCourierGame" class="text-white hover:text-gray-200 text-3xl">&times;</button>
          </div>
          <div class="p-6">
            <div v-if="!courierStarted" class="text-center py-6">
              <p class="text-gray-600 mb-6">{{ $t('games.courier.intro') }}</p>
              <button @click="startCourierGame" class="bg-cyan-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-cyan-700 transition-colors">
                {{ $t('games.courier.start') }}
              </button>
            </div>
            <div v-else-if="!courierGameOver">
              <div class="mb-4 flex justify-between">
                <span class="text-sm text-gray-500">⏱️ {{ $t('games.courier.timeLeft') }}: {{ courierTimeCredits }}</span>
              </div>
              <!-- Messages to Order -->
              <p class="text-sm text-gray-600 mb-2">{{ $t('games.courier.dragOrder') }}</p>
              <div class="space-y-2 mb-4">
                <div 
                  v-for="(msg, index) in courierMessages" 
                  :key="msg.id"
                  @click="selectCourierMessage(index)"
                  class="p-3 bg-cyan-50 border-2 rounded-lg cursor-pointer transition-all"
                  :class="courierSelectedIndex === index ? 'border-cyan-500 bg-cyan-100' : 'border-gray-200 hover:border-cyan-300'"
                >
                  <p class="text-sm text-gray-800">{{ msg.text }}</p>
                  <span class="text-xs text-gray-500">#{{ msg.id }}</span>
                </div>
              </div>
              <!-- Actions -->
              <div class="flex gap-2">
                <button @click="moveCourierMessageUp" :disabled="courierSelectedIndex <= 0" class="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 disabled:opacity-50">
                  ⬆️ {{ $t('games.courier.moveUp') }}
                </button>
                <button @click="moveCourierMessageDown" :disabled="courierSelectedIndex >= courierMessages.length - 1 || courierSelectedIndex < 0" class="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 disabled:opacity-50">
                  ⬇️ {{ $t('games.courier.moveDown') }}
                </button>
              </div>
              <div class="flex gap-2 mt-2">
                <button @click="decodeKeyword" :disabled="courierTimeCredits <= 0" class="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50">
                  🔍 {{ $t('games.courier.decode') }} (-1)
                </button>
                <button @click="submitCourierOrder" class="flex-1 bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700">
                  ✓ {{ $t('games.courier.submit') }}
                </button>
              </div>
            </div>
            <div v-else class="text-center py-6">
              <span class="text-6xl">{{ courierSuccess ? '🎉' : '💫' }}</span>
              <p class="text-2xl font-bold mt-4" :class="courierSuccess ? 'text-green-600' : 'text-orange-500'">
                {{ courierSuccess ? $t('games.courier.success') : $t('games.courier.partial') }}
              </p>
              <p class="text-gray-600 mt-2">{{ $t('games.courier.correctOrder') }}: {{ courierCorrectCount }}/{{ courierMessages.length }}</p>
              <button @click="startCourierGame" class="mt-4 bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700">
                {{ $t('games.courier.playAgain') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- The Archive That Lies Modal -->
    <div 
      v-if="showArchiveModal" 
      class="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto"
      @click.self="closeArchiveGame"
    >
      <div class="min-h-full flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8" @click.stop>
          <div class="bg-gradient-to-br from-red-600 to-rose-800 p-4 flex justify-between items-center rounded-t-2xl">
            <h2 class="text-2xl font-bold text-white flex items-center">
              <span class="mr-2">📜</span> {{ $t('games.archive.title') }}
            </h2>
            <button @click="closeArchiveGame" class="text-white hover:text-gray-200 text-3xl">&times;</button>
          </div>
          <div class="p-6">
            <div v-if="!archiveStarted" class="text-center py-6">
              <p class="text-gray-600 mb-6">{{ $t('games.archive.intro') }}</p>
              <button @click="startArchiveGame" class="bg-red-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-red-700 transition-colors">
                {{ $t('games.archive.start') }}
              </button>
            </div>
            <div v-else-if="!archiveGameOver">
              <div class="mb-4 flex justify-between items-center">
                <span class="text-sm text-gray-500">{{ $t('games.archive.entry') }} {{ archiveCurrentEntry + 1 }}/{{ archiveEntries.length }}</span>
                <span class="text-sm px-2 py-1 rounded" :class="archivePersonalityClass">{{ archivePersonality }}</span>
              </div>
              <!-- Entry -->
              <div class="bg-rose-50 p-4 rounded-lg mb-4 border-l-4 border-rose-600">
                <p class="text-gray-800">{{ currentArchiveEntry?.text }}</p>
                <div class="flex gap-2 mt-2 text-xs text-gray-500">
                  <span>📊 {{ $t('games.archive.certainty') }}: {{ currentArchiveEntry?.certainty }}</span>
                  <span>📅 {{ currentArchiveEntry?.date }}</span>
                </div>
              </div>
              <!-- Verdict Buttons -->
              <div class="flex gap-2">
                <button @click="markArchiveEntry('true')" class="flex-1 bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 font-bold">
                  ✓ {{ $t('games.archive.true') }}
                </button>
                <button @click="markArchiveEntry('false')" class="flex-1 bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 font-bold">
                  ✗ {{ $t('games.archive.false') }}
                </button>
                <button @click="markArchiveEntry('unverifiable')" class="flex-1 bg-gray-500 text-white px-4 py-3 rounded-lg hover:bg-gray-600 font-bold">
                  ? {{ $t('games.archive.unverifiable') }}
                </button>
              </div>
            </div>
            <div v-else class="text-center py-6">
              <span class="text-6xl">{{ archiveScore >= 4 ? '🏆' : '📋' }}</span>
              <p class="text-2xl font-bold text-rose-700 mt-4">{{ $t('games.archive.score') }}: {{ archiveScore }}/{{ archiveEntries.length }}</p>
              <button @click="startArchiveGame" class="mt-4 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700">
                {{ $t('games.archive.playAgain') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- The Lost Labyrinth of Text Modal -->
    <div 
      v-if="showLabyrinthModal" 
      class="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto"
      @click.self="closeLabyrinthGame"
    >
      <div class="min-h-full flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8" @click.stop>
          <div class="bg-gradient-to-br from-indigo-600 to-violet-800 p-4 flex justify-between items-center rounded-t-2xl">
            <h2 class="text-2xl font-bold text-white flex items-center">
              <span class="mr-2">🌀</span> {{ $t('games.labyrinth.title') }}
            </h2>
            <button @click="closeLabyrinthGame" class="text-white hover:text-gray-200 text-3xl">&times;</button>
          </div>
          <div class="p-6">
            <div v-if="!labyrinthStarted" class="text-center py-6">
              <p class="text-gray-600 mb-6">{{ $t('games.labyrinth.intro') }}</p>
              <button @click="startLabyrinthGame" class="bg-indigo-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-indigo-700 transition-colors">
                {{ $t('games.labyrinth.start') }}
              </button>
            </div>
            <div v-else-if="!labyrinthGameOver">
              <div class="mb-4 text-center">
                <span class="text-sm text-gray-500">🚶 {{ $t('games.labyrinth.room') }}: {{ labyrinthCurrentRoom?.name }}</span>
              </div>
              <!-- Room Description -->
              <div class="bg-indigo-50 p-4 rounded-lg mb-4 border-2 border-indigo-200">
                <p class="text-gray-800 italic">{{ labyrinthCurrentRoom?.description }}</p>
                <p v-if="labyrinthCurrentRoom?.riddle" class="mt-3 text-indigo-700 font-medium">💭 "{{ labyrinthCurrentRoom?.riddle }}"</p>
              </div>
              <!-- Scan Options -->
              <div class="flex flex-wrap gap-2 mb-4">
                <button @click="scanLabyrinth('echoes')" class="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm hover:bg-violet-200">
                  👂 {{ $t('games.labyrinth.scanEchoes') }}
                </button>
                <button @click="scanLabyrinth('patterns')" class="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm hover:bg-indigo-200">
                  👁️ {{ $t('games.labyrinth.scanPatterns') }}
                </button>
                <button @click="scanLabyrinth('wind')" class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200">
                  🌬️ {{ $t('games.labyrinth.scanWind') }}
                </button>
              </div>
              <div v-if="labyrinthScanResult" class="mb-4 p-3 bg-yellow-100 border border-yellow-400 rounded-lg text-sm">
                {{ labyrinthScanResult }}
              </div>
              <!-- Movement -->
              <div class="grid grid-cols-2 gap-2">
                <button v-for="exit in labyrinthCurrentRoom?.exits" :key="exit" @click="moveLabyrinth(exit)" class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                  {{ exit }}
                </button>
              </div>
            </div>
            <div v-else class="text-center py-6">
              <span class="text-6xl">{{ labyrinthWon ? '🏛️' : '🌀' }}</span>
              <p class="text-2xl font-bold mt-4" :class="labyrinthWon ? 'text-green-600' : 'text-indigo-600'">
                {{ labyrinthWon ? $t('games.labyrinth.found') : $t('games.labyrinth.lost') }}
              </p>
              <button @click="startLabyrinthGame" class="mt-4 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700">
                {{ $t('games.labyrinth.playAgain') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Signal 77 Modal -->
    <div 
      v-if="showSignalModal" 
      class="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto"
      @click.self="closeSignalGame"
    >
      <div class="min-h-full flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8" @click.stop>
          <div class="bg-gradient-to-br from-green-500 to-lime-600 p-4 flex justify-between items-center rounded-t-2xl">
            <h2 class="text-2xl font-bold text-white flex items-center">
              <span class="mr-2">📡</span> {{ $t('games.signal.title') }}
            </h2>
            <button @click="closeSignalGame" class="text-white hover:text-gray-200 text-3xl">&times;</button>
          </div>
          <div class="p-6">
            <div v-if="!signalStarted" class="text-center py-6">
              <p class="text-gray-600 mb-6">{{ $t('games.signal.intro') }}</p>
              <button @click="startSignalGame" class="bg-green-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-green-700 transition-colors">
                {{ $t('games.signal.start') }}
              </button>
            </div>
            <div v-else-if="!signalGameOver">
              <div class="mb-4 flex justify-between items-center">
                <span class="text-sm text-gray-500">📶 {{ $t('games.signal.integrity') }}: {{ signalIntegrity }}%</span>
                <span class="text-sm text-gray-500">{{ $t('games.signal.layer') }} {{ signalLayer }}/4</span>
              </div>
              <!-- Signal Display -->
              <div class="bg-black p-4 rounded-lg mb-4 font-mono text-green-400 text-sm overflow-x-auto">
                <p class="whitespace-pre-line">{{ currentSignalData }}</p>
              </div>
              <!-- Band Selection -->
              <p class="text-sm text-gray-600 mb-2">{{ $t('games.signal.chooseBand') }}</p>
              <div class="grid grid-cols-2 gap-2 mb-4">
                <button @click="decodeSignalBand('emotional')" class="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600">
                  💗 {{ $t('games.signal.emotional') }}
                </button>
                <button @click="decodeSignalBand('syntactic')" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                  📝 {{ $t('games.signal.syntactic') }}
                </button>
                <button @click="decodeSignalBand('symbolic')" class="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600">
                  🔮 {{ $t('games.signal.symbolic') }}
                </button>
                <button @click="decodeSignalBand('geometric')" class="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
                  📐 {{ $t('games.signal.geometric') }}
                </button>
              </div>
              <!-- Interpretation -->
              <div v-if="signalInterpretation" class="mb-4 p-3 bg-green-100 border border-green-400 rounded-lg">
                <p class="text-sm text-green-800">{{ signalInterpretation }}</p>
              </div>
              <!-- Final Decision -->
              <div v-if="signalLayer >= 4" class="border-t pt-4">
                <p class="text-sm text-gray-600 mb-2">{{ $t('games.signal.decide') }}</p>
                <div class="flex gap-2">
                  <button @click="decideSignal('distress')" class="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600">{{ $t('games.signal.distress') }}</button>
                  <button @click="decideSignal('warning')" class="flex-1 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600">{{ $t('games.signal.warning') }}</button>
                  <button @click="decideSignal('trap')" class="flex-1 bg-gray-700 text-white py-2 rounded hover:bg-gray-800">{{ $t('games.signal.trap') }}</button>
                </div>
              </div>
            </div>
            <div v-else class="text-center py-6">
              <span class="text-6xl">{{ signalCorrect ? '🛸' : '💥' }}</span>
              <p class="text-2xl font-bold mt-4" :class="signalCorrect ? 'text-green-600' : 'text-red-500'">
                {{ signalCorrect ? $t('games.signal.correct') : $t('games.signal.wrong') }}
              </p>
              <p class="text-gray-600 mt-2">{{ $t('games.signal.actualSignal') }}: {{ signalActualType }}</p>
              <p v-if="signalReverse" class="text-sm text-purple-600 mt-2 italic">{{ $t('games.signal.theyWatching') }}</p>
              <button @click="startSignalGame" class="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
                {{ $t('games.signal.playAgain') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
const { t, tm, rt } = useI18n();

// ===== 5 SECONDS GAME =====
const showFiveSecondsModal = ref(false);
const fiveSecondsStarted = ref(false);
const fiveSecondsTimeLeft = ref(5);
const fiveSecondsScore = ref(0);
const fiveSecondsQuestionIndex = ref(0);
const fiveSecondsShowResult = ref(false);
const fiveSecondsMarkedCorrect = ref(false);
const fiveSecondsGameOver = ref(false);
const fiveSecondsTimer = ref<NodeJS.Timeout | null>(null);
const shuffledFiveSecondsQuestions = ref<string[]>([]);

const fiveSecondsQuestions = computed(() => {
  const questionsArray = tm('games.fiveSeconds.questions');
  if (Array.isArray(questionsArray)) {
    return questionsArray.map(q => rt(q));
  }
  return [];
});

const currentFiveSecondsQuestion = computed(() => {
  return shuffledFiveSecondsQuestions.value[fiveSecondsQuestionIndex.value] || '';
});

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function openFiveSecondsGame() {
  showFiveSecondsModal.value = true;
  fiveSecondsStarted.value = false;
}

function closeFiveSecondsGame() {
  showFiveSecondsModal.value = false;
  if (fiveSecondsTimer.value) {
    clearInterval(fiveSecondsTimer.value);
  }
  resetFiveSecondsGame();
}

function resetFiveSecondsGame() {
  fiveSecondsStarted.value = false;
  fiveSecondsScore.value = 0;
  fiveSecondsQuestionIndex.value = 0;
  fiveSecondsShowResult.value = false;
  fiveSecondsMarkedCorrect.value = false;
  fiveSecondsGameOver.value = false;
}

function startFiveSecondsGame() {
  fiveSecondsScore.value = 0;
  fiveSecondsQuestionIndex.value = 0;
  fiveSecondsGameOver.value = false;
  fiveSecondsStarted.value = true;
  shuffledFiveSecondsQuestions.value = shuffleArray(fiveSecondsQuestions.value as string[]);
  startFiveSecondsTimer();
}

function startFiveSecondsTimer() {
  fiveSecondsShowResult.value = false;
  fiveSecondsMarkedCorrect.value = false;
  fiveSecondsTimeLeft.value = 5;
  
  if (fiveSecondsTimer.value) {
    clearInterval(fiveSecondsTimer.value);
  }
  
  fiveSecondsTimer.value = setInterval(() => {
    fiveSecondsTimeLeft.value--;
    if (fiveSecondsTimeLeft.value <= 0) {
      clearInterval(fiveSecondsTimer.value!);
      fiveSecondsShowResult.value = true;
    }
  }, 1000);
}

function markFiveSecondsCorrect() {
  if (fiveSecondsTimer.value) {
    clearInterval(fiveSecondsTimer.value);
  }
  fiveSecondsScore.value++;
  fiveSecondsMarkedCorrect.value = true;
  fiveSecondsShowResult.value = true;
  checkFiveSecondsGameOver();
}

function checkFiveSecondsGameOver() {
  if (fiveSecondsQuestionIndex.value >= shuffledFiveSecondsQuestions.value.length - 1) {
    fiveSecondsGameOver.value = true;
  }
}

function nextFiveSecondsQuestion() {
  fiveSecondsQuestionIndex.value++;
  checkFiveSecondsGameOver();
  if (!fiveSecondsGameOver.value) {
    startFiveSecondsTimer();
  }
}

// ===== STORY CUBES GAME =====
const showStoryCubesModal = ref(false);
const isRolling = ref(false);
const storyCubesSymbols = ref(['❓', '❓', '❓', '❓']);

const allSymbols = [
  '🌟', '🌙', '☀️', '🌈', '⛰️', '🏠', '🏰', '🌲', '🌊', '🔥',
  '🚗', '✈️', '🚀', '⛵', '🚲', '🎸', '🎨', '📚', '💎', '🔑',
  '👑', '🎭', '🎪', '🎯', '🎁', '💡', '🔮', '⚡', '❤️', '🍎',
  '🐕', '🐈', '🦁', '🐘', '🦋', '🐦', '🐟', '🌸', '🍀', '🌵',
  '👤', '👥', '👀', '✋', '🦶', '💬', '💭', '❗', '❓', '⏰'
];

function openStoryCubesGame() {
  showStoryCubesModal.value = true;
  storyCubesSymbols.value = ['❓', '❓', '❓', '❓'];
}

function closeStoryCubesGame() {
  showStoryCubesModal.value = false;
}

function rollStoryCubes() {
  isRolling.value = true;
  
  // Animate rolling
  let rollCount = 0;
  const rollInterval = setInterval(() => {
    storyCubesSymbols.value = [
      allSymbols[Math.floor(Math.random() * allSymbols.length)],
      allSymbols[Math.floor(Math.random() * allSymbols.length)],
      allSymbols[Math.floor(Math.random() * allSymbols.length)],
      allSymbols[Math.floor(Math.random() * allSymbols.length)]
    ];
    rollCount++;
    
    if (rollCount >= 10) {
      clearInterval(rollInterval);
      isRolling.value = false;
    }
  }, 100);
}

// ===== MILLIONAIRES GAME =====
const showMillionairesModal = ref(false);
const millionairesStarted = ref(false);
const millionairesQuestionIndex = ref(0);
const millionairesAnswerSelected = ref<number | null>(null);
const millionairesGameOver = ref(false);
const millionairesWon = ref(false);
const shuffledMillionairesQuestions = ref<Array<{question: string, answers: string[], correctIndex: number}>>([]);

const prizeLevels = ['€100', '€200', '€500', '€1,000', '€2,000', '€5,000', '€10,000', '€50,000', '€100,000', '€1,000,000'];

interface MillionairesQuestion {
  question: string;
  answers: string[];
  correctIndex: number;
}

const millionairesQuestions = computed((): MillionairesQuestion[] => {
  const questionsArray = tm('games.millionaires.questions');
  if (Array.isArray(questionsArray)) {
    return questionsArray.map(q => ({
      question: rt(q.question),
      answers: q.answers.map((a: any) => rt(a)),
      correctIndex: q.correctIndex
    }));
  }
  return [];
});

const currentMillionairesQuestion = computed(() => {
  return shuffledMillionairesQuestions.value[millionairesQuestionIndex.value];
});

function openMillionairesGame() {
  showMillionairesModal.value = true;
  millionairesStarted.value = false;
}

function closeMillionairesGame() {
  showMillionairesModal.value = false;
  resetMillionairesGame();
}

function resetMillionairesGame() {
  millionairesStarted.value = false;
  millionairesQuestionIndex.value = 0;
  millionairesAnswerSelected.value = null;
  millionairesGameOver.value = false;
  millionairesWon.value = false;
}

function startMillionairesGame() {
  millionairesQuestionIndex.value = 0;
  millionairesAnswerSelected.value = null;
  millionairesGameOver.value = false;
  millionairesWon.value = false;
  millionairesStarted.value = true;
  shuffledMillionairesQuestions.value = shuffleArray(millionairesQuestions.value).slice(0, 10);
}

function selectMillionairesAnswer(index: number) {
  if (millionairesAnswerSelected.value !== null) return;
  
  millionairesAnswerSelected.value = index;
  
  if (index !== currentMillionairesQuestion.value?.correctIndex) {
    millionairesGameOver.value = true;
    millionairesWon.value = false;
  }
}

function nextMillionairesQuestion() {
  if (millionairesQuestionIndex.value >= 9) {
    millionairesGameOver.value = true;
    millionairesWon.value = true;
  } else {
    millionairesQuestionIndex.value++;
    millionairesAnswerSelected.value = null;
  }
}

function getAnswerClass(index: number) {
  if (millionairesAnswerSelected.value === null) {
    return 'bg-white border-gray-300 hover:bg-amber-50 hover:border-amber-400';
  }
  if (index === currentMillionairesQuestion.value?.correctIndex) {
    return 'bg-green-100 border-green-500 text-green-800';
  }
  if (index === millionairesAnswerSelected.value) {
    return 'bg-red-100 border-red-500 text-red-800';
  }
  return 'bg-gray-100 border-gray-300 opacity-50';
}

// ==================== VOCAL GAMES ====================

// ===== LAST NOTES OF UNIT 23 =====
const showLastNotesModal = ref(false);
const lastNotesStarted = ref(false);
const lastNotesCurrentLog = ref(0);
const lastNotesContradictions = ref(0);
const lastNotesHiddenMessage = ref('');
const lastNotesLogs = ref<Array<{text: string, timestamp: string, type: string}>>([]);

const lastNotesData = [
  { text: "Subject last seen near the old bridge. Time: approximately 11 PM. Weather: heavy rain. I noticed footprints heading east.", timestamp: "Log 001 - 23:47", type: "locations" },
  { text: "Witness claims the suspect wore a dark coat. Tall figure, limping slightly. Said they heard glass breaking nearby.", timestamp: "Log 002 - 00:15", type: "suspects" },
  { text: "Contradiction: Earlier report said clear skies. Someone is lying. The bridge keeper mentioned seeing TWO figures.", timestamp: "Log 003 - 01:30", type: "times" },
  { text: "Found evidence at the warehouse: broken glass, muddy footprints. The rain would have washed these away if... wait. The time doesn't match.", timestamp: "Log 004 - 02:45", type: "locations" },
  { text: "If you're reading this, the first letters spell EAST. Trust no one from the precinct.", timestamp: "Log 005 - 03:00", type: "hidden" },
  { text: "Subject was actually SHORT according to bartender. Dark coat confirmed. Last seen heading WEST, not east.", timestamp: "Log 006 - 03:30", type: "suspects" }
];

const currentLastNotesLog = computed(() => lastNotesLogs.value[lastNotesCurrentLog.value]);

function openLastNotesGame() { showLastNotesModal.value = true; lastNotesStarted.value = false; }
function closeLastNotesGame() { showLastNotesModal.value = false; }

function startLastNotesGame() {
  lastNotesStarted.value = true;
  lastNotesCurrentLog.value = 0;
  lastNotesContradictions.value = 0;
  lastNotesHiddenMessage.value = '';
  lastNotesLogs.value = shuffleArray([...lastNotesData]);
}

function filterLastNotesLogs(type: string) {
  lastNotesLogs.value = lastNotesData.filter(l => l.type === type || l.type === 'hidden');
  lastNotesCurrentLog.value = 0;
}

function markContradiction() {
  lastNotesContradictions.value++;
  if (currentLastNotesLog.value?.text.includes('Contradiction') || currentLastNotesLog.value?.text.includes('doesn\'t match')) {
    lastNotesHiddenMessage.value = 'Good catch! Keep looking for inconsistencies.';
  }
}

function nextLastNotesLog() {
  if (lastNotesCurrentLog.value < lastNotesLogs.value.length - 1) {
    lastNotesCurrentLog.value++;
    if (currentLastNotesLog.value?.type === 'hidden') {
      lastNotesHiddenMessage.value = 'DECODED: ' + currentLastNotesLog.value.text;
    }
  } else {
    lastNotesHiddenMessage.value = `Investigation complete. Contradictions found: ${lastNotesContradictions.value}. The truth points EAST.`;
  }
}

// ===== THE THOUGHT-LOCKED VAULT =====
const showVaultModal = ref(false);
const vaultStarted = ref(false);
const vaultRound = ref(1);
const vaultScore = ref(0);
const vaultGuess = ref('');
const vaultResponse = ref('');
const vaultResponseClass = ref('');
const showVaultRuleGuess = ref(false);
const vaultRuleGuess = ref('');

const vaultRules = [
  { hint: "Only things that represent BEGINNINGS may pass", rule: (s: string) => /^(dawn|birth|start|spring|seed|baby|morning|genesis|origin)/i.test(s), answer: "beginnings" },
  { hint: "Only words with exactly 5 letters are accepted", rule: (s: string) => s.trim().length === 5, answer: "five letters" },
  { hint: "Only items that can FLY shall enter", rule: (s: string) => /bird|plane|butterfly|bee|helicopter|balloon|kite|eagle|drone/i.test(s), answer: "flying things" },
  { hint: "The vault accepts only ROUND objects", rule: (s: string) => /ball|wheel|coin|sun|moon|circle|ring|sphere|orange|pizza/i.test(s), answer: "round objects" },
  { hint: "Only that which is SILENT may proceed", rule: (s: string) => /shadow|thought|dream|cloud|snow|ghost|mime|fish/i.test(s), answer: "silent things" }
];

const currentVaultRule = computed(() => vaultRules[(vaultRound.value - 1) % vaultRules.length]);

function openVaultGame() { showVaultModal.value = true; vaultStarted.value = false; }
function closeVaultGame() { showVaultModal.value = false; }

function startVaultGame() {
  vaultStarted.value = true;
  vaultRound.value = 1;
  vaultScore.value = 0;
  vaultGuess.value = '';
  vaultResponse.value = '';
  showVaultRuleGuess.value = false;
}

function testVaultGuess() {
  if (!vaultGuess.value.trim()) return;
  const passes = currentVaultRule.value.rule(vaultGuess.value);
  vaultResponse.value = passes ? '✓ ACCEPTED' : '✗ REJECTED';
  vaultResponseClass.value = passes ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';
  vaultGuess.value = '';
}

function guessVaultRule() { showVaultRuleGuess.value = true; }

function submitVaultRuleGuess() {
  const correct = vaultRuleGuess.value.toLowerCase().includes(currentVaultRule.value.answer);
  if (correct) {
    vaultScore.value++;
    vaultResponse.value = '🎉 Correct! The rule was about ' + currentVaultRule.value.answer;
    vaultResponseClass.value = 'bg-green-100 text-green-700';
  } else {
    vaultResponse.value = '❌ Wrong. The rule was about ' + currentVaultRule.value.answer;
    vaultResponseClass.value = 'bg-red-100 text-red-700';
  }
  showVaultRuleGuess.value = false;
  vaultRuleGuess.value = '';
  if (vaultRound.value < 5) {
    setTimeout(() => { vaultRound.value++; vaultResponse.value = ''; }, 2000);
  }
}

// ===== COURIER FROM THE FUTURE =====
const showCourierModal = ref(false);
const courierStarted = ref(false);
const courierGameOver = ref(false);
const courierSuccess = ref(false);
const courierTimeCredits = ref(5);
const courierSelectedIndex = ref(-1);
const courierCorrectCount = ref(0);
const courierMessages = ref<Array<{id: number, text: string, order: number}>>([]);

const courierData = [
  { id: 1, text: "I've arrived at the station. The package is secure. Will proceed to checkpoint Alpha.", order: 1 },
  { id: 2, text: "Checkpoint Alpha compromised. Rerouting through the old tunnel system. My arm hurts from the earlier incident.", order: 3 },
  { id: 3, text: "Wait - I see myself in the distance. This shouldn't be possible. The timeline is fracturing.", order: 4 },
  { id: 4, text: "Made first contact. They're expecting me. Something feels wrong - they mentioned the arm injury before it happened.", order: 2 },
  { id: 5, text: "Mission complete... or is it? I see the station again. Am I going backwards?", order: 5 }
];

function openCourierGame() { showCourierModal.value = true; courierStarted.value = false; }
function closeCourierGame() { showCourierModal.value = false; }

function startCourierGame() {
  courierStarted.value = true;
  courierGameOver.value = false;
  courierTimeCredits.value = 5;
  courierSelectedIndex.value = -1;
  courierMessages.value = shuffleArray([...courierData]);
}

function selectCourierMessage(index: number) { courierSelectedIndex.value = index; }

function moveCourierMessageUp() {
  if (courierSelectedIndex.value > 0) {
    const msgs = [...courierMessages.value];
    [msgs[courierSelectedIndex.value], msgs[courierSelectedIndex.value - 1]] = [msgs[courierSelectedIndex.value - 1], msgs[courierSelectedIndex.value]];
    courierMessages.value = msgs;
    courierSelectedIndex.value--;
  }
}

function moveCourierMessageDown() {
  if (courierSelectedIndex.value < courierMessages.value.length - 1 && courierSelectedIndex.value >= 0) {
    const msgs = [...courierMessages.value];
    [msgs[courierSelectedIndex.value], msgs[courierSelectedIndex.value + 1]] = [msgs[courierSelectedIndex.value + 1], msgs[courierSelectedIndex.value]];
    courierMessages.value = msgs;
    courierSelectedIndex.value++;
  }
}

function decodeKeyword() {
  if (courierTimeCredits.value > 0) {
    courierTimeCredits.value--;
    alert('Hint: Look for cause and effect - injuries, mentions of "earlier" or "before"');
  }
}

function submitCourierOrder() {
  courierCorrectCount.value = courierMessages.value.filter((m, i) => m.order === i + 1).length;
  courierSuccess.value = courierCorrectCount.value === courierMessages.value.length;
  courierGameOver.value = true;
}

// ===== THE ARCHIVE THAT LIES =====
const showArchiveModal = ref(false);
const archiveStarted = ref(false);
const archiveGameOver = ref(false);
const archiveCurrentEntry = ref(0);
const archiveScore = ref(0);
const archivePersonality = ref('📊 Neutral');
const archivePersonalityClass = ref('bg-gray-200 text-gray-700');
const archiveEntries = ref<Array<{text: string, certainty: string, date: string, truth: string}>>([]);

const archiveData = [
  { text: "The bridge was built in 1923 by engineer Marco Bianchi. Foundation stones imported from Austria.", certainty: "HIGH", date: "1924-01-15", truth: "true" },
  { text: "Legend says a ghost haunts the old mill. Several visitors reported cold spots and whispers.", certainty: "LOW", date: "1987-10-31", truth: "unverifiable" },
  { text: "The mayor was seen leaving the treasury at midnight. Source: anonymous tip.", certainty: "MEDIUM", date: "2019-03-22", truth: "false" },
  { text: "Mountain pass closed due to avalanche risk. Three rescue teams deployed.", certainty: "HIGH", date: "2023-01-05", truth: "true" },
  { text: "Ancient Romans stored gold in these caves. Treasure hunters have searched for centuries.", certainty: "LOW", date: "1856-07-12", truth: "unverifiable" },
  { text: "The village population doubled after the new highway opened. Tourism increased 300%.", certainty: "HIGH", date: "2021-06-30", truth: "false" }
];

const personalities = [
  { name: '😊 Optimist', class: 'bg-yellow-200 text-yellow-700' },
  { name: '😰 Paranoid', class: 'bg-purple-200 text-purple-700' },
  { name: '📊 Bureaucrat', class: 'bg-gray-200 text-gray-700' },
  { name: '🎭 Trickster', class: 'bg-pink-200 text-pink-700' }
];

const currentArchiveEntry = computed(() => archiveEntries.value[archiveCurrentEntry.value]);

function openArchiveGame() { showArchiveModal.value = true; archiveStarted.value = false; }
function closeArchiveGame() { showArchiveModal.value = false; }

function startArchiveGame() {
  archiveStarted.value = true;
  archiveGameOver.value = false;
  archiveCurrentEntry.value = 0;
  archiveScore.value = 0;
  archiveEntries.value = shuffleArray([...archiveData]);
  changeArchivePersonality();
}

function changeArchivePersonality() {
  const p = personalities[Math.floor(Math.random() * personalities.length)];
  archivePersonality.value = p.name;
  archivePersonalityClass.value = p.class;
}

function markArchiveEntry(verdict: string) {
  if (verdict === currentArchiveEntry.value?.truth) archiveScore.value++;
  if (archiveCurrentEntry.value < archiveEntries.value.length - 1) {
    archiveCurrentEntry.value++;
    if (Math.random() > 0.5) changeArchivePersonality();
  } else {
    archiveGameOver.value = true;
  }
}

// ===== THE LOST LABYRINTH OF TEXT =====
const showLabyrinthModal = ref(false);
const labyrinthStarted = ref(false);
const labyrinthGameOver = ref(false);
const labyrinthWon = ref(false);
const labyrinthScanResult = ref('');
const labyrinthCurrentRoomIndex = ref(0);

const labyrinthRooms = [
  { name: "Entrance Hall", description: "Cold stone walls stretch upward into darkness. Three passages branch ahead. The air smells of ancient dust and forgotten secrets.", riddle: "Where light fears to tread, truth awaits.", exits: ["North", "East", "West"] },
  { name: "Hall of Echoes", description: "Your footsteps repeat endlessly. Mirrors line the walls but show wrong reflections. The ceiling appears both near and impossibly far.", exits: ["South", "North", "Hidden"] },
  { name: "Garden of Stone", description: "Petrified trees create a maze within the maze. Carved symbols cover every surface. A fountain flows with silver liquid.", riddle: "The path bends where the moon drinks.", exits: ["East", "West"] },
  { name: "Chamber of Whispers", description: "Voices speak from nowhere, offering contradicting directions. The floor tiles shift when you're not watching.", exits: ["Down", "Up", "Back"] },
  { name: "The Heart", description: "You've found it! An ancient altar holds a crystalline artifact pulsing with inner light. The labyrinth's secret is revealed.", exits: [] }
];

const labyrinthCurrentRoom = computed(() => labyrinthRooms[labyrinthCurrentRoomIndex.value]);

function openLabyrinthGame() { showLabyrinthModal.value = true; labyrinthStarted.value = false; }
function closeLabyrinthGame() { showLabyrinthModal.value = false; }

function startLabyrinthGame() {
  labyrinthStarted.value = true;
  labyrinthGameOver.value = false;
  labyrinthWon.value = false;
  labyrinthCurrentRoomIndex.value = 0;
  labyrinthScanResult.value = '';
}

function scanLabyrinth(type: string) {
  const scans: Record<string, string> = {
    echoes: "You hear distant footsteps... or are they your own? The echoes suggest a hidden passage to the North.",
    patterns: "The wall carvings form a spiral. Following them leads your eyes toward a crack in the eastern wall.",
    wind: "A cold breeze flows from below. There may be chambers beneath you."
  };
  labyrinthScanResult.value = scans[type] || "Nothing unusual detected.";
}

function moveLabyrinth(direction: string) {
  labyrinthScanResult.value = '';
  if (direction === 'Hidden' || direction === 'Down') {
    labyrinthCurrentRoomIndex.value = 4;
    labyrinthWon.value = true;
    labyrinthGameOver.value = true;
  } else if (labyrinthCurrentRoomIndex.value < 3) {
    labyrinthCurrentRoomIndex.value++;
  } else {
    labyrinthCurrentRoomIndex.value = Math.floor(Math.random() * 3);
  }
}

// ===== SIGNAL 77 =====
const showSignalModal = ref(false);
const signalStarted = ref(false);
const signalGameOver = ref(false);
const signalCorrect = ref(false);
const signalIntegrity = ref(100);
const signalLayer = ref(0);
const signalInterpretation = ref('');
const signalActualType = ref('');
const signalReverse = ref(false);

const signalTypes = ['distress', 'warning', 'trap'];
const signalBands = {
  emotional: ["Patterns suggest: urgency, fear, desperation...", "Underlying tone: curiosity mixed with... hunger?", "Emotional resonance: protective, warning others"],
  syntactic: ["Repeating structure detected: SOS-like pattern", "Grammar suggests: imperative commands, orders", "Syntax analysis: questions, probing queries"],
  symbolic: ["Symbols match: universal distress beacon", "Imagery detected: barriers, walls, containment", "Hidden meaning: invitation disguised as warning"],
  geometric: ["Spatial data: coordinates pointing AWAY from source", "Shape analysis: spiral pattern, drawing inward", "Geometry suggests: safe zones marked clearly"]
};

const currentSignalData = computed(() => {
  const layers = [
    ">>> INCOMING TRANSMISSION <<<\n01001000 01000101 01001100 01010000\n::SIGNAL ORIGIN: UNKNOWN::\n~~ DECODING REQUIRED ~~",
    "PARTIAL DECODE:\n'...we are... not alone... they... coming...'\nSIGNAL DEGRADATION: " + signalIntegrity.value + "%",
    "ENHANCED DECODE:\n'...beacon activated... coordinates... warning all ships...'\nPATTERN RECOGNITION: ACTIVE",
    "FULL DECODE:\n'...we have been watching you decode this... interesting species...'\nANALYSIS COMPLETE"
  ];
  return layers[Math.min(signalLayer.value, 3)];
});

function openSignalGame() { showSignalModal.value = true; signalStarted.value = false; }
function closeSignalGame() { showSignalModal.value = false; }

function startSignalGame() {
  signalStarted.value = true;
  signalGameOver.value = false;
  signalIntegrity.value = 100;
  signalLayer.value = 0;
  signalInterpretation.value = '';
  signalActualType.value = signalTypes[Math.floor(Math.random() * signalTypes.length)];
  signalReverse.value = Math.random() > 0.5;
}

function decodeSignalBand(band: keyof typeof signalBands) {
  const interpretations = signalBands[band];
  const hintIndex = signalActualType.value === 'distress' ? 0 : signalActualType.value === 'warning' ? 2 : 1;
  signalInterpretation.value = interpretations[hintIndex];
  signalIntegrity.value = Math.max(0, signalIntegrity.value - 15);
  signalLayer.value++;
}

function decideSignal(decision: string) {
  signalCorrect.value = decision === signalActualType.value;
  signalGameOver.value = true;
}

onUnmounted(() => {
  if (fiveSecondsTimer.value) {
    clearInterval(fiveSecondsTimer.value);
  }
});
</script>
