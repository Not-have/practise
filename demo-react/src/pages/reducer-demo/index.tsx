import React, {
    useReducer
} from "react";
import update from 'immutability-helper'

interface IState {
    age: number;
    name: string;
}

// useReducer 的类型定义
interface IReducer {
    (state: IState): IState;
}

const initState: IState = {
    age: 18,
    name: '李四'
}

export default function ReducerDemo(): JSX.Element {
    function init(initialCount: IState): IState {
        return update(initialCount, {
            name: {
                $set: '里斯'
            }
        })
    }

    // reducer 第一个方法，必须掺入，负责会报错
    const reducer = function (state: IState) {
        return state
    }

    // 使用第三个参数的时候，这里一定要写两个泛型
    const [state] = useReducer<IReducer, IState>(reducer, initState, init);

    return <>
        useReducer 状态管理
        <br/>
        {state.age}
        {state.name}
    </>
}