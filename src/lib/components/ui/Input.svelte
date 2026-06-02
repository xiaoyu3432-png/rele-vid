<script lang="ts">
  interface Props {
    label?: string;
    placeholder?: string;
    value?: string;
    type?: string;
    error?: string;
    disabled?: boolean;
    name?: string;
    id?: string;
    oninput?: (e: Event) => void;
  }

  let {
    label,
    placeholder,
    value = $bindable(''),
    type = 'text',
    error,
    disabled = false,
    name,
    id,
    oninput
  }: Props = $props();

  const inputId = $derived(id ?? name ?? label?.toLowerCase().replace(/\s+/g, '-'));
</script>

<div class="space-y-1">
  {#if label}
    <label for={inputId} class="block text-sm font-medium" style="color: var(--color-neutral-700)">
      {label}
    </label>
  {/if}
  <input
    {type}
    {name}
    {placeholder}
    {disabled}
    id={inputId}
    bind:value
    {oninput}
    class="input {error ? 'input-error' : ''}"
  />
  {#if error}
    <p class="text-xs" style="color: var(--color-error)">{error}</p>
  {/if}
</div>
