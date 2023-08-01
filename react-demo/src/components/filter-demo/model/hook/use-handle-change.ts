import {
    useCallback
} from 'react';

import {
    IProps
} from '../types';

import useModelProps from './_use-model-props';

export default function useHandleChange(): (values: IProps['values']) => void {
    const {
        onChange
    } = useModelProps();

    return useCallback((values: IProps['values']) => {
        // 处理一个 onChange 没传的问题
        if (!onChange) {
            return;
        }

        onChange(values);
    }, [onChange]);
}