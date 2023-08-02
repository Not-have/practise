import React, {
    useCallback
} from 'react';

import FilterDemo from '../../components/filter-demo';

export default function ContextReducerDemo(): JSX.Element {
    const handleChange = useCallback((e: unknown) => {
        // eslint-disable-next-line no-console
        console.log(e);
    }, []);

    // 实现一个 输入框 和 标签过滤的组件
    return <FilterDemo {...{
        onChange: handleChange
    }} />;
}