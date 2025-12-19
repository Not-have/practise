import { createCache as createAntdCache } from '@ant-design/cssinjs';

type GlobalWithCache = typeof window & Record<string, unknown>;

/**
 * 通用共享缓存工厂：可用于 antd cssinjs 或其他 UI 插件的缓存/实例
 * @param key  全局唯一 key，避免冲突
 * @param factory 创建实例的方法
 */
export function createSharedCache<T>(key: string, factory: () => T): T {
  if (typeof window === 'undefined') {
    return factory();
  }
  const globalRef = window as GlobalWithCache;
  if (!globalRef[key]) {
    globalRef[key] = factory();
  }
  return globalRef[key] as T;
}

// 默认导出：共享 antd css-in-js 缓存
const styleCache = createSharedCache('__demo_style_cache__', () => createAntdCache());

export default styleCache;

