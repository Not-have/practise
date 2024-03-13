import {
    useCallback
} from 'react';

import {
    EStatus,
    EAction
} from '../enum';

import useModelDispatch from './_use-model-dispatch';

export default function useDispatchSetStatus(): (payload: EStatus) => void {
    const dispatch = useModelDispatch();

    return useCallback((payload: EStatus): void => {
        dispatch({
            type: EAction.SET_STATUS,
            payload
        });
    }, [dispatch]);
}