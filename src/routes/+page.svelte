<script lang="ts">
  import { StatCard, Card, Badge } from '$lib/components/ui';
  import { Users, Eye, DollarSign, TrendingUp, ArrowRight } from 'lucide-svelte';

  const stats = [
    { label: '总粉丝数', value: '128,456', trend: '+12.5%', trendUp: true, icon: Users },
    { label: '总播放量', value: '2.4M', trend: '+8.3%', trendUp: true, icon: Eye },
    { label: '总收益', value: '¥18,920', trend: '+15.2%', trendUp: true, icon: DollarSign },
    { label: '互动率', value: '4.8%', trend: '-0.3%', trendUp: false, icon: TrendingUp },
  ];

  const platforms = [
    { name: '抖音', followers: '85,200', status: 'connected', growth: '+5.2%' },
    { name: '小红书', followers: '23,100', status: 'connected', growth: '+18.7%' },
    { name: 'B站', followers: '15,600', status: 'connected', growth: '+3.1%' },
    { name: '微博', followers: '4,556', status: 'disconnected', growth: '-1.2%' },
  ];
</script>

<div class="space-y-6">
  <!-- Page header -->
  <div>
    <h1 class="text-3xl font-bold" style="color: var(--color-neutral-900)">数据概览</h1>
    <p class="mt-1 text-base" style="color: var(--color-neutral-500)">查看您在各平台的表现数据</p>
  </div>

  <!-- Stats grid -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {#each stats as stat}
      {@const StatIcon = stat.icon}
      <StatCard
        label={stat.label}
        value={stat.value}
        trend={stat.trend}
        trendUp={stat.trendUp}
      >
        {#snippet icon()}
          <StatIcon size={24} style="color: var(--color-primary-500)" />
        {/snippet}
      </StatCard>
    {/each}
  </div>

  <!-- Platform comparison - full width -->
  <Card>
    <div class="p-4">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold" style="color: var(--color-neutral-900)">平台数据</h2>
        <a href="/platforms" class="text-sm font-medium flex items-center gap-1" style="color: var(--color-primary-500)">
          查看全部 <ArrowRight size={14} />
        </a>
      </div>
      <div class="space-y-3">
        {#each platforms as p}
          <div class="flex items-center justify-between py-2 border-b last:border-0" style="border-color: var(--color-neutral-200)">
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                style="background-color: var(--color-primary-500)"
              >
                {p.name[0]}
              </div>
              <div>
                <p class="text-sm font-medium" style="color: var(--color-neutral-900)">{p.name}</p>
                <p class="text-xs" style="color: var(--color-neutral-500)">{p.followers} 粉丝</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-sm font-medium" style="color: {p.growth.startsWith('+') ? 'var(--color-success)' : 'var(--color-error)'}">
                {p.growth}
              </span>
              <Badge variant={p.status === 'connected' ? 'success' : 'error'}>
                {p.status === 'connected' ? '已连接' : '未连接'}
              </Badge>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </Card>

  <!-- Trend placeholder -->
  <Card>
    <div class="p-4">
      <h2 class="text-lg font-semibold mb-4" style="color: var(--color-neutral-900)">近期趋势</h2>
      <div
        class="h-48 rounded-lg flex items-center justify-center border-2 border-dashed"
        style="border-color: var(--color-neutral-200); color: var(--color-neutral-400)"
      >
        <p class="text-sm">图表区域 — 可集成 Chart.js / Recharts</p>
      </div>
    </div>
  </Card>
</div>
