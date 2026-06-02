<script lang="ts">
  import { getTheme, toggleTheme } from '$lib/stores/theme.svelte';
  import { Sun, Moon } from 'lucide-svelte';

  const theme = getTheme();
</script>

<button
  onclick={toggleTheme}
  class="btn btn-ghost btn-sm"
  aria-label="切换主题"
  title="切换深色/浅色模式"
>
  {#if theme === 'dark'}
    <Sun size={18} />
  {:else}
    <Moon size={18} />
  {/if}
</button>
