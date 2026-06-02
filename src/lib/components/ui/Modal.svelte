<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: Snippet;
    footer?: Snippet;
  }

  let { open = $bindable(false), onClose, title, children, footer }: Props = $props();

  function handleBackdrop(e: MouseEvent) {
    if (e.target === e.currentTarget) onClose();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') onClose();
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
  <!-- svelte-ignore a11y_no_static_element_interactions a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <div
    class="fixed inset-0 z-50 flex items-center justify-center p-4"
    style="background-color: rgba(0,0,0,0.5)"
    onclick={handleBackdrop}
    onkeydown={(e) => e.key === 'Escape' && onClose()}
    role="presentation"
  >
    <div
      class="card w-full max-w-md p-6 space-y-4"
      style="animation: modal-in 250ms ease-out"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {#if title}
        <h2 class="text-xl font-semibold" style="color: var(--color-neutral-900)">{title}</h2>
      {/if}
      {@render children()}
      {#if footer}
        <div class="flex justify-end space-x-3 pt-2">
          {@render footer()}
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  @keyframes modal-in {
    from {
      opacity: 0;
      transform: scale(0.95) translateY(8px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
</style>
