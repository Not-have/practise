import React from 'react';

import Provider, {
    Props
} from '../model';
import Ui from '../ui';

/**
 * 组合 Ui 和 Model 层
 */
export default function Rc(props: Props): JSX.Element {
    return <Provider props={props}>
        <Ui />
    </Provider>;
}