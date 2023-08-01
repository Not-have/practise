import {
    EStatus
} from '../enum';
import {
    IModelState
} from '../types';

export const DEFAULT_CONTEXT_STATE: IModelState = {
    keyword: '',
    status: EStatus.OFF_LINE
};