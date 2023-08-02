import {
    useEffect
} from 'react';

import useModelState from './_use-model-state';
import useHandleChange from './use-handle-change';

export default function useEffects(): void {
    const state = useModelState();
    const handleChange = useHandleChange();

    useEffect(() => {
        handleChange(state);
    }, [state, handleChange]);
}
