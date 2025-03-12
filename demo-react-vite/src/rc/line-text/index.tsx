import React from "react";
import styled from "styled-components";

// 使用 div 标签进行样式化
const ScDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background-color: #ccc;
  }
`;

interface IProps {
  children: React.ReactNode | string;
}

// 函数组件返回值类型修改为 JSX.Element
export default function ScLineText({
  children
}: IProps): React.ReactElement {
  return (
    <ScDiv>
      {children}
    </ScDiv>
  );
}
