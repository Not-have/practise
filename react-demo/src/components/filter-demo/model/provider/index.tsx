import React, {
    useReducer
} from 'react';

import {
    IModelProviderProps,
    IModelReducer,
    IModelState
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
    /**
     * 初始赋值
     */
    const initState = function(state: IModelState): IModelState {
        if (!props.values) {
            return state;
        }

        return {
            ...state,
            ...props.values
        };
    };
    const [state, dispatch] = useReducer<IModelReducer, IModelState>(reducer, DEFAULT_CONTEXT_STATE, initState);

    return <Context.Provider value={{
        props,
        state,
        dispatch
    }}>
        {children}
        <Lifecycle />
    </Context.Provider>;
}