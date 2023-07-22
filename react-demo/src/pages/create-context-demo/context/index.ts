import {
    createContext
} from 'react';

/**
 * 作为 createContext 的储存
 * 把他单独写出来是为了在 存储 和 读取 的时候，取得是同一个内存空间
 */
export default createContext<any>(null);
