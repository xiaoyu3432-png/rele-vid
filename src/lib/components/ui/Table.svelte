<script lang="ts" generics="T extends Record<string, unknown>">
  import type { Snippet } from 'svelte';

  interface Column {
    key: string;
    title: string;
    render?: (value: unknown, row: T) => string;
  }

  interface Props {
    columns: Column[];
    data: T[];
    onRowClick?: (row: T) => void;
    cell?: Snippet<[{ column: Column; row: T; value: unknown }]>;
  }

  let { columns, data, onRowClick, cell }: Props = $props();
</script>

<div class="card overflow-hidden">
  <div class="overflow-x-auto">
    <table class="w-full">
      <thead>
        <tr style="background-color: var(--color-neutral-50)">
          {#each columns as col}
            <th class="px-4 py-3 text-left text-sm font-medium" style="color: var(--color-neutral-500)">
              {col.title}
            </th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each data as row, i}
          <tr
            class="transition-colors duration-150 {onRowClick ? 'cursor-pointer' : ''}"
            style="border-top: 1px solid var(--color-neutral-200)"
            onclick={() => onRowClick?.(row)}
            onkeydown={(e) => e.key === 'Enter' && onRowClick?.(row)}
            role={onRowClick ? 'button' : undefined}
            tabindex={onRowClick ? 0 : undefined}
          >
            {#each columns as col}
              <td class="px-4 py-3 text-sm" style="color: var(--color-neutral-700)">
                {#if cell}
                  {@render cell({ column: col, row, value: row[col.key] })}
                {:else}
                  {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '')}
                {/if}
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
