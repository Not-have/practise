import React from "react";

import {
    IProps
} from '../types'
import Provider from "../model";
import Ui from '../ui'
/**
 * 组合 Ui 和 Model 层
 */
export default function Rc(props: IProps): JSX.Element{
    return <Provider props={props}>
        <Ui />
    </Provider>
}