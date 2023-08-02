import {
    EStatus
} from '../enum';

import {
    TModelAction
} from './action';
/**
 * useReducer 的类型
 */

export interface IModelState {
    keyword: string;
    status: EStatus;
}

export interface IModelReducer {
    (state: IModelState, action: TModelAction): IModelState;
}