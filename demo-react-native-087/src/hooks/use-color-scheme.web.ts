import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

/**
 * Web 端专用的系统主题 Hook。
 *
 * 支持静态渲染时，服务端/构建阶段无法可靠知道用户浏览器的主题。
 * 因此首次渲染先固定返回 light；等浏览器端 hydrate 完成后，
 * 再读取真正的系统主题，避免服务端 HTML 和客户端首次渲染结果不一致。
 */
export function useColorScheme() {
  // hasHydrated 表示浏览器端 React 是否已经接管页面。
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    // useEffect 只会在客户端运行，所以这里设为 true 后就可以安全读取浏览器环境。
    setHasHydrated(true);
  }, []);

  // React Native 提供的原始系统主题 Hook。
  const colorScheme = useRNColorScheme();

  if (hasHydrated) {
    return colorScheme;
  }

  // 首次渲染阶段兜底成 light，减少 Web 静态渲染的 hydration 问题。
  return 'light';
}
