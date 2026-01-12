export function useDarkMode() {
  const isDark = useState('darkMode', () => false);

  // Update the HTML class
  function updateClass() {
    if (typeof document === 'undefined') return;
    
    if (isDark.value) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  // Initialize from localStorage or system preference
  onMounted(() => {
    const stored = localStorage.getItem('darkMode');
    if (stored !== null) {
      isDark.value = stored === 'true';
    } else {
      // Check system preference
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    updateClass();
  });

  // Toggle dark mode
  function toggle() {
    isDark.value = !isDark.value;
    localStorage.setItem('darkMode', String(isDark.value));
    updateClass();
  }

  // Set dark mode explicitly
  function setDarkMode(value: boolean) {
    isDark.value = value;
    localStorage.setItem('darkMode', String(value));
    updateClass();
  }

  // Watch for changes
  watch(isDark, () => {
    updateClass();
  });

  return {
    isDark,
    toggle,
    setDarkMode
  };
}

export default useDarkMode;
