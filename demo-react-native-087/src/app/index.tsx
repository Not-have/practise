import * as Device from "expo-device";
import { Platform, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AnimatedIcon } from "@/components/animated-icon";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { WebBadge } from "@/components/web-badge";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";

/**
 * 根据当前运行环境，返回一段“如何打开开发菜单”的提示文字。
 *
 * 注意：这个函数目前没有被页面渲染出来，但它展示了一个很常见的写法：
 * 用 `Platform.OS` 判断平台，再给不同平台返回不同的 React 组件。
 */
function getDevMenuHint() {
  // Web 端没有原生开发菜单，通常直接使用浏览器自己的开发者工具。
  if (Platform.OS === "web") {
    return <ThemedText type="small">use browser devtools</ThemedText>;
  }

  // 真机调试时，Expo/React Native 常见做法是摇一摇设备打开开发菜单。
  if (Device.isDevice) {
    return (
      <ThemedText type="small">
        shake device or press <ThemedText type="code">m</ThemedText> in terminal
      </ThemedText>
    );
  }

  // 模拟器/模拟机上，不同系统打开开发菜单的快捷键不一样。
  const shortcut = Platform.OS === "android" ? "cmd+m (or ctrl+m)" : "cmd+d";
  return (
    <ThemedText type="small">
      press <ThemedText type="code">{shortcut}</ThemedText>
    </ThemedText>
  );
}

/**
 * 首页组件。
 *
 * Expo Router 会把 `src/app/index.tsx` 自动识别成 `/` 路由，
 * 所以这个组件就是 App 打开后的 Home 页面。
 */
export default function HomeScreen() {
  return (
    // ThemedView 是项目自己封装的 View，会根据浅色/深色模式自动设置背景色。
    <ThemedView style={styles.container}>
      {/* SafeAreaView 会避开刘海屏、状态栏、底部手势条等系统安全区域。 */}
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
          {/* 带动效的 Expo 图标，具体动画逻辑在 components/animated-icon.tsx。 */}
          <AnimatedIcon />
          <ThemedText type="title" style={styles.title}>
            Welcome to&nbsp;Expo
          </ThemedText>
        </ThemedView>

        <ThemedText type="code" style={styles.code}>
          get started
        </ThemedText>

        {/* 只有 Web 端才显示版本徽章，移动端不会渲染这块内容。 */}
        {Platform.OS === "web" && <WebBadge />}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: "center",
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  title: {
    textAlign: "center",
  },
  code: {
    textTransform: "uppercase",
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: "stretch",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
});
