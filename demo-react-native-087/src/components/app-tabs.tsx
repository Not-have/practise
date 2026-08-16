import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';

/**
 * 原生端的底部 Tab 导航。
 *
 * 文件名是 `app-tabs.tsx`，当运行在 iOS/Android 时会使用这个文件；
 * Web 端会优先使用同名的 `app-tabs.web.tsx`。
 */
export default function AppTabs() {
  // 读取系统主题，用来决定 Tab 背景色、文字色等。
  const scheme = useColorScheme();

  // 有些平台可能返回 'unspecified'，这里统一兜底成浅色主题。
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    <NativeTabs
      // NativeTabs 来自 Expo Router 的原生 tabs 能力，能更贴近系统体验。
      backgroundColor={colors.background}
      indicatorColor={colors.backgroundElement}
      labelStyle={{ selected: { color: colors.text } }}>
      {/* name 必须和 app 目录下的路由文件名对应：index.tsx -> "index"。 */}
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          // template 渲染模式允许系统根据选中状态给图标着色。
          src={require('@/assets/images/tabIcons/home.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      {/* explore.tsx 对应的第二个 Tab。 */}
      <NativeTabs.Trigger name="explore">
        <NativeTabs.Trigger.Label>Explore</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/explore.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
