import {
    useEffect,
    useRef
// @ts-ignore
} from 'react';

import useModelState from './_use-model-state';
import useHandleChange from './use-handle-change';

export default function useEffects(): void {
    const isInitialMount = useRef<boolean>(true);
    const state = useModelState();
    const handleChange = useHandleChange();

    // TODO 这个其实单个抽离成一个文件比较好，因为 不是每个地方，都要让他初次不监听的
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;

            return;
        }

        handleChange(state);
    }, [state, handleChange]);
}
