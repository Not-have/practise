import React, {
    useReducer
} from "react";

interface IState {
    age: number;
    name: string;
}

const initState: IState = {
    age: 18,
    name: '李四'
}

export default function ReducerDemo(): JSX.Element {
    /**
     * 这个方法可以放在 ReducerDemo 里，也可以放在 ReducerDemo 外
     */
    const reducer = function () {

    }

    /**
     * 这块的类型定义很重要要
     */
    const [] = useReducer<any>(reducer, initState);


    return <>11</>
}