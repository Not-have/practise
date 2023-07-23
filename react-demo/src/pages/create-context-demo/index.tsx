import React, {useState} from "react";
import {
    IProps
} from './types'
import Context from "./context";
import Ui from './ui'

export default function (): JSX.Element {
    // state 模拟插入的 props
    const state: IProps = {
        name: '里斯',
        age: 25
    }
    /**
     * props 目前是全部掺入 Context 中时使用的参数，在传入的参数，比较单一时，更加建议使用平铺
     * 当传入 value 的不为基础类型时，应该在 hook 下在定义 _use-model-Xxx(props) 这样的文件去取
     * 在外使用 传入的变量时，应在 hook 下创建 use-Xxx（你要使用的参数，确保见名知意）,比如取 name 时，应创建 use-name
     */
    return <Context.Provider value={{
        props: state
    }}>
        <Ui />
    </Context.Provider>
}