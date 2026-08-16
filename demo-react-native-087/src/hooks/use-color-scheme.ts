/**
 * 原生端直接复用 React Native 官方的 useColorScheme。
 *
 * 旁边的 `use-color-scheme.web.ts` 是 Web 专用实现；
 * React Native/Expo 会根据平台自动选择正确文件。
 */
export { useColorScheme } from 'react-native';
