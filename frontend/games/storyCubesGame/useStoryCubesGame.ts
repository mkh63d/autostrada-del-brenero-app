export function useStoryCubesGame() {
  // All available symbols for the cubes
  const allSymbols = [
    '🌟', '🌙', '☀️', '🌈', '⛰️', '🏠', '🏰', '🌲', '🌊', '🔥',
    '🚗', '✈️', '🚀', '⛵', '🚲', '🎸', '🎨', '📚', '💎', '🔑',
    '👑', '🎭', '🎪', '🎯', '🎁', '💡', '🔮', '⚡', '❤️', '🍎',
    '🐕', '🐈', '🦁', '🐘', '🦋', '🐦', '🐟', '🌸', '🍀', '🌵',
    '👤', '👥', '👀', '✋', '🦶', '💬', '💭', '❗', '❓', '⏰',
    '🎵', '🎮', '📷', '💻', '📱', '🔧', '🎈', '🍕', '🍦', '☕'
  ];

  // State
  const symbols = ref(['❓', '❓', '❓', '❓']);
  const isRolling = ref(false);
  const hasRolled = ref(false);

  // Get N unique random symbols
  function getUniqueRandomSymbols(count: number): string[] {
    const shuffled = [...allSymbols].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  // Roll all 4 cubes
  function roll() {
    if (isRolling.value) return;

    isRolling.value = true;
    hasRolled.value = false;

    let rollCount = 0;
    const rollInterval = setInterval(() => {
      // During animation, show random (can repeat)
      symbols.value = getUniqueRandomSymbols(4);
      rollCount++;

      if (rollCount >= 10) {
        clearInterval(rollInterval);
        // Final roll: ensure unique symbols
        symbols.value = getUniqueRandomSymbols(4);
        isRolling.value = false;
        hasRolled.value = true;
      }
    }, 100);
  }

  // Reset the cubes
  function reset() {
    symbols.value = ['❓', '❓', '❓', '❓'];
    isRolling.value = false;
    hasRolled.value = false;
  }

  return {
    // State
    symbols,
    isRolling,
    hasRolled,
    // Actions
    roll,
    reset
  };
}

export default useStoryCubesGame;