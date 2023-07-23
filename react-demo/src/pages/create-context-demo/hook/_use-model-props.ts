import {
    useMemo
} from 'react';

import useModelContext from './_use-model-context';

import {
    IProps
} from '../types'
export default function useModelProps(): IProps {
    const {
        props
    } = useModelContext();

    return useMemo((): any => props, [props]);
}