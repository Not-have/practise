import React, {
    ReactNode, useReducer
} from 'react';

import {
    IModelProviderProps
} from '../types';
import Context from '../context';

/**
 * 组合 model 和 Ui
 * 在这把数据传入 Ui
 */
export default function Provider({
    props,
    children
}: IModelProviderProps): JSX.Element {
    const [state, dispatch] = useReducer();

    return <Context.Provider value={{
        props
    }}>
        {children}
    </Context.Provider>;
}