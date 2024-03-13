import {
    Dispatch
} from 'react';

import {
    EAction, EStatus
} from '../enum';

/**
 * useReducer 中第二个参数的类型
 * 也就是 useReducer 的类型
 */
export type TModelAction = {
    type: EAction.SET_KEYWORD;
    payload: string;
} | {
    type: EAction.SET_STATUS;
    payload: EStatus;
};

export type TModelDispatch = Dispatch<TModelAction>;