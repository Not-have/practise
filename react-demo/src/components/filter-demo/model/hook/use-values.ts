import {
    IProps
} from '../types';

import useModelProps from './_use-model-props';

/**
 * @deprecated
 */
export default function useValues(): IProps['values'] {
    return useModelProps().values;
}