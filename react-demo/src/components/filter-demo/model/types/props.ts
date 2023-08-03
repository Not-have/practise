import {
    ReactNode
} from 'react';

import {
    EStatus
} from '../enum';

/**
 * props 的类型
 * values 可以自行定义，不用使用继承
 */
export interface IProps {
    values?: {
        keyword?: string;
        status?: EStatus;
    };
    onChange?: (value: IProps['values']) => void;
}

/**
 * ModelProviderProps 的类型（也就是 传入 Provider 组件的类型）
 */
export interface IModelProviderProps {
    props: IProps;
    children: ReactNode;
}
