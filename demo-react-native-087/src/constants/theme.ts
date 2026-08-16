/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

/**
 * 应用的颜色表。
 *
 * light 和 dark 必须包含同样的 key，这样组件只要写 `theme.text`
 * 就能在浅色/深色模式下拿到对应颜色。
 */
export const Colors = {
  light: {
    text: '#000000',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
  },
  dark: {
    text: '#ffffff',
    background: '#000000',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
  },
} as const;

// ThemeColor 是颜色 key 的联合类型，例如 'text' | 'background' | ...
// 用它可以防止写错颜色名：如果写成 'texts'，TypeScript 会报错。
export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

/**
 * 字体族配置。
 *
 * 不同平台支持的字体名称不完全一样，所以用 Platform.select 做平台分支。
 */
export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

/**
 * 统一间距表。
 *
 * 写样式时尽量用 Spacing.two / Spacing.three，
 * 而不是到处手写 8 / 16 / 24。这样 UI 更统一，也更容易整体调整。
 */
export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

// 底部 Tab 栏大致占用的高度，用来给页面底部留出空间，避免内容被挡住。
export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;

// 页面内容最大宽度；在大屏 Web 上避免内容铺得太宽，不好阅读。
export const MaxContentWidth = 800;
