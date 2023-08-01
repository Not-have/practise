import {
    EStatus
} from '../enum';

import useModelState from './_use-model-state';

export default function useStatus(): EStatus {
    return useModelState().status;
}