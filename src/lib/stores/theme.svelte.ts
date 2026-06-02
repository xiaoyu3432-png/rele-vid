import { browser } from '$app/environment';

type Theme = 'light' | 'dark';

function getInitialTheme(): Theme {
  if (!browser) return 'dark';
  const stored = localStorage.getItem('theme');
  return stored === 'light' || stored === 'dark' ? stored : 'dark';
}

let theme = $state<Theme>(getInitialTheme());

export function getTheme() {
  return theme;
}

export function toggleTheme() {
  theme = theme === 'dark' ? 'light' : 'dark';
}

export function setTheme(value: Theme) {
  theme = value;
}

export function syncTheme() {
  if (!browser) return;
  document.documentElement.classList.toggle('dark', theme === 'dark');
  localStorage.setItem('theme', theme);
}
