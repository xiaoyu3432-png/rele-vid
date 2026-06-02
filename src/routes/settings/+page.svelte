<script lang="ts">
  import { Card, Button, Input, Badge } from '$lib/components/ui';
  import { getTheme, setTheme } from '$lib/stores/theme.svelte';

  const theme = getTheme();
  import { User, Bell, Palette, Shield, Save } from 'lucide-svelte';

  let name = $state('创作者小王');
  let bio = $state('专注生活方式与科技领域的内容创作者');
  let email = $state('xiaowang@example.com');

  let notifComments = $state(true);
  let notifFollows = $state(true);
  let notifEarnings = $state(false);

  const linkedAccounts = [
    { name: '抖音', status: 'connected' as const, icon: '🎵' },
    { name: '小红书', status: 'connected' as const, icon: '📕' },
    { name: 'B站', status: 'connected' as const, icon: '📺' },
    { name: '微博', status: 'disconnected' as const, icon: '🌐' },
  ];

  function handleSave() {
    // Save logic placeholder
  }
</script>

<div class="space-y-6 max-w-3xl mx-auto pt-2">

  <!-- Profile section -->
  <Card>
    <div class="p-5">
      <div class="flex items-center gap-2 mb-5">
        <User size={20} style="color: var(--color-primary-500)" />
        <h2 class="text-lg font-semibold" style="color: var(--color-neutral-900)">个人信息</h2>
      </div>

      <div class="flex items-center gap-5 mb-6">
        <div
          class="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold shrink-0"
          style="background-color: var(--color-primary-500)"
        >
          王
        </div>
        <div>
          <Button variant="secondary" size="sm">
            {#snippet children()}更换头像{/snippet}
          </Button>
          <p class="text-xs mt-1.5" style="color: var(--color-neutral-400)">支持 JPG、PNG，最大 2MB</p>
        </div>
      </div>

      <div class="space-y-4">
        <Input label="用户名" bind:value={name} placeholder="请输入用户名" />
        <Input label="个人简介" bind:value={bio} placeholder="介绍一下自己" />
        <Input label="邮箱" bind:value={email} type="email" placeholder="your@email.com" />
      </div>

      <div class="mt-5 pt-4 border-t flex justify-end" style="border-color: var(--color-neutral-200)">
        <Button variant="primary" size="md" onclick={handleSave}>
          {#snippet children()}
            <Save size={16} /> 保存更改
          {/snippet}
        </Button>
      </div>
    </div>
  </Card>

  <!-- Linked accounts -->
  <Card>
    <div class="p-5">
      <div class="flex items-center gap-2 mb-5">
        <Shield size={20} style="color: var(--color-primary-500)" />
        <h2 class="text-lg font-semibold" style="color: var(--color-neutral-900)">账号绑定</h2>
      </div>

      <div class="space-y-3">
        {#each linkedAccounts as account}
          <div class="flex items-center justify-between py-3 border-b last:border-0" style="border-color: var(--color-neutral-200)">
            <div class="flex items-center gap-3">
              <span class="text-xl">{account.icon}</span>
              <span class="text-sm font-medium" style="color: var(--color-neutral-900)">{account.name}</span>
              <Badge variant={account.status === 'connected' ? 'success' : 'error'}>
                {account.status === 'connected' ? '已绑定' : '未绑定'}
              </Badge>
            </div>
            <Button variant={account.status === 'connected' ? 'ghost' : 'secondary'} size="sm">
              {#snippet children()}{account.status === 'connected' ? '解绑' : '绑定'}{/snippet}
            </Button>
          </div>
        {/each}
      </div>
    </div>
  </Card>

  <!-- Notification preferences -->
  <Card>
    <div class="p-5">
      <div class="flex items-center gap-2 mb-5">
        <Bell size={20} style="color: var(--color-primary-500)" />
        <h2 class="text-lg font-semibold" style="color: var(--color-neutral-900)">通知偏好</h2>
      </div>

      <div class="space-y-4">
        {#each [
          { label: '新评论通知', desc: '当有用户评论您的内容时通知', checked: notifComments, toggle: () => notifComments = !notifComments },
          { label: '新粉丝通知', desc: '当有新用户关注您时通知', checked: notifFollows, toggle: () => notifFollows = !notifFollows },
          { label: '收益变动通知', desc: '当收益有较大变动时通知', checked: notifEarnings, toggle: () => notifEarnings = !notifEarnings },
        ] as item}
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium" style="color: var(--color-neutral-900)">{item.label}</p>
              <p class="text-xs mt-0.5" style="color: var(--color-neutral-500)">{item.desc}</p>
            </div>
            <button
              onclick={item.toggle}
              class="relative w-11 h-6 rounded-full transition-colors duration-200"
              style="background-color: {item.checked ? 'var(--color-primary-500)' : 'var(--color-neutral-300)'}"
              role="switch"
              aria-checked={item.checked}
              aria-label={item.label}
            >
              <span
                class="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200"
                style="transform: translateX({item.checked ? '1.25rem' : '0'})"
              ></span>
            </button>
          </div>
        {/each}
      </div>
    </div>
  </Card>

  <!-- Theme -->
  <Card>
    <div class="p-5">
      <div class="flex items-center gap-2 mb-5">
        <Palette size={20} style="color: var(--color-primary-500)" />
        <h2 class="text-lg font-semibold" style="color: var(--color-neutral-900)">外观主题</h2>
      </div>

      <div class="flex gap-3">
        <button
          onclick={() => setTheme('dark')}
          class="flex-1 p-4 rounded-xl border-2 text-center transition-all"
          style="border-color: {theme === 'dark' ? 'var(--color-primary-500)' : 'var(--color-neutral-200)'}"
        >
          <div class="w-12 h-8 rounded-md mx-auto mb-2" style="background-color: var(--color-neutral-900)"></div>
          <p class="text-sm font-medium" style="color: var(--color-neutral-900)">深色模式</p>
        </button>
        <button
          onclick={() => setTheme('light')}
          class="flex-1 p-4 rounded-xl border-2 text-center transition-all"
          style="border-color: {theme === 'light' ? 'var(--color-primary-500)' : 'var(--color-neutral-200)'}"
        >
          <div class="w-12 h-8 rounded-md mx-auto mb-2" style="background-color: var(--color-neutral-100); border: 1px solid var(--color-neutral-200)"></div>
          <p class="text-sm font-medium" style="color: var(--color-neutral-900)">浅色模式</p>
        </button>
      </div>
    </div>
  </Card>
</div>
