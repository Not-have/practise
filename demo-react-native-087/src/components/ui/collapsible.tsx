import { SymbolView } from 'expo-symbols';
import { PropsWithChildren, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/**
 * 可折叠区域组件。
 *
 * PropsWithChildren 表示这个组件可以接收 children：
 *
 * <Collapsible title="标题">
 *   <ThemedText>这里是展开后的内容</ThemedText>
 * </Collapsible>
 */
export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  // isOpen 控制内容是展开还是收起。
  const [isOpen, setIsOpen] = useState(false);

  // 拿到当前主题色，用于设置箭头图标颜色。
  const theme = useTheme();

  return (
    <ThemedView>
      <Pressable
        // Pressable 的 style 可以写成函数，根据 pressed 状态返回不同样式。
        style={({ pressed }) => [styles.heading, pressed && styles.pressedHeading]}
        // 点击标题行时，把 isOpen 反转：true -> false，false -> true。
        onPress={() => setIsOpen((value) => !value)}>
        <ThemedView type="backgroundElement" style={styles.button}>
          <SymbolView
            name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
            size={14}
            weight="bold"
            tintColor={theme.text}
            // 同一个箭头图标，通过旋转角度表示“展开/收起”状态。
            style={{ transform: [{ rotate: isOpen ? '-90deg' : '90deg' }] }}
          />
        </ThemedView>

        <ThemedText type="small">{title}</ThemedText>
      </Pressable>
      {isOpen && (
        // 只有展开时才渲染内容；FadeIn 让内容出现时有一个淡入动画。
        <Animated.View entering={FadeIn.duration(200)}>
          <ThemedView type="backgroundElement" style={styles.content}>
            {children}
          </ThemedView>
        </Animated.View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  pressedHeading: {
    opacity: 0.7,
  },
  button: {
    width: Spacing.four,
    height: Spacing.four,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    marginTop: Spacing.three,
    borderRadius: Spacing.three,
    marginLeft: Spacing.four,
    padding: Spacing.four,
  },
});
