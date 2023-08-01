import {
    EAction
} from '../enum';
import {
    IModelState,
    TModelAction
} from '../types';

import reduceSetStatus from './reduce-set-status';
import reduceSetKeyword from './reduce-set-keyword';

/**
 * @param state useReducer 中的状态
 * @param action 修改调用的 key
 */
export default function reducer(state: IModelState, action: TModelAction): IModelState {
    switch (action.type) {
    case EAction.SET_KEYWORD:
        return reduceSetKeyword(state, action.payload);
    case EAction.SET_STATUS:
        return reduceSetStatus(state, action.payload);
    default:
        return state;
    }
}