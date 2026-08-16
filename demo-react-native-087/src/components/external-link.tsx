import { Href, Link } from 'expo-router';
import { openBrowserAsync, WebBrowserPresentationStyle } from 'expo-web-browser';
import { type ComponentProps } from 'react';

// 复用 expo-router 的 Link 属性，但把 href 改成必填。
// `Href & string` 表示它既要符合 Expo Router 的链接类型，又要能作为字符串传给浏览器 API。
type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: Href & string };

/**
 * 跨平台外部链接组件。
 *
 * - Web：保持普通链接行为，在新标签页打开。
 * - iOS/Android：拦截默认跳转，改用 Expo 的应用内浏览器打开。
 */
export function ExternalLink({ href, ...rest }: Props) {
  return (
    <Link
      target="_blank"
      {...rest}
      href={href}
      onPress={async (event) => {
        if (process.env.EXPO_OS !== 'web') {
          // 原生端阻止 Link 的默认行为，避免直接跳到系统默认浏览器。
          event.preventDefault();

          // 使用应用内浏览器打开，用户看完网页后可以更自然地回到 App。
          await openBrowserAsync(href, {
            presentationStyle: WebBrowserPresentationStyle.AUTOMATIC,
          });
        }
      }}
    />
  );
}
