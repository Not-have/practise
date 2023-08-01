import React, {
    useCallback
} from 'react';
import {
    isEqual as _isEqual
} from 'lodash';
import {
    Input, Tag
} from 'antd';
import styled from 'styled-components';

import {
    DATA_STATUS
} from '../const';
import {
    EStatus,
    useStatus
} from '../model';

import {
    useHandleChange
} from './hook';

const ScDiv = styled.div`
    margin: 0 20px;
    span {
        margin-top: 10px;
    }
`;
const {
    CheckableTag
} = Tag;
const {
    Search
} = Input;

export default function Ui(): JSX.Element {
    const status = useStatus();
    const handleChange = useHandleChange();
    const onChangeTag = useCallback((_checked: boolean, v: EStatus) => handleChange(v), [handleChange]);

    return (
        <ScDiv>
            <Search />
            <span style={{
                marginRight: 8
            }}>状态：</span>
            {DATA_STATUS.map(v =>
                <CheckableTag {...{
                    key: v.value,
                    checked: _isEqual(status, v.value),
                    children: v.label,
                    onChange: checked => onChangeTag(checked, v.value)
                }} />)}
        </ScDiv>
    );
}
