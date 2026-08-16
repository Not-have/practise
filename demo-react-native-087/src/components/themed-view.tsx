import { View, type ViewProps } from 'react-native';

import { ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedViewProps = ViewProps & {
  // 这两个属性保留给以后扩展：可以指定浅色/深色模式下的自定义颜色。
  lightColor?: string;
  darkColor?: string;
  // 从主题颜色表里选择一个背景色，例如 background、backgroundElement。
  type?: ThemeColor;
};

/**
 * 带主题背景色的 View。
 *
 * 普通 View 不知道当前是浅色还是深色模式；
 * ThemedView 会读取当前主题，并自动把 backgroundColor 设好。
 */
export function ThemedView({ style, lightColor, darkColor, type, ...otherProps }: ThemedViewProps) {
  // theme 是 constants/theme.ts 里 light 或 dark 对应的颜色对象。
  const theme = useTheme();

  // 数组样式中，后面的 style 可以覆盖前面的默认背景色。
  return <View style={[{ backgroundColor: theme[type ?? 'background'] }, style]} {...otherProps} />;
}
