import {
    useContext
} from 'react';

import {
    IModelValue
} from '../types'
import Context from '../context';

/**
 * 因为 他只在当前 hook 下使用，所以加 _，当加了 _ 后，就代表该方法是内部使用
 */
export default function useModelContext(): IModelValue {
    // 确保返回的不为空
    return useContext(Context)!;
}