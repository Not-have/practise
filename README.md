# 面试

## 1、SSR 性能优化

## 2、请求缓存优化

## 3、跨域

## 4、闭包

## 5、观察者模式

## 6、XSS

## 7、微前端打包加载机制、window 隔离

## 8、内存泄露与垃圾回收

## 9、React 渲染原理

React 是一个用于构建用户界面的 JavaScript 库，其渲染原理主要涉及虚拟 DOM、协调（Reconciliation）和渲染三个核心过程。下面为你详细介绍：

### 虚拟 DOM（Virtual DOM）

#### 概念

虚拟 DOM 是一种轻量级的 JavaScript 对象，它是真实 DOM 的抽象表示。在 React 中，每个组件都可以看作是一个函数，该函数接收一些输入（props），并返回一个描述 UI 结构的虚拟 DOM 树。

#### 作用

- **提高性能**：直接操作真实 DOM 的代价比较高，因为每次操作都会引发浏览器的重排和重绘。而虚拟 DOM 的操作是在内存中进行的，相对来说代价较低。React 通过比较新旧虚拟 DOM 树的差异，只更新需要更新的真实 DOM 节点，从而减少了对真实 DOM 的操作次数。
- **跨平台**：虚拟 DOM 是一个抽象的概念，不依赖于具体的平台。这使得 React 可以在不同的环境中使用，如浏览器、服务器端（SSR）、移动端（React Native）等。

#### 示例

```jsx
// 一个简单的 React 组件
import React from 'react';

const App = () => {
    return (
        <div>
            <h1>Hello, React!</h1>
        </div>
    );
};

// 这里的 JSX 代码会被转换为虚拟 DOM 对象
// 类似于下面的形式
const virtualDOM = React.createElement('div', null,
    React.createElement('h1', null, 'Hello, React!')
);
```

### 协调（Reconciliation）

#### 概念

协调是 React 比较新旧虚拟 DOM 树的过程，目的是找出两者之间的差异，从而确定需要对真实 DOM 进行哪些更新操作。这个过程也被称为“Diffing 算法”。

#### 算法原则

- **树比较**：React 会逐层比较新旧虚拟 DOM 树的节点。如果节点的类型不同（如从 `<div>` 变成 `<p>`），React 会直接替换整个子树。
- **组件比较**：对于组件节点，如果组件的类型相同，React 会复用该组件实例，并更新其 props；如果组件的类型不同，React 会销毁旧组件，创建新组件。
- **列表比较**：当处理列表时，React 会使用 `key` 属性来帮助识别每个元素。如果列表中的元素没有 `key`，React 会默认按照索引来比较，这可能会导致性能问题。而使用唯一的 `key` 可以帮助 React 更高效地识别哪些元素被添加、删除或移动。

#### 示例

```jsx
import React, { useState } from 'react';

const List = () => {
    const [items, setItems] = useState([1, 2, 3]);

    const addItem = () => {
        setItems([...items, items.length + 1]);
    };

    return (
        <div>
            <ul>
                {items.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
            <button onClick={addItem}>Add Item</button>
        </div>
    );
};

export default List;
```

在这个例子中，当点击按钮添加新元素时，React 会根据 `key` 属性来比较新旧虚拟 DOM 树，从而确定只需要在列表末尾添加一个新的 `<li>` 元素，而不是重新渲染整个列表。

### 渲染

#### 概念

渲染是将协调过程中确定的差异应用到真实 DOM 上的过程。React 会根据协调结果，对真实 DOM 进行插入、更新或删除等操作，从而实现 UI 的更新。

#### 过程

- **初始渲染**：当组件首次渲染时，React 会根据组件返回的虚拟 DOM 树创建对应的真实 DOM 节点，并将其插入到页面中。
- **更新渲染**：当组件的状态（state）或属性（props）发生变化时，React 会重新调用组件函数，生成新的虚拟 DOM 树。然后通过协调过程找出新旧虚拟 DOM 树的差异，最后将这些差异应用到真实 DOM 上。

#### 示例

```jsx
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const Counter = () => {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1);
    };

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={increment}>Increment</button>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Counter />);
```

在这个例子中，当点击按钮调用 `increment` 函数时，`count` 状态会发生变化，React 会重新渲染 `Counter` 组件，生成新的虚拟 DOM 树。然后通过协调过程找出差异，最后将更新后的 `count` 值反映到真实 DOM 上。

### 总结

React 的渲染原理主要包括虚拟 DOM、协调和渲染三个核心过程。虚拟 DOM 作为真实 DOM 的抽象表示，在内存中进行操作，提高了性能和跨平台性；协调过程通过 Diffing 算法比较新旧虚拟 DOM 树的差异；渲染过程将这些差异应用到真实 DOM 上，实现 UI 的更新。通过这些机制，React 能够高效地管理和更新用户界面。

## 10、monorepo 实现原理，也就是包共享原理

## 11、两个数字间的随机数

## 12、过滤一个数组中的奇数
