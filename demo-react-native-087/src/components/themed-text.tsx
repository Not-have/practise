import { Platform, StyleSheet, Text, type TextProps } from 'react-native';

import { Fonts, ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedTextProps = TextProps & {
  // type 控制文字尺寸、粗细、行高等“排版样式”。
  type?: 'default' | 'title' | 'small' | 'smallBold' | 'subtitle' | 'link' | 'linkPrimary' | 'code';
  // themeColor 控制文字颜色，值必须来自主题颜色表。
  themeColor?: ThemeColor;
};

/**
 * 带主题颜色和预设排版的 Text。
 *
 * 使用方式示例：
 * `<ThemedText type="title">标题</ThemedText>`
 * `<ThemedText themeColor="textSecondary">次要说明</ThemedText>`
 */
export function ThemedText({ style, type = 'default', themeColor, ...rest }: ThemedTextProps) {
  // 根据系统浅色/深色模式拿到当前颜色表。
  const theme = useTheme();

  return (
    <Text
      style={[
        // 默认文字颜色；如果传了 themeColor，就用指定颜色。
        { color: theme[themeColor ?? 'text'] },

        // 下面这些判断会按 type 追加不同的文字样式。
        // React Native 的 style 数组会忽略 false，所以这种写法很常见。
        type === 'default' && styles.default,
        type === 'title' && styles.title,
        type === 'small' && styles.small,
        type === 'smallBold' && styles.smallBold,
        type === 'subtitle' && styles.subtitle,
        type === 'link' && styles.link,
        type === 'linkPrimary' && styles.linkPrimary,
        type === 'code' && styles.code,

        // 调用方传入的 style 放最后，方便局部覆盖。
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  small: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 500,
  },
  smallBold: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 700,
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 500,
  },
  title: {
    fontSize: 48,
    fontWeight: 600,
    lineHeight: 52,
  },
  subtitle: {
    fontSize: 32,
    lineHeight: 44,
    fontWeight: 600,
  },
  link: {
    lineHeight: 30,
    fontSize: 14,
  },
  linkPrimary: {
    lineHeight: 30,
    fontSize: 14,
    color: '#3c87f7',
  },
  code: {
    fontFamily: Fonts.mono,
    fontWeight: Platform.select({ android: 700 }) ?? 500,
    fontSize: 12,
  },
});
