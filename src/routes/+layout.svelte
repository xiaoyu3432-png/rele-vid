<script lang="ts">
  import '../app.css';
  import favicon from '$lib/assets/favicon.svg';
  import { getTheme, syncTheme } from '$lib/stores/theme.svelte';

  const theme = getTheme();
  $effect(() => { syncTheme(); });
  import { ThemeToggle } from '$lib/components/ui';
  import {
    LayoutDashboard,
    Layers,
    Image,
    Settings,
    Search,
    Bell,
    Menu,
    X
  } from 'lucide-svelte';
  import { page } from '$app/state';

  let { children } = $props();
  let sidebarOpen = $state(false);

  const navItems = [
    { href: '/', label: '数据概览', icon: LayoutDashboard },
    { href: '/platforms', label: '平台管理', icon: Layers },
    { href: '/media', label: '素材管理', icon: Image },
  ];

  function closeSidebar() {
    sidebarOpen = false;
  }
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <title>Creator Hub</title>
</svelte:head>

<div class="min-h-screen" style="background-color: var(--color-neutral-50)">
  <!-- Header -->
  <header
    class="sticky top-0 z-40 h-16 border-b flex items-center justify-between px-4 md:px-6"
    style="background-color: var(--color-neutral-100); border-color: var(--color-neutral-200)"
  >
    <div class="flex items-center gap-3">
      <!-- Mobile menu button -->
      <button
        class="btn btn-ghost btn-sm md:hidden"
        onclick={() => sidebarOpen = !sidebarOpen}
        aria-label="切换菜单"
      >
        {#if sidebarOpen}
          <X size={20} />
        {:else}
          <Menu size={20} />
        {/if}
      </button>

      <!-- Logo -->
      <a href="/" class="flex items-center gap-2">
        <div
          class="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
          style="background-color: var(--color-primary-500)"
        >C</div>
        <span class="text-lg font-semibold hidden sm:inline" style="color: var(--color-neutral-900)">
          Creator Hub
        </span>
      </a>
    </div>

    <!-- Search (desktop) -->
    <div class="hidden md:flex flex-1 max-w-md mx-8">
      <div class="relative w-full">
        <Search size={16} class="absolute left-3 top-1/2 -translate-y-1/2" style="color: var(--color-neutral-400)" />
        <input
          type="text"
          placeholder="搜索功能、素材..."
          class="input pl-9 h-9 text-sm"
        />
      </div>
    </div>

    <!-- Right actions -->
    <div class="flex items-center gap-2">
      <ThemeToggle />
      <button class="btn btn-ghost btn-sm relative" aria-label="通知">
        <Bell size={18} />
        <span
          class="absolute top-1 right-1 w-2 h-2 rounded-full"
          style="background-color: var(--color-error)"
        ></span>
      </button>
      <a href="/settings" class="btn btn-ghost btn-sm" aria-label="设置">
        <Settings size={18} />
      </a>
    </div>
  </header>

  <div class="flex">
    <!-- Sidebar (desktop) -->
    <aside
      class="hidden md:flex md:w-64 lg:w-72 flex-col fixed top-16 bottom-0 border-r"
      style="background-color: var(--color-neutral-100); border-color: var(--color-neutral-200)"
    >
      <nav class="flex-1 p-4 space-y-1">
        {#each navItems as item}
          {@const active = page.url.pathname === item.href}
          <a
            href={item.href}
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150"
            style={active
              ? 'background-color: var(--color-primary-50); color: var(--color-primary-600)'
              : 'color: var(--color-neutral-600)'}
            onmouseenter={(e) => {
              if (!active) (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-neutral-200)';
            }}
            onmouseleave={(e) => {
              if (!active) (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
            }}
          >
            <item.icon size={20} />
            {item.label}
          </a>
        {/each}
      </nav>

      <!-- Sidebar footer - pinned to bottom -->
      <a href="/settings" class="block p-4 border-t mt-auto transition-colors duration-150" style="border-color: var(--color-neutral-200)"
        onmouseenter={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-neutral-200)'}
        onmouseleave={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'}
      >
        <div class="flex items-center gap-3">
          <div
            class="w-9 h-9 rounded-full flex items-center justify-center text-white font-medium shrink-0"
            style="background-color: var(--color-primary-500)"
          >U</div>
          <div class="min-w-0">
            <p class="text-sm font-medium truncate" style="color: var(--color-neutral-900)">用户名</p>
            <p class="text-xs truncate" style="color: var(--color-neutral-500)">user@example.com</p>
          </div>
        </div>
      </a>
    </aside>

    <!-- Mobile sidebar overlay -->
    {#if sidebarOpen}
      <!-- svelte-ignore a11y_no_static_element_interactions a11y_click_events_have_key_events -->
      <div
        class="fixed inset-0 z-30 md:hidden"
        style="background-color: rgba(0,0,0,0.4)"
        onclick={closeSidebar}
        onkeydown={(e) => e.key === 'Escape' && closeSidebar()}
        role="button"
        tabindex="-1"
      ></div>
    {/if}

    <!-- Mobile sidebar -->
    <aside
      class="fixed inset-y-16 left-0 z-30 w-64 border-r transform transition-transform duration-200 md:hidden"
      style="background-color: var(--color-neutral-100); border-color: var(--color-neutral-200); transform: translateX({sidebarOpen ? '0' : '-100%'})"
    >
      <nav class="p-4 space-y-1">
        {#each navItems as item}
          {@const active = page.url.pathname === item.href}
          <a
            href={item.href}
            onclick={closeSidebar}
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150"
            style={active
              ? 'background-color: var(--color-primary-50); color: var(--color-primary-600)'
              : 'color: var(--color-neutral-600)'}
          >
            <item.icon size={20} />
            {item.label}
          </a>
        {/each}
      </nav>
    </aside>

    <!-- Main content -->
    <main class="flex-1 md:ml-64 lg:ml-72 pb-20 md:pb-6">
      <div class="px-4 py-6 md:px-6 lg:px-8 max-w-7xl mx-auto">
        {@render children()}
      </div>
    </main>
  </div>

  <!-- Mobile bottom nav -->
  <nav
    class="fixed bottom-0 inset-x-0 z-40 border-t md:hidden"
    style="background-color: var(--color-neutral-100); border-color: var(--color-neutral-200)"
  >
    <div class="flex items-center justify-around h-16">
      {#each navItems as item}
        {@const active = page.url.pathname === item.href}
        <a
          href={item.href}
          class="flex flex-col items-center gap-0.5 px-3 py-1"
          style="color: {active ? 'var(--color-primary-500)' : 'var(--color-neutral-500)'}"
        >
          <item.icon size={22} />
          <span class="text-xs font-medium">{item.label}</span>
        </a>
      {/each}
    </div>
  </nav>
</div>
