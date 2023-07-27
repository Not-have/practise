import {
    ReactNode
} from 'react';

/**
 * 当前组件可接受的值
 */
export interface IProps {
    values?: {
        keyword: string;
        status: string;
    };
    onChange?: (value: IProps['values']) => void;
}

export interface IModelProviderProps {
    props: IProps;
    children: ReactNode;
}

export interface IModelContext {
    props: IProps;
}

export interface IModelState {
    keywords: string;
    state: string;
}