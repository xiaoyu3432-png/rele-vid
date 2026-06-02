<script lang="ts">
  import Card from './Card.svelte';

  interface Props {
    label: string;
    value: string;
    trend?: string;
    trendUp?: boolean;
    icon?: import('svelte').Snippet;
  }

  let { label, value, trend, trendUp = true, icon }: Props = $props();
</script>

<Card>
  <div class="p-4">
    <div class="flex items-center justify-between">
      <span class="text-sm" style="color: var(--color-neutral-500)">{label}</span>
      {#if trend}
        <span class="text-xs font-medium" style="color: {trendUp ? 'var(--color-success)' : 'var(--color-error)'}">
          {trendUp ? '↑' : '↓'} {trend}
        </span>
      {/if}
    </div>
    <div class="flex items-center gap-3 mt-2">
      {#if icon}
        <div class="shrink-0">{@render icon()}</div>
      {/if}
      <p class="text-3xl font-bold" style="color: var(--color-neutral-900)">{value}</p>
    </div>
  </div>
</Card>
