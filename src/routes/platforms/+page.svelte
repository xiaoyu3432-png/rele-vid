<script lang="ts">
  import { Card, Badge, Button, Modal } from '$lib/components/ui';
  import { Plus, ExternalLink, RefreshCw, Unlink, Check } from 'lucide-svelte';

  let showAddModal = $state(false);
  let showConnectModal = $state(false);
  let selectedPlatform = $state('');

  const availablePlatforms = [
    { name: '快手', icon: '🎬' },
    { name: 'YouTube', icon: '▶️' },
    { name: '微信视频号', icon: '💬' },
    { name: '知乎', icon: '📝' },
  ];

  let platforms = $state([
    {
      name: '抖音',
      icon: '🎵',
      followers: '85,200',
      posts: 342,
      status: 'connected' as const,
      lastSync: '2 分钟前',
      growth: '+5.2%',
    },
    {
      name: '小红书',
      icon: '📕',
      followers: '23,100',
      posts: 128,
      status: 'connected' as const,
      lastSync: '5 分钟前',
      growth: '+18.7%',
    },
    {
      name: 'B站',
      icon: '📺',
      followers: '15,600',
      posts: 86,
      status: 'connected' as const,
      lastSync: '10 分钟前',
      growth: '+3.1%',
    },
    {
      name: '微博',
      icon: '🌐',
      followers: '4,556',
      posts: 215,
      status: 'disconnected' as const,
      lastSync: '—',
      growth: '-1.2%',
    },
  ]);

  function openConnect(name: string) {
    selectedPlatform = name;
    showConnectModal = true;
  }

  function handleConnect() {
    platforms = platforms.map(p =>
      p.name === selectedPlatform ? { ...p, status: 'connected' as const, lastSync: '刚刚' } : p
    );
    showConnectModal = false;
  }

  function handleDisconnect() {
    platforms = platforms.map(p =>
      p.name === selectedPlatform ? { ...p, status: 'disconnected' as const, lastSync: '—' } : p
    );
    showConnectModal = false;
  }
</script>

<div class="space-y-6">
  <!-- Page header -->
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div>
      <h1 class="text-3xl font-bold" style="color: var(--color-neutral-900)">平台管理</h1>
      <p class="mt-1 text-base" style="color: var(--color-neutral-500)">管理您连接的内容创作平台</p>
    </div>
    <Button variant="primary" size="md" onclick={() => showAddModal = true}>
      {#snippet children()}
        <Plus size={18} /> 添加平台
      {/snippet}
    </Button>
  </div>

  <!-- Platform cards -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    {#each platforms as p}
      <Card hover>
        <div class="p-5">
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-3">
              <div
                class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style="background-color: var(--color-primary-50)"
              >
                {p.icon}
              </div>
              <div>
                <h3 class="text-lg font-semibold" style="color: var(--color-neutral-900)">{p.name}</h3>
                <Badge variant={p.status === 'connected' ? 'success' : 'error'}>
                  {p.status === 'connected' ? '已连接' : '未连接'}
                </Badge>
              </div>
            </div>
            {#if p.status === 'connected'}
              <button class="btn btn-ghost btn-sm" aria-label="刷新">
                <RefreshCw size={16} />
              </button>
            {/if}
          </div>

          <div class="grid grid-cols-3 gap-4 mt-5 pt-4 border-t" style="border-color: var(--color-neutral-200)">
            <div>
              <p class="text-xs" style="color: var(--color-neutral-500)">粉丝数</p>
              <p class="text-lg font-semibold mt-0.5" style="color: var(--color-neutral-900)">{p.followers}</p>
            </div>
            <div>
              <p class="text-xs" style="color: var(--color-neutral-500)">内容数</p>
              <p class="text-lg font-semibold mt-0.5" style="color: var(--color-neutral-900)">{p.posts}</p>
            </div>
            <div>
              <p class="text-xs" style="color: var(--color-neutral-500)">增长率</p>
              <p
                class="text-lg font-semibold mt-0.5"
                style="color: {p.growth.startsWith('+') ? 'var(--color-success)' : 'var(--color-error)'}"
              >{p.growth}</p>
            </div>
          </div>

          <div class="flex items-center justify-between mt-4 pt-3 border-t" style="border-color: var(--color-neutral-200)">
            <span class="text-xs" style="color: var(--color-neutral-400)">上次同步：{p.lastSync}</span>
            <div class="flex gap-2">
              {#if p.status === 'connected'}
                <Button variant="ghost" size="sm">
                  {#snippet children()}
                    <ExternalLink size={14} /> 访问
                  {/snippet}
                </Button>
                <Button variant="ghost" size="sm" onclick={() => openConnect(p.name)}>
                  {#snippet children()}
                    <Unlink size={14} /> 断开
                  {/snippet}
                </Button>
              {:else}
                <Button variant="primary" size="sm" onclick={() => openConnect(p.name)}>
                  {#snippet children()}
                    连接
                  {/snippet}
                </Button>
              {/if}
            </div>
          </div>
        </div>
      </Card>
    {/each}
  </div>
</div>

<!-- Add Platform Modal -->
<Modal bind:open={showAddModal} title="添加平台" onClose={() => showAddModal = false}>
  <p class="text-sm" style="color: var(--color-neutral-600)">选择要添加的内容创作平台：</p>
  <div class="grid grid-cols-2 gap-3 mt-3">
    {#each availablePlatforms as ap}
      <button
        class="flex items-center gap-3 p-3 rounded-lg border transition-colors text-left"
        style="border-color: var(--color-neutral-200)"
        onmouseenter={(e) => (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-primary-500)'}
        onmouseleave={(e) => (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-neutral-200)'}
        onclick={() => { showAddModal = false; openConnect(ap.name); }}
      >
        <span class="text-2xl">{ap.icon}</span>
        <span class="text-sm font-medium" style="color: var(--color-neutral-900)">{ap.name}</span>
      </button>
    {/each}
  </div>
  {#snippet footer()}
    <Button variant="ghost" size="md" onclick={() => showAddModal = false}>
      {#snippet children()}取消{/snippet}
    </Button>
  {/snippet}
</Modal>

<!-- Connect/Disconnect Modal -->
<Modal bind:open={showConnectModal} title="{selectedPlatform}" onClose={() => showConnectModal = false}>
  {@const p = platforms.find(x => x.name === selectedPlatform)}
  {#if p?.status === 'connected'}
    <p class="text-sm" style="color: var(--color-neutral-600)">
      确定要断开与 <strong>{selectedPlatform}</strong> 的连接吗？断开后将无法同步数据。
    </p>
  {:else}
    <p class="text-sm" style="color: var(--color-neutral-600)">
      即将连接 <strong>{selectedPlatform}</strong>，完成后可同步该平台的数据和内容。
    </p>
    <div class="mt-3 p-3 rounded-lg" style="background-color: var(--color-primary-50)">
      <p class="text-xs" style="color: var(--color-primary-700)">连接后将自动同步粉丝数、播放量、收益等数据</p>
    </div>
  {/if}
  {#snippet footer()}
    <Button variant="ghost" size="md" onclick={() => showConnectModal = false}>
      {#snippet children()}取消{/snippet}
    </Button>
    {#if p?.status === 'connected'}
      <Button variant="danger" size="md" onclick={handleDisconnect}>
        {#snippet children()}断开连接{/snippet}
      </Button>
    {:else}
      <Button variant="primary" size="md" onclick={handleConnect}>
        {#snippet children()}确认连接{/snippet}
      </Button>
    {/if}
  {/snippet}
</Modal>
