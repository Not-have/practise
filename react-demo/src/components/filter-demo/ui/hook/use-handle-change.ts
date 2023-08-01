import {
    useCallback
} from 'react';

import {
    EStatus,
    useDispatchSetStatus
} from '../../model';

export default function useHandleChange(): (value: EStatus) => void {
    const dispatchSetStatus = useDispatchSetStatus();

    return useCallback((value: EStatus) => {
        dispatchSetStatus(value);
    }, [dispatchSetStatus]);
}