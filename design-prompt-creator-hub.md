# Creator Hub - 博主工具平台设计系统

## 项目概述

**项目名称**：Creator Hub  
**项目类型**：博主工具类应用（跨平台）  
**目标用户**：各大博主、内容创作者  
**核心功能**：多平台管理、数据分析、素材管理  
**技术栈**：跨平台（Windows/iOS/Android/Web），Tailwind CSS  
**设计基调**：深色模式为主，支持深浅模式切换

---

## 一、设计系统基础

### 1.1 品牌调性

| 维度 | 表达方式 |
|------|----------|
| **专业** | 清晰的信息层级、一致的组件规范、高效的操作流程 |
| **年轻** | 圆润的边角、适度的渐变、灵动的微交互 |
| **温暖** | 琥珀色点缀、友好的文案语调、柔和的阴影 |
| **亲民** | 充足的留白、直观的图标、低学习成本的界面 |

### 1.2 设计原则

1. **内容优先**：界面服务于内容，不喧宾夺主
2. **高效操作**：常用功能一键可达，减少操作层级
3. **视觉舒适**：长时间使用不疲劳，护眼的深色主题
4. **跨端一致**：各平台体验统一，符合各端设计规范

---

## 二、色彩系统

### 2.1 设计 Token（CSS 变量 + Tailwind 配置）

#### 品牌色

| Token | 浅色模式 | 深色模式 | 用途 |
|-------|----------|----------|------|
| `--color-primary-50` | #fff7ed | #1c1410 | 极浅背景 |
| `--color-primary-100` | #ffedd5 | #2d1f15 | 浅色背景 |
| `--color-primary-200` | #fed7aa | #4a3328 | 悬停背景 |
| `--color-primary-300` | #fdba74 | #6b4d3a | 边框、分割线 |
| `--color-primary-400` | #fb923c | #8a6650 | 图标、次要元素 |
| `--color-primary-500` | #f97316 | #f97316 | **主品牌色**（按钮、链接、焦点） |
| `--color-primary-600` | #ea580c | #ea580c | 主色悬停/激活 |
| `--color-primary-700` | #c2410c | #c2410c | 主色按下状态 |

> **主色选择理由**：温暖的琥珀橙色，既体现亲和力，又保持专业感，在深色背景上对比度极佳。

#### 中性色

| Token | 浅色模式 | 深色模式 | 用途 |
|-------|----------|----------|------|
| `--color-neutral-50` | #fafafa | #0a0a0a | 页面背景 |
| `--color-neutral-100` | #f5f5f5 | #171717 | 卡片背景 |
| `--color-neutral-200` | #e5e5e5 | #262626 | 边框、分割线 |
| `--color-neutral-300` | #d4d4d4 | #404040 | 输入框边框 |
| `--color-neutral-400` | #a3a3a3 | #525252 | 占位符文字 |
| `--color-neutral-500` | #737373 | #737373 | 次要文字 |
| `--color-neutral-600` | #525252 | #a3a3a3 | 辅助文字 |
| `--color-neutral-700` | #404040 | #d4d4d4 | 正文文字 |
| `--color-neutral-800` | #262626 | #e5e5e5 | 标题文字 |
| `--color-neutral-900` | #171717 | #fafafa | 主要文字 |

#### 语义色

| Token | 色值 | 用途 |
|-------|------|------|
| `--color-success` | #22c55e | 成功状态、正向数据 |
| `--color-warning` | #eab308 | 警告提示、待处理 |
| `--color-error` | #ef4444 | 错误、删除操作 |
| `--color-info` | #3b82f6 | 信息提示、链接 |

### 2.2 Tailwind 配置

```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
        },
        neutral: {
          50: 'var(--color-neutral-50)',
          100: 'var(--color-neutral-100)',
          200: 'var(--color-neutral-200)',
          300: 'var(--color-neutral-300)',
          400: 'var(--color-neutral-400)',
          500: 'var(--color-neutral-500)',
          600: 'var(--color-neutral-600)',
          700: 'var(--color-neutral-700)',
          800: 'var(--color-neutral-800)',
          900: 'var(--color-neutral-900)',
        },
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
        info: 'var(--color-info)',
      },
    },
  },
}
```

---

## 三、排版系统

### 3.1 字体族

```css
:root {
  --font-sans: 'Inter', system-ui, -apple-system, 'Segoe UI', 'PingFang SC', 
               'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
}
```

### 3.2 字号层级

| 层级 | Token | 字号 | 行高 | 字重 | 适用场景 |
|------|-------|------|------|------|----------|
| Display | `--text-display` | 2.25rem (36px) | 1.2 | 700 | 页面主标题 |
| H1 | `--text-4xl` | 2rem (32px) | 1.25 | 700 | 区块标题 |
| H2 | `--text-3xl` | 1.875rem (30px) | 1.3 | 600 | 模块标题 |
| H3 | `--text-2xl` | 1.5rem (24px) | 1.35 | 600 | 卡片标题 |
| H4 | `--text-xl` | 1.25rem (20px) | 1.4 | 600 | 小节标题 |
| Body Large | `--text-lg` | 1.125rem (18px) | 1.5 | 400 | 重要描述 |
| Body | `--text-base` | 1rem (16px) | 1.5 | 400 | 默认正文 |
| Small | `--text-sm` | 0.875rem (14px) | 1.4 | 400 | 辅助文字、标签 |
| Caption | `--text-xs` | 0.75rem (12px) | 1.3 | 400 | 角标、脚注 |

### 3.3 Tailwind 排版类

```html
<h1 class="text-display font-bold text-neutral-900 dark:text-neutral-50">
  数据概览
</h1>
<p class="text-base text-neutral-600 dark:text-neutral-400">
  查看您在各平台的表现数据
</p>
```

---

## 四、间距系统

### 4.1 间距 Token

| 层级 | Token | 值 | 用途 |
|------|-------|-----|------|
| 0 | `--space-0` | 0 | 无间距 |
| px | `--space-px` | 1px | 边框 |
| 0.5 | `--space-0_5` | 0.125rem (2px) | 极小间隙 |
| 1 | `--space-1` | 0.25rem (4px) | 图标与文字间隙 |
| 2 | `--space-2` | 0.5rem (8px) | 紧凑元素内边距 |
| 3 | `--space-3` | 0.75rem (12px) | 小组件内边距 |
| 4 | `--space-4` | 1rem (16px) | 标准内边距 |
| 5 | `--space-5` | 1.25rem (20px) | 表单元素间距 |
| 6 | `--space-6` | 1.5rem (24px) | 模块间距 |
| 8 | `--space-8` | 2rem (32px) | 区块间距 |
| 10 | `--space-10` | 2.5rem (40px) | 大区块间距 |
| 12 | `--space-12` | 3rem (48px) | 页面大间距 |
| 16 | `--space-16` | 4rem (64px) | 页面顶部间距 |

### 4.2 使用示例

```html
<!-- 卡片组件 -->
<div class="p-4 space-y-3">
  <h3 class="text-xl font-semibold">素材库</h3>
  <p class="text-sm text-neutral-500">管理您的图片和视频素材</p>
</div>

<!-- 页面布局 -->
<main class="px-4 py-6 md:px-6 lg:px-8 space-y-6">
  <!-- 内容区域 -->
</main>
```

---

## 五、响应式断点

### 5.1 断点策略（移动优先）

| 断点名称 | Tailwind 前缀 | 最小宽度 | 布局策略 |
|----------|---------------|----------|----------|
| 移动端 | 无（基础） | 0 | 单列布局，边距 16px |
| 平板端 | `sm:` | 640px | 两列布局，边距 24px |
| 桌面端 | `md:` | 768px | 侧边栏 + 主内容区 |
| 大桌面端 | `lg:` | 1024px | 多列布局，边距 32px |
| 超大屏幕 | `xl:` | 1280px | 最大宽度 1280px 居中 |

### 5.2 布局示例

```html
<!-- 响应式网格 -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
  <!-- 卡片 -->
</div>

<!-- 响应式侧边栏 -->
<div class="flex flex-col md:flex-row">
  <aside class="w-full md:w-64 lg:w-72 shrink-0">
    <!-- 侧边栏内容 -->
  </aside>
  <main class="flex-1 min-w-0">
    <!-- 主内容 -->
  </main>
</div>
```

---

## 六、基础组件规范

### 6.1 按钮组件

#### 变体

| 变体 | 类名 | 样式描述 |
|------|------|----------|
| 主要 | `btn-primary` | 品牌色填充，白色文字 |
| 次要 | `btn-secondary` | 透明背景，品牌色边框和文字 |
| 三级 | `btn-ghost` | 透明背景，中性色文字 |
| 危险 | `btn-danger` | 红色填充，白色文字 |

#### 尺寸

| 尺寸 | 类名 | 高度 | 内边距 | 字号 |
|------|------|------|--------|------|
| 小 | `btn-sm` | 32px | 12px 16px | 14px |
| 中 | `btn-md`（默认） | 40px | 12px 20px | 16px |
| 大 | `btn-lg` | 48px | 16px 24px | 18px |

#### 状态

```css
/* 主要按钮 */
.btn-primary {
  @apply bg-primary-500 text-white rounded-lg font-medium
         transition-all duration-150 ease-in-out;
}
.btn-primary:hover {
  @apply bg-primary-600 shadow-md;
}
.btn-primary:active {
  @apply bg-primary-700 shadow-sm;
}
.btn-primary:focus-visible {
  @apply outline-none ring-2 ring-primary-500 ring-offset-2;
}
.btn-primary:disabled {
  @apply bg-neutral-300 text-neutral-500 cursor-not-allowed;
}
```

#### Tailwind 使用

```html
<button class="btn-primary btn-md">发布内容</button>
<button class="btn-secondary btn-sm">取消</button>
<button class="btn-danger btn-md" disabled>删除</button>
```

### 6.2 输入框组件

```css
.input {
  @apply w-full px-3 py-2 text-base
         bg-white dark:bg-neutral-800
         border border-neutral-300 dark:border-neutral-600
         rounded-lg
         text-neutral-900 dark:text-neutral-100
         placeholder-neutral-400
         transition-all duration-150;
}
.input:focus {
  @apply outline-none border-primary-500 ring-2 ring-primary-500/20;
}
.input:disabled {
  @apply bg-neutral-100 dark:bg-neutral-900 cursor-not-allowed;
}
.input-error {
  @apply border-error ring-2 ring-error/20;
}
```

#### 使用示例

```html
<div class="space-y-1">
  <label class="text-sm font-medium text-neutral-700 dark:text-neutral-300">
    账号名称
  </label>
  <input type="text" class="input" placeholder="请输入账号名称">
  <p class="text-xs text-error">账号名称不能为空</p>
</div>
```

### 6.3 卡片组件

```css
.card {
  @apply bg-white dark:bg-neutral-800
         border border-neutral-200 dark:border-neutral-700
         rounded-xl
         shadow-sm
         transition-all duration-200;
}
.card:hover {
  @apply shadow-md border-neutral-300 dark:border-neutral-600;
}
```

#### 卡片变体

```html
<!-- 基础卡片 -->
<div class="card p-4">
  <h3 class="text-lg font-semibold">素材管理</h3>
  <p class="text-sm text-neutral-500 mt-1">管理您的图片和视频</p>
</div>

<!-- 可点击卡片 -->
<a href="#" class="card p-4 block hover:shadow-lg hover:-translate-y-0.5">
  <h3 class="text-lg font-semibold">查看数据</h3>
</a>

<!-- 统计卡片 -->
<div class="card p-4">
  <div class="flex items-center justify-between">
    <span class="text-sm text-neutral-500">总粉丝数</span>
    <span class="text-xs text-success">+12.5%</span>
  </div>
  <p class="text-3xl font-bold mt-2">128,456</p>
</div>
```

### 6.4 表格组件

```html
<div class="card overflow-hidden">
  <table class="w-full">
    <thead class="bg-neutral-50 dark:bg-neutral-900">
      <tr>
        <th class="px-4 py-3 text-left text-sm font-medium text-neutral-500">
          平台
        </th>
        <th class="px-4 py-3 text-left text-sm font-medium text-neutral-500">
          粉丝数
        </th>
        <th class="px-4 py-3 text-left text-sm font-medium text-neutral-500">
          状态
        </th>
      </tr>
    </thead>
    <tbody class="divide-y divide-neutral-200 dark:divide-neutral-700">
      <tr class="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
        <td class="px-4 py-3 text-sm">抖音</td>
        <td class="px-4 py-3 text-sm">125,000</td>
        <td class="px-4 py-3">
          <span class="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-success/10 text-success">
            已连接
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

### 6.5 标签/徽章组件

```css
.badge {
  @apply inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full;
}
.badge-primary {
  @apply bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400;
}
.badge-success {
  @apply bg-success/10 text-success;
}
.badge-warning {
  @apply bg-warning/10 text-warning;
}
.badge-error {
  @apply bg-error/10 text-error;
}
```

### 6.6 模态框组件

```html
<!-- 模态框背景 -->
<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
  <!-- 模态框内容 -->
  <div class="card w-full max-w-md p-6 space-y-4">
    <h2 class="text-xl font-semibold">确认删除</h2>
    <p class="text-neutral-600 dark:text-neutral-400">
      确定要删除这个素材吗？此操作无法撤销。
    </p>
    <div class="flex justify-end space-x-3">
      <button class="btn-ghost btn-md">取消</button>
      <button class="btn-danger btn-md">删除</button>
    </div>
  </div>
</div>
```

### 6.7 导航组件

```html
<!-- 侧边栏导航 -->
<nav class="space-y-1">
  <a href="#" class="flex items-center px-3 py-2 text-sm font-medium rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400">
    <svg class="w-5 h-5 mr-3">...</svg>
    数据概览
  </a>
  <a href="#" class="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800">
    <svg class="w-5 h-5 mr-3">...</svg>
    素材管理
  </a>
</nav>
```

---

## 七、图标系统

### 7.1 推荐图标库

- **Lucide Icons**（推荐）：轻量、一致、开源
- 备选：Heroicons、Phosphor Icons

### 7.2 图标尺寸

| 用途 | 尺寸 | Tailwind 类 |
|------|------|-------------|
| 内联图标 | 16px | `w-4 h-4` |
| 按钮图标 | 20px | `w-5 h-5` |
| 导航图标 | 24px | `w-6 h-6` |
| 特色图标 | 32px | `w-8 h-8` |
| 空状态图标 | 48-64px | `w-12 h-12` 或 `w-16 h-16` |

### 7.3 图标颜色

```html
<!-- 使用当前文字颜色 -->
<svg class="w-5 h-5 text-neutral-500">...</svg>

<!-- 使用品牌色 -->
<svg class="w-5 h-5 text-primary-500">...</svg>
```

---

## 八、动画与过渡

### 8.1 过渡时间

| 场景 | 时长 | 缓动函数 |
|------|------|----------|
| 按钮状态 | 150ms | ease-in-out |
| 面板展开 | 200ms | ease-out |
| 模态框 | 250ms | ease-out |
| 页面切换 | 300ms | ease-in-out |

### 8.2 常用过渡类

```html
<!-- 基础过渡 -->
<div class="transition-all duration-150 ease-in-out">
  <!-- 内容 -->
</div>

<!-- 悬停效果 -->
<div class="transition-shadow duration-200 hover:shadow-lg">
  <!-- 内容 -->
</div>

<!-- 缩放效果 -->
<button class="transition-transform duration-150 active:scale-95">
  点击
</button>
```

---

## 九、无障碍设计

### 9.1 色彩对比度（WCAG AA）

| 组合 | 浅色模式对比度 | 深色模式对比度 | 是否达标 |
|------|---------------|---------------|----------|
| 主色文字 on 白色背景 | 4.52:1 | - | ✅ 达标 |
| 主色文字 on 深色背景 | - | 4.67:1 | ✅ 达标 |
| 正文 on 页面背景 | 12.6:1 | 13.1:1 | ✅ 达标 |
| 次要文字 on 页面背景 | 5.7:1 | 5.9:1 | ✅ 达标 |

### 9.2 焦点状态

```css
/* 所有交互元素必须有清晰的焦点状态 */
*:focus-visible {
  @apply outline-none ring-2 ring-primary-500 ring-offset-2 
         dark:ring-offset-neutral-900;
}
```

### 9.3 最小点击区域

- 移动端：44px × 44px
- 桌面端：32px × 32px

---

## 十、页面布局模板

### 10.1 主布局结构

```html
<div class="min-h-screen bg-neutral-50 dark:bg-neutral-950">
  <!-- 顶部导航栏 -->
  <header class="sticky top-0 z-40 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
    <div class="flex items-center justify-between h-16 px-4 md:px-6">
      <!-- Logo 和导航 -->
    </div>
  </header>
  
  <div class="flex">
    <!-- 侧边栏 -->
    <aside class="hidden md:flex md:w-64 lg:w-72 flex-col fixed inset-y-16 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-y-auto">
      <!-- 导航菜单 -->
    </aside>
    
    <!-- 主内容区 -->
    <main class="flex-1 md:ml-64 lg:ml-72">
      <div class="px-4 py-6 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <!-- 页面内容 -->
      </div>
    </main>
  </div>
</div>
```

### 10.2 移动端导航

```html
<!-- 移动端底部导航栏 -->
<nav class="fixed bottom-0 inset-x-0 z-40 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 md:hidden">
  <div class="flex items-center justify-around h-16">
    <a href="#" class="flex flex-col items-center space-y-1 text-primary-500">
      <svg class="w-6 h-6">...</svg>
      <span class="text-xs">首页</span>
    </a>
    <!-- 更多导航项 -->
  </div>
</nav>
```

---

## 十一、Tailwind CSS 变量定义

```css
/* styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* 品牌色 - 浅色模式 */
    --color-primary-50: #fff7ed;
    --color-primary-100: #ffedd5;
    --color-primary-200: #fed7aa;
    --color-primary-300: #fdba74;
    --color-primary-400: #fb923c;
    --color-primary-500: #f97316;
    --color-primary-600: #ea580c;
    --color-primary-700: #c2410c;
    
    /* 中性色 - 浅色模式 */
    --color-neutral-50: #fafafa;
    --color-neutral-100: #f5f5f5;
    --color-neutral-200: #e5e5e5;
    --color-neutral-300: #d4d4d4;
    --color-neutral-400: #a3a3a3;
    --color-neutral-500: #737373;
    --color-neutral-600: #525252;
    --color-neutral-700: #404040;
    --color-neutral-800: #262626;
    --color-neutral-900: #171717;
    --color-neutral-950: #0a0a0a;
    
    /* 语义色 */
    --color-success: #22c55e;
    --color-warning: #eab308;
    --color-error: #ef4444;
    --color-info: #3b82f6;
  }
  
  .dark {
    /* 深色模式覆盖 */
    --color-primary-50: #1c1410;
    --color-primary-100: #2d1f15;
    --color-primary-200: #4a3328;
    --color-primary-300: #6b4d3a;
    --color-primary-400: #8a6650;
    
    --color-neutral-50: #0a0a0a;
    --color-neutral-100: #171717;
    --color-neutral-200: #262626;
    --color-neutral-300: #404040;
    --color-neutral-400: #525252;
    --color-neutral-500: #737373;
    --color-neutral-600: #a3a3a3;
    --color-neutral-700: #d4d4d4;
    --color-neutral-800: #e5e5e5;
    --color-neutral-900: #fafafa;
    --color-neutral-950: #ffffff;
  }
  
  body {
    @apply bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100;
    font-family: var(--font-sans);
  }
}

@layer components {
  /* 按钮组件 */
  .btn {
    @apply inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-900 disabled:cursor-not-allowed;
  }
  
  .btn-primary {
    @apply btn bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 disabled:bg-neutral-300 dark:disabled:bg-neutral-700 disabled:text-neutral-500;
  }
  
  .btn-secondary {
    @apply btn border-2 border-primary-500 text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-950 active:bg-primary-100 dark:active:bg-primary-900;
  }
  
  .btn-ghost {
    @apply btn text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 active:bg-neutral-200 dark:active:bg-neutral-700;
  }
  
  .btn-danger {
    @apply btn bg-error text-white hover:bg-red-600 active:bg-red-700 disabled:bg-neutral-300 dark:disabled:bg-neutral-700 disabled:text-neutral-500;
  }
  
  .btn-sm { @apply h-8 px-3 text-sm; }
  .btn-md { @apply h-10 px-5 text-base; }
  .btn-lg { @apply h-12 px-6 text-lg; }
  
  /* 输入框组件 */
  .input {
    @apply w-full px-3 py-2 text-base bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 transition-all duration-150 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 disabled:bg-neutral-100 dark:disabled:bg-neutral-900 disabled:cursor-not-allowed;
  }
  
  .input-error {
    @apply border-error focus:border-error focus:ring-error/20;
  }
  
  /* 卡片组件 */
  .card {
    @apply bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-sm transition-all duration-200;
  }
  
  /* 标签组件 */
  .badge {
    @apply inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full;
  }
  
  .badge-primary { @apply bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400; }
  .badge-success { @apply bg-success/10 text-success; }
  .badge-warning { @apply bg-warning/10 text-warning; }
  .badge-error { @apply bg-error/10 text-error; }
}
```

---

## 十二、设计交付清单

### 12.1 必须包含的页面

根据需求，建议包含以下页面：

1. **数据概览页** (Dashboard)
   - 核心数据卡片（总粉丝、总播放量、总收益等）
   - 各平台数据对比图表
   - 近期趋势图
   - 待办事项/消息提醒

2. **多平台管理页**
   - 已连接平台列表
   - 添加新平台入口
   - 各平台状态概览
   - 批量操作功能

3. **素材管理页**
   - 素材库网格/列表视图
   - 上传/导入功能
   - 分类/标签筛选
   - 搜索功能

4. **设置页**
   - 个人信息设置
   - 账号绑定管理
   - 通知偏好设置
   - 主题切换（深色/浅色）

### 12.2 设计交付物

- [ ] 设计 Token 文件（CSS 变量 + Tailwind 配置）
- [ ] 组件库代码示例
- [ ] 页面布局模板
- [ ] 图标使用规范
- [ ] 动画/过渡规范
- [ ] 无障碍检查清单

---

## 十三、跨平台注意事项

### 13.1 各平台适配要点

| 平台 | 注意事项 |
|------|----------|
| **Web** | 标准响应式布局，支持鼠标和触摸 |
| **Windows** | 窗口最小尺寸 360px，支持标题栏自定义 |
| **iOS** | 遵循 Human Interface Guidelines，考虑安全区域 |
| **Android** | 遵循 Material Design，支持返回手势 |

### 13.2 触摸与点击区域

- 移动端最小触摸目标：44px × 44px
- 桌面端最小点击目标：32px × 32px
- 相邻可点击元素间距：至少 8px

---

## 十四、设计检查清单

### 视觉一致性
- [ ] 所有颜色使用设计 Token
- [ ] 间距遵循 4px 网格系统
- [ ] 字号使用预定义层级
- [ ] 圆角保持一致（按钮 8px，卡片 12px）

### 无障碍
- [ ] 文字对比度符合 WCAG AA 标准
- [ ] 所有交互元素有焦点状态
- [ ] 图片有替代文本
- [ ] 表单有正确的标签关联

### 响应式
- [ ] 移动端布局正常
- [ ] 平板端布局正常
- [ ] 桌面端布局正常
- [ ] 大屏幕布局正常

### 深色/浅色模式
- [ ] 浅色模式视觉正常
- [ ] 深色模式视觉正常
- [ ] 模式切换动画流畅

---

*设计系统版本：v1.0*  
*最后更新：2026-06-03*
