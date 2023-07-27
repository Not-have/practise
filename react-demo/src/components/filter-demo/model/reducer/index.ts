import {

} from '../types';

export default function reducer(state: IModelState, action: TModelAction): IModelState {
    switch (action.type) {
        case EAction.SET_DOCK_ACTIVE:
            return reduceSetDockActive(state, action.payload);
        case EAction.SET_DOCK_ACTIVE_BY_HOVER_TIMESTAMP:
            return reduceSetDockActiveByHoverTimestamp(state, action.payload);
        case EAction.SET_DOCK_HOVER_ACTIVE_TIMER:
            return reduceSetDockHoverActiveTimer(state, action.payload);
        default:
            return state;
    }
}