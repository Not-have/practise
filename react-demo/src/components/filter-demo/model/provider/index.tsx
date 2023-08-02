import React, {
    useReducer
} from 'react';

import {
    IModelProviderProps,
    IModelReducer
} from '../types';
import Context from '../context';
import {
    DEFAULT_CONTEXT_STATE
} from '../const';
import reducer from '../reducer';
import Lifecycle from '../lifecycle';

/**
 * 组合 model 和 Ui
 * 在这把数据传入 Ui
 */
export default function Provider({
    props,
    children
}: IModelProviderProps): JSX.Element {
    const [state, dispatch] = useReducer<IModelReducer>(reducer, DEFAULT_CONTEXT_STATE);

    return <Context.Provider value={{
        props,
        state,
        dispatch
    }}>
        {children}
        <Lifecycle />
    </Context.Provider>;
}