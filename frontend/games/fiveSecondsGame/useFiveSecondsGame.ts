export function useFiveSecondsGame() {
  const { t, tm, rt } = useI18n();

  // State
  const started = ref(false);
  const timeLeft = ref(5);
  const score = ref(0);
  const questionIndex = ref(0);
  const showResult = ref(false);
  const markedCorrect = ref(false);
  const gameOver = ref(false);
  const timer = ref<ReturnType<typeof setInterval> | null>(null);
  const shuffledQuestions = ref<string[]>([]);

  // Get questions from i18n
  const questions = computed((): string[] => {
    const questionsArray = tm('games.fiveSeconds.questions') as unknown[];
    if (Array.isArray(questionsArray)) {
      return questionsArray.map((q: unknown) => rt(q as any));
    }
    return [];
  });

  const currentQuestion = computed(() => {
    return shuffledQuestions.value[questionIndex.value] || '';
  });

  const hasMoreQuestions = computed(() => {
    return questionIndex.value < shuffledQuestions.value.length - 1;
  });

  // Shuffle array helper
  function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i]!, shuffled[j]!] = [shuffled[j]!, shuffled[i]!];
    }
    return shuffled;
  }

  // Start the game
  function start() {
    score.value = 0;
    questionIndex.value = 0;
    gameOver.value = false;
    started.value = true;
    shuffledQuestions.value = shuffleArray(questions.value);
    startTimer();
  }

  // Start/restart the timer for current question
  function startTimer() {
    showResult.value = false;
    markedCorrect.value = false;
    timeLeft.value = 5;

    if (timer.value) {
      clearInterval(timer.value);
    }

    timer.value = setInterval(() => {
      timeLeft.value--;
      if (timeLeft.value <= 0) {
        clearInterval(timer.value!);
        showResult.value = true;
      }
    }, 1000);
  }

  // Mark current answer as correct
  function markCorrect() {
    if (timer.value) {
      clearInterval(timer.value);
    }
    score.value++;
    markedCorrect.value = true;
    showResult.value = true;
    checkGameOver();
  }

  // Check if game is over
  function checkGameOver() {
    if (!hasMoreQuestions.value) {
      gameOver.value = true;
    }
  }

  // Move to next question
  function nextQuestion() {
    questionIndex.value++;
    checkGameOver();
    if (!gameOver.value) {
      startTimer();
    }
  }

  // Reset the game
  function reset() {
    if (timer.value) {
      clearInterval(timer.value);
    }
    started.value = false;
    score.value = 0;
    questionIndex.value = 0;
    showResult.value = false;
    markedCorrect.value = false;
    gameOver.value = false;
  }

  // Cleanup on unmount
  onUnmounted(() => {
    if (timer.value) {
      clearInterval(timer.value);
    }
  });

  return {
    // State
    started,
    timeLeft,
    score,
    questionIndex,
    showResult,
    markedCorrect,
    gameOver,
    currentQuestion,
    hasMoreQuestions,
    totalQuestions: computed(() => shuffledQuestions.value.length),
    // Actions
    start,
    markCorrect,
    nextQuestion,
    reset
  };
}

export default useFiveSecondsGame;