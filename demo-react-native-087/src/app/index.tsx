import { Platform, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AnimatedIcon } from "@/components/animated-icon";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { WebBadge } from "@/components/web-badge";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";

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
