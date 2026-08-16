/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

/**
 * 返回当前主题颜色表。
 *
 * 组件不需要自己判断 light/dark，只要调用 useTheme()，
 * 就能拿到正确的一组颜色，例如 theme.background、theme.text。
 */
export function useTheme() {
  // useColorScheme 返回系统主题：light、dark，或少数情况下 unspecified/null。
  const scheme = useColorScheme();

  // 遇到 unspecified 时兜底成 light，保证 Colors[theme] 一定存在。
  const theme = scheme === 'unspecified' ? 'light' : scheme;

  return Colors[theme];
}
