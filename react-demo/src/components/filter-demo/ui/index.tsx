import React, {useState} from 'react';
import {Tag, Input} from 'antd';
import styled from 'styled-components';

const ScDiv = styled.div`
    margin: 0 10px;
`
const {CheckableTag} = Tag;
const {Search} = Input;

const tagsData = ['Movies', 'Books', 'Music', 'Sports'];

const App: React.FC = () => {
    const [selectedTags, setSelectedTags] = useState<string>(tagsData[0]);

    const handleChange = (tag: string, checked: boolean) => {
        checked ? setSelectedTags(tag) : null;
    };

    return (
        <ScDiv>
            <Search/>
            <span style={{marginRight: 8}}>状态：</span>
            {tagsData.map((tag) => (
                <CheckableTag
                    key={tag}
                    checked={selectedTags.includes(tag)}
                    onChange={(checked) => handleChange(tag, checked)}
                >
                    {tag}
                </CheckableTag>
            ))}
        </ScDiv>
    );
};

export default App;