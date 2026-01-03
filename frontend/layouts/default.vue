<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
    <nav class="bg-white dark:bg-gray-800 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-8">
            <NuxtLink to="/" class="text-xl font-bold text-blue-600 dark:text-blue-400">
              {{ $t('app.title') }}
            </NuxtLink>
            <div class="hidden md:flex space-x-4">
              <NuxtLink 
                to="/" 
                class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium"
              >
                {{ $t('nav.home') }}
              </NuxtLink>
              <NuxtLink 
                to="/add" 
                class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium"
              >
                {{ $t('nav.add') }}
              </NuxtLink>
              <NuxtLink 
                to="/games" 
                class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium"
              >
                {{ $t('nav.games') }}
              </NuxtLink>
            </div>
          </div>
          
          <div class="flex items-center space-x-3">
            <!-- Dark mode toggle -->
            <button
              @click="toggle"
              class="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            >
              <svg v-if="isDark" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>

            <select 
              v-model="selectedLocale" 
              @change="changeLocale"
              class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="en">🇬🇧 EN</option>
              <option value="pl">🇵🇱 PL</option>
              <option value="it">🇮🇹 IT</option>
            </select>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <slot />
    </main>

    <!-- Mobile navigation -->
    <nav class="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg">
      <div class="flex justify-around items-center h-16">
        <NuxtLink 
          to="/" 
          class="flex flex-col items-center justify-center flex-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span class="text-xs mt-1">{{ $t('nav.home') }}</span>
        </NuxtLink>
        
        <NuxtLink 
          to="/add" 
          class="flex flex-col items-center justify-center flex-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          <span class="text-xs mt-1">{{ $t('nav.add') }}</span>
        </NuxtLink>

        <NuxtLink 
          to="/games" 
          class="flex flex-col items-center justify-center flex-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="text-xs mt-1">{{ $t('nav.games') }}</span>
        </NuxtLink>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import useDarkMode from '~/composables/useDarkMode';

const { locale, setLocale } = useI18n();
const selectedLocale = ref(locale.value);
const { isDark, toggle } = useDarkMode();

const changeLocale = () => {
  setLocale(selectedLocale.value);
};

watch(locale, (newLocale) => {
  selectedLocale.value = newLocale;
});
</script>
