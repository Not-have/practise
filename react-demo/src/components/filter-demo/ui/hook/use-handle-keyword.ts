import {
    useCallback
} from 'react';

import {
    useDispatchSetKeyword
} from '../../model';

export default function useHandleKeyword(): (value: string) => void {
    const dispatchSetKeyword = useDispatchSetKeyword();

    return useCallback((value: string) => {
        dispatchSetKeyword(value);
    }, [dispatchSetKeyword]);
}