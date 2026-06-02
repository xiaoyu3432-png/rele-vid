<script lang="ts">
  import { Card, Badge, Button, Modal } from '$lib/components/ui';
  import { Upload, Grid3X3, List, Search, Film, FileText, Send, Check, X, Play } from 'lucide-svelte';

  const categories = ['全部', '图片', '视频', '文档'];
  let activeCategory = $state('全部');
  let viewMode = $state<'grid' | 'list'>('grid');

  // Selection state
  let selectedItems = $state<Set<number>>(new Set());
  let showPublishModal = $state(false);
  let publishPlatforms = $state<Set<string>>(new Set());

  // Preview state
  let showPreview = $state(false);
  let previewItem = $state<{ name: string; type: string; src: string; poster?: string } | null>(null);

  const connectedPlatforms = ['抖音', '小红书', 'B站'];

  const mediaItems = $state([
    { name: '产品展示图-01.jpg', type: 'image' as const, src: 'https://picsum.photos/seed/prod1/400/400', size: '2.4 MB', date: '2026-06-02', tag: '产品' },
    { name: '直播预告封面.png', type: 'image' as const, src: 'https://picsum.photos/seed/live1/400/400', size: '1.8 MB', date: '2026-06-01', tag: '直播' },
    { name: 'Vlog素材-拍摄花絮.mp4', type: 'video' as const, src: 'https://www.w3schools.com/html/mov_bbb.mp4', poster: 'https://picsum.photos/seed/vlog1/400/400', size: '156 MB', date: '2026-05-30', tag: 'Vlog' },
    { name: '品牌合作方案.pdf', type: 'document' as const, src: '', size: '3.2 MB', date: '2026-05-28', tag: '商务' },
    { name: '日常穿搭-03.jpg', type: 'image' as const, src: 'https://picsum.photos/seed/fashion3/400/400', size: '1.5 MB', date: '2026-05-27', tag: '穿搭' },
    { name: '产品评测视频.mp4', type: 'video' as const, src: 'https://www.w3schools.com/html/movie.mp4', poster: 'https://picsum.photos/seed/review1/400/400', size: '320 MB', date: '2026-05-25', tag: '评测' },
    { name: '美食探店-封面.jpg', type: 'image' as const, src: 'https://picsum.photos/seed/food7/400/400', size: '2.1 MB', date: '2026-05-24', tag: '美食' },
    { name: '年度总结报告.docx', type: 'document' as const, src: '', size: '856 KB', date: '2026-05-22', tag: '报告' },
  ]);

  function toggleSelect(index: number) {
    const next = new Set(selectedItems);
    if (next.has(index)) next.delete(index);
    else next.add(index);
    selectedItems = next;
  }

  function selectAll() {
    if (selectedItems.size === filteredItems.length) {
      selectedItems = new Set();
    } else {
      selectedItems = new Set(filteredItems.map((_, i) => i));
    }
  }

  function clearSelection() {
    selectedItems = new Set();
  }

  function openPublish() {
    publishPlatforms = new Set();
    showPublishModal = true;
  }

  function togglePlatform(name: string) {
    const next = new Set(publishPlatforms);
    if (next.has(name)) next.delete(name);
    else next.add(name);
    publishPlatforms = next;
  }

  function handlePublish() {
    showPublishModal = false;
    selectedItems = new Set();
  }

  function openPreview(item: { name: string; type: string; src: string; poster?: string }) {
    previewItem = item;
    showPreview = true;
  }

  let filteredItems = $derived(
    activeCategory === '全部'
      ? mediaItems
      : activeCategory === '图片'
        ? mediaItems.filter(m => m.type === 'image')
        : activeCategory === '视频'
          ? mediaItems.filter(m => m.type === 'video')
          : mediaItems.filter(m => m.type === 'document')
  );
</script>

<div class="space-y-6">
  <!-- Page header -->
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div>
      <h1 class="text-3xl font-bold" style="color: var(--color-neutral-900)">素材管理</h1>
      <p class="mt-1 text-base" style="color: var(--color-neutral-500)">管理您的图片、视频和文档素材</p>
    </div>
    <div class="flex gap-2">
      {#if selectedItems.size > 0}
        <Button variant="primary" size="md" onclick={openPublish}>
          {#snippet children()}
            <Send size={16} /> 发布 ({selectedItems.size})
          {/snippet}
        </Button>
      {/if}
      <Button variant="secondary" size="md">
        {#snippet children()}
          <Upload size={18} /> 上传素材
        {/snippet}
      </Button>
    </div>
  </div>

  <!-- Toolbar -->
  <Card>
    <div class="p-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
      <div class="relative w-full sm:w-64">
        <Search size={16} class="absolute left-3 top-1/2 -translate-y-1/2" style="color: var(--color-neutral-400)" />
        <input type="text" placeholder="搜索素材..." class="input pl-9 h-9 text-sm" />
      </div>

      <div class="flex items-center gap-2">
        {#if filteredItems.length > 0}
          <Button variant="ghost" size="sm" onclick={selectedItems.size === filteredItems.length ? clearSelection : selectAll}>
            {#snippet children()}
              {#if selectedItems.size === filteredItems.size}
                <X size={14} /> 取消全选
              {:else}
                <Check size={14} /> 全选
              {/if}
            {/snippet}
          </Button>
        {/if}

        <div class="flex rounded-lg overflow-hidden border" style="border-color: var(--color-neutral-200)">
          {#each categories as cat}
            <button
              class="px-3 py-1.5 text-sm font-medium transition-colors"
              style={activeCategory === cat
                ? 'background-color: var(--color-primary-500); color: white'
                : 'color: var(--color-neutral-600)'}
              onclick={() => { activeCategory = cat; selectedItems = new Set(); }}
            >
              {cat}
            </button>
          {/each}
        </div>

        <div class="flex rounded-lg overflow-hidden border" style="border-color: var(--color-neutral-200)">
          <button
            class="p-1.5 transition-colors"
            style={viewMode === 'grid'
              ? 'background-color: var(--color-primary-50); color: var(--color-primary-500)'
              : 'color: var(--color-neutral-400)'}
            onclick={() => viewMode = 'grid'}
            aria-label="网格视图"
          >
            <Grid3X3 size={18} />
          </button>
          <button
            class="p-1.5 transition-colors border-l"
            style="border-color: var(--color-neutral-200); {viewMode === 'list'
              ? 'background-color: var(--color-primary-50); color: var(--color-primary-500)'
              : 'color: var(--color-neutral-400)'}"
            onclick={() => viewMode = 'list'}
            aria-label="列表视图"
          >
            <List size={18} />
          </button>
        </div>
      </div>
    </div>
  </Card>

  <!-- Media grid -->
  {#if viewMode === 'grid'}
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {#each filteredItems as item, i}
        {@const selected = selectedItems.has(i)}
        <Card hover>
          <div class="p-3">
            <!-- Thumbnail -->
            <button
              class="relative aspect-square rounded-lg overflow-hidden mb-3 w-full"
              style="background-color: var(--color-neutral-100)"
              onclick={() => item.type !== 'document' && item.src && openPreview(item)}
              onkeydown={(e) => e.key === 'Enter' && item.type !== 'document' && item.src && openPreview(item)}
            >
              {#if item.type === 'image' || item.type === 'video'}
                <img src={item.type === 'video' && 'poster' in item ? item.poster : item.src} alt={item.name} class="w-full h-full object-cover" loading="lazy" />
                {#if item.type === 'video'}
                  <div class="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div class="w-12 h-12 rounded-full flex items-center justify-center" style="background-color: rgba(255,255,255,0.9)">
                      <Play size={24} style="color: var(--color-neutral-900)" fill="var(--color-neutral-900)" />
                    </div>
                  </div>
                {/if}
              {:else}
                <div class="w-full h-full flex items-center justify-center">
                  <FileText size={32} style="color: var(--color-neutral-400)" />
                </div>
              {/if}
            </button>

            <!-- Info -->
            <button class="w-full text-left" onclick={(e) => { if (e.shiftKey || e.ctrlKey || e.metaKey) { e.preventDefault(); toggleSelect(i); } }}>
              <p class="text-sm font-medium truncate" style="color: var(--color-neutral-900)">{item.name}</p>
            </button>
            <div class="flex items-center justify-between mt-1.5">
              <span class="text-xs" style="color: var(--color-neutral-400)">{item.size}</span>
              <Badge variant="primary">{item.tag}</Badge>
            </div>

            <!-- Checkbox row -->
            <button
              class="w-full flex items-center gap-2 mt-2 pt-2 border-t"
              style="border-color: var(--color-neutral-200)"
              onclick={() => toggleSelect(i)}
            >
              <div
                class="w-4 h-4 rounded border-2 flex items-center justify-center transition-colors shrink-0"
                style="border-color: {selected ? 'var(--color-primary-500)' : 'var(--color-neutral-300)'}; background-color: {selected ? 'var(--color-primary-500)' : 'transparent'}"
              >
                {#if selected}
                  <Check size={10} style="color: white" />
                {/if}
              </div>
              <span class="text-xs" style="color: {selected ? 'var(--color-primary-500)' : 'var(--color-neutral-500)'}">
                {selected ? '已选中' : '选择'}
              </span>
            </button>
          </div>
        </Card>
      {/each}
    </div>
  {:else}
    <Card>
      <div>
        {#each filteredItems as item, i}
          {@const selected = selectedItems.has(i)}
          <button
            class="w-full flex items-center gap-4 p-4 transition-colors text-left border-b last:border-0"
            style="border-color: var(--color-neutral-200); background-color: {selected ? 'var(--color-primary-50)' : 'transparent'}"
            onclick={() => toggleSelect(i)}
          >
            <div
              class="w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors"
              style="border-color: {selected ? 'var(--color-primary-500)' : 'var(--color-neutral-300)'}; background-color: {selected ? 'var(--color-primary-500)' : 'transparent'}"
            >
              {#if selected}
                <Check size={12} style="color: white" />
              {/if}
            </div>
            <!-- Thumbnail -->
            <div class="w-12 h-12 rounded-lg overflow-hidden shrink-0" style="background-color: var(--color-neutral-100)">
              {#if item.type === 'image' || item.type === 'video'}
                <img src={item.type === 'video' && 'poster' in item ? item.poster : item.src} alt={item.name} class="w-full h-full object-cover" loading="lazy" />
              {:else}
                <div class="w-full h-full flex items-center justify-center">
                  <FileText size={20} style="color: var(--color-neutral-500)" />
                </div>
              {/if}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium truncate" style="color: var(--color-neutral-900)">{item.name}</p>
              <p class="text-xs mt-0.5" style="color: var(--color-neutral-400)">{item.date}</p>
            </div>
            <span class="text-xs shrink-0" style="color: var(--color-neutral-500)">{item.size}</span>
            <Badge variant="primary">{item.tag}</Badge>
            {#if item.type === 'video' || item.type === 'image'}
              <button
                class="btn btn-ghost btn-sm shrink-0"
                onclick={(e) => { e.stopPropagation(); openPreview(item); }}
              >
                <Play size={14} /> 预览
              </button>
            {/if}
          </button>
        {/each}
      </div>
    </Card>
  {/if}
</div>

<!-- Preview Modal -->
{#if previewItem}
  <Modal bind:open={showPreview} title={previewItem.name} onClose={() => { showPreview = false; previewItem = null; }}>
    {#if previewItem.type === 'image'}
      <div class="rounded-lg overflow-hidden">
        <img src={previewItem.src} alt={previewItem.name} class="w-full max-h-[60vh] object-contain" />
      </div>
    {:else if previewItem.type === 'video'}
      <div class="rounded-lg overflow-hidden">
        <video src={previewItem.src} poster={'poster' in previewItem ? previewItem.poster : ''} controls autoplay class="w-full max-h-[60vh]">
          您的浏览器不支持视频播放
        </video>
      </div>
    {/if}
    {#snippet footer()}
      <Button variant="ghost" size="md" onclick={() => { showPreview = false; previewItem = null; }}>
        {#snippet children()}关闭{/snippet}
      </Button>
    {/snippet}
  </Modal>
{/if}

<!-- Publish Modal -->
<Modal bind:open={showPublishModal} title="发布素材" onClose={() => showPublishModal = false}>
  <div class="space-y-4">
    <div>
      <p class="text-sm font-medium mb-1" style="color: var(--color-neutral-700)">已选素材</p>
      <div class="flex flex-wrap gap-2">
        {#each [...selectedItems] as idx}
          <span class="badge badge-primary">{filteredItems[idx]?.name}</span>
        {/each}
      </div>
    </div>

    <div>
      <p class="text-sm font-medium mb-2" style="color: var(--color-neutral-700)">发布到平台</p>
      <div class="space-y-2">
        {#each connectedPlatforms as name}
          {@const checked = publishPlatforms.has(name)}
          <button
            class="w-full flex items-center justify-between p-3 rounded-lg border transition-colors"
            style="border-color: {checked ? 'var(--color-primary-500)' : 'var(--color-neutral-200)'}; background-color: {checked ? 'var(--color-primary-50)' : 'transparent'}"
            onclick={() => togglePlatform(name)}
          >
            <span class="text-sm font-medium" style="color: var(--color-neutral-900)">{name}</span>
            <div
              class="w-5 h-5 rounded border-2 flex items-center justify-center transition-colors"
              style="border-color: {checked ? 'var(--color-primary-500)' : 'var(--color-neutral-300)'}; background-color: {checked ? 'var(--color-primary-500)' : 'transparent'}"
            >
              {#if checked}
                <Check size={12} style="color: white" />
              {/if}
            </div>
          </button>
        {/each}
      </div>
    </div>
  </div>

  {#snippet footer()}
    <Button variant="ghost" size="md" onclick={() => showPublishModal = false}>
      {#snippet children()}取消{/snippet}
    </Button>
    <Button variant="primary" size="md" onclick={handlePublish} disabled={publishPlatforms.size === 0}>
      {#snippet children()}
        <Send size={16} /> 发布到 {publishPlatforms.size} 个平台
      {/snippet}
    </Button>
  {/snippet}
</Modal>
