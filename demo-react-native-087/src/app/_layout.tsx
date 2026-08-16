import { DarkTheme, DefaultTheme, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "react-native";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import AppTabs from "@/components/app-tabs";

/**
 * 阻止系统启动屏自动消失。
 *
 * 这样我们可以等 React 页面真正布局完成后，再手动隐藏启动屏，
 * 并接上自己的 AnimatedSplashOverlay 动画，避免启动时闪一下白屏。
 */
SplashScreen.preventAutoHideAsync();

/**
 * 根布局组件。
 *
 * 在 Expo Router 里，`_layout.tsx` 用来包裹同一目录下的所有页面。
 * 这里它负责两件事：
 * 1. 根据系统浅色/深色模式提供导航主题；
 * 2. 渲染自定义启动动画和底部 Tab 导航。
 */
export default function TabLayout() {
  // 读取系统当前是 light、dark，或某些平台可能返回 unspecified。
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      {/* 自定义启动动画遮罩；动画结束后它会自己消失。 */}
      <AnimatedSplashOverlay />
      {/* AppTabs 在原生和 Web 上有不同实现，靠 .web.tsx 文件自动区分。 */}
      <AppTabs />
    </ThemeProvider>
  );
}
