if (
  localStorage.theme === 'dark' ||
  (!('theme' in localStorage) &&
    window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
  localStorage.setItem('theme', 'dark');
} else {
  localStorage.setItem('theme', 'ligth');
}
