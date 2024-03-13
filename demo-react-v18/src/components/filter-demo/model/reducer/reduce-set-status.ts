import update from 'immutability-helper';

import {
    EStatus
} from '../enum';
import {
    IModelState
} from '../types';

export default function reduceSetStatus(state: IModelState, payload: EStatus): IModelState {
    return update(state, {
        status: {
            $set: payload
        }
    });
}