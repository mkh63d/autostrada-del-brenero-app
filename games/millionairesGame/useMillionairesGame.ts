interface MillionairesQuestion {
  question: string;
  answers: string[];
  correctIndex: number;
}

export function useMillionairesGame() {
  const { t, tm, rt } = useI18n();

  // Prize levels
  const prizeLevels = [
    '€100', '€200', '€500', '€1,000', '€2,000',
    '€5,000', '€10,000', '€50,000', '€100,000', '€1,000,000'
  ];

  // State
  const started = ref(false);
  const questionIndex = ref(0);
  const selectedAnswer = ref<number | null>(null);
  const gameOver = ref(false);
  const won = ref(false);
  const shuffledQuestions = ref<MillionairesQuestion[]>([]);

  // Get questions from i18n
  const questions = computed((): MillionairesQuestion[] => {
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

  const currentQuestion = computed(() => {
    return shuffledQuestions.value[questionIndex.value];
  });

  const currentPrize = computed(() => {
    return prizeLevels[questionIndex.value] || prizeLevels[0];
  });

  const isLastQuestion = computed(() => {
    return questionIndex.value >= 9;
  });

  // Shuffle array helper
  function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Start the game
  function start() {
    questionIndex.value = 0;
    selectedAnswer.value = null;
    gameOver.value = false;
    won.value = false;
    started.value = true;
    shuffledQuestions.value = shuffleArray(questions.value).slice(0, 10);
  }

  // Select an answer
  function selectAnswer(index: number) {
    if (selectedAnswer.value !== null) return;

    selectedAnswer.value = index;

    if (index !== currentQuestion.value?.correctIndex) {
      gameOver.value = true;
      won.value = false;
    }
  }

  // Move to next question
  function nextQuestion() {
    if (isLastQuestion.value) {
      gameOver.value = true;
      won.value = true;
    } else {
      questionIndex.value++;
      selectedAnswer.value = null;
    }
  }

  // Get answer button styling class
  function getAnswerClass(index: number) {
    if (selectedAnswer.value === null) {
      return 'bg-white border-gray-300 hover:bg-amber-50 hover:border-amber-400';
    }
    if (index === currentQuestion.value?.correctIndex) {
      return 'bg-green-100 border-green-500 text-green-800';
    }
    if (index === selectedAnswer.value) {
      return 'bg-red-100 border-red-500 text-red-800';
    }
    return 'bg-gray-100 border-gray-300 opacity-50';
  }

  // Reset the game
  function reset() {
    started.value = false;
    questionIndex.value = 0;
    selectedAnswer.value = null;
    gameOver.value = false;
    won.value = false;
  }

  return {
    // State
    started,
    questionIndex,
    selectedAnswer,
    gameOver,
    won,
    currentQuestion,
    currentPrize,
    prizeLevels,
    isLastQuestion,
    // Actions
    start,
    selectAnswer,
    nextQuestion,
    getAnswerClass,
    reset
  };
}

export default useMillionairesGame;