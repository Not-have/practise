import React, {
    ReactNode
} from 'react';

import {
    IModelProviderProps
} from '../types'
import Context from '../context';

/**
 * 组合 model 和 Ui
 * 在这把数据传入 Ui
 */
export default function Provider({
    props,
    children
}: IModelProviderProps): JSX.Element {
    return <Context.Provider value={{
        props,
    }}>
        {children}
    </Context.Provider>;
}