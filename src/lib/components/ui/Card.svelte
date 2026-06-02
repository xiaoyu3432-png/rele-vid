<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    hover?: boolean;
    class?: string;
    children: Snippet;
  }

  let { hover = false, class: className = '', children }: Props = $props();
</script>

<div class="card {hover ? 'card-hover' : ''} {className}">
  {@render children()}
</div>
