import {
    ReactNode
} from 'react';

/**
 * props 的类型
 */
export interface IProps {
    values?: {
        keyword: string;
        status: string;
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
