import {
    useCallback
} from 'react';

import {
    IModelState
} from '../types';

import useModelProps from './_use-model-props';

export default function useHandleChange(): (values: IModelState) => void {
    const {
        onChange
    } = useModelProps();

    return useCallback((values: IModelState) => {
        // 处理一个 onChange 没传的问题
        onChange?.(values);
    }, [onChange]);
}