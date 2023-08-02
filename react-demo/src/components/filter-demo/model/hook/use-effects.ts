import {
    useEffect,
    useRef
} from 'react';

import useModelState from './_use-model-state';
import useHandleChange from './use-handle-change';

export default function useEffects(): void {
    const isInitialMount = useRef<boolean>(true);
    const state = useModelState();
    const handleChange = useHandleChange();

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;

            return;
        }

        handleChange(state);
    }, [state, handleChange]);
}
