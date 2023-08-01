import update from 'immutability-helper';

import {
    IModelState
} from '../types';

export default function reduceSetKeyword(state: IModelState, payload: string): IModelState {
    return update(state, {
        keyword: {
            $set: payload
        }
    });
}