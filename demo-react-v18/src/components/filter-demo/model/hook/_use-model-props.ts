import {
    useMemo
} from 'react';

import {
    IProps
} from '../types';

import useModelContext from './_use-model-context';

export default function useModelProps(): IProps {
    const {
        props
    } = useModelContext();

    return useMemo(() => props, [props]);
}