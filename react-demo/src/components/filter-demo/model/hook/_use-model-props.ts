import {
    useMemo
} from 'react';

import useModelContext from './_use-model-context';

export default function useModelProps() {
    const {
        props
    } = useModelContext();

    return useMemo(() => props, [props]);
}