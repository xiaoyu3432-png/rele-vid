<script lang="ts">
  interface Props {
    variant?: 'primary' | 'success' | 'warning' | 'error';
    children: import('svelte').Snippet;
  }

  let { variant = 'primary', children }: Props = $props();
</script>

<span class="badge badge-{variant}">
  {@render children()}
</span>
