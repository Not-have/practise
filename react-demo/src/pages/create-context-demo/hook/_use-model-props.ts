import {
    useMemo
} from 'react';

import useModelContext from './_use-model-context';

export default function useModelProps(): any {
    const {
        props
    } = useModelContext();

    return useMemo((): any => props, [props]);
}