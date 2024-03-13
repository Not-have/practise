import {
    EStatus
} from '../enum';

import useModelProps from './_use-model-props';
import useModelState from './_use-model-state';

export default function useStatus(): EStatus {
    const statusProps = useModelProps().values?.status;
    const {
        status
    } = useModelState();

    return statusProps ?? status;
}