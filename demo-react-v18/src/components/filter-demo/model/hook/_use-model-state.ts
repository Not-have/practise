import {
    useMemo
} from 'react';

import {
    IModelState
} from '../types';

import useModelContext from './_use-model-context';

export default function useModelState(): IModelState {
    const {
        state
    } = useModelContext();

    return useMemo(() => state, [state]);
}