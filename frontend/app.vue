<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
/* Smooth transition for dark mode switching */
html {
  transition: background-color 0.3s, color 0.3s;
}

html.dark {
  color-scheme: dark;
}

/* Apply transition to common elements */
*,
*::before,
*::after {
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.2s ease;
}

/* Disable transitions on page load to prevent flash */
html.no-transition,
html.no-transition *,
html.no-transition *::before,
html.no-transition *::after {
  transition: none !important;
}
</style>
