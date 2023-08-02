import React, {
    ChangeEvent,
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
} from '../../const';
import {
    EStatus,
    useStatus,
    useKeyword
} from '../../model';
import {
    useHandleStatus,
    useHandleKeyword
} from '../hook';

const ScDiv = styled.div`
    margin: 0 20px;
    span {
        margin-top: 10px;
    }
`;
const {
    CheckableTag
} = Tag;

export default function Main(): JSX.Element {
    const status = useStatus();
    const keyword = useKeyword();
    const handleStatus = useHandleStatus();
    const handleKeyword = useHandleKeyword();

    const onChangeKeyword = useCallback((e: ChangeEvent<HTMLInputElement>) => handleKeyword(e.target.value), [handleKeyword]);
    const onChangeStatus = useCallback((_checked: boolean, v: EStatus) => {
        if (_checked) {
            handleStatus(v);
        }
    }, [handleStatus]);

    return (
        <ScDiv>
            <Input {...{
                value: keyword,
                onChange: onChangeKeyword
            }} />
            <span style={{
                marginRight: 8
            }}>状态：</span>
            {DATA_STATUS.map(v =>
                <CheckableTag {...{
                    key: v.value,
                    checked: _isEqual(status, v.value),
                    children: v.label,
                    onChange: checked => onChangeStatus(checked, v.value)
                }} />)}
        </ScDiv>
    );
}
