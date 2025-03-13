# 面试

## 1、SSR 性能优化

## 2、请求缓存优化

## 3、跨域

## 4、闭包

## 5、观察者模式

## 6、XSS

## 7、微前端打包加载机制、window 隔离

### 微前端沙箱机制

原理：通过创建一个虚拟的 window 对象，将子应用的代码运行在这个虚拟环境中，从而实现与主应用和其他子应用的隔离。

示例代码：

```javascript
function createSandbox() {
    const sandbox = {
        window: {},
        document: {},
    };
    const code = `
        // 子应用代码
        function init() {
            window.myVariable = 'Hello from subapp';
            console.log(window.myVariable);
        }
        init();
    `;
    const script = new Function('window', 'document', code);
    script(sandbox.window, sandbox.document);
    return sandbox;
}

const subappSandbox = createSandbox();
console.log(subappSandbox.window.myVariable); // 输出: Hello from subapp
console.log(window.myVariable); // 输出: undefined
```

## 8、内存泄露与垃圾回收

在 JavaScript 里，内存泄漏和垃圾回收是十分关键的概念，它们和程序的性能与稳定性紧密相连。下面为你详细介绍这两个概念。

### 1）垃圾回收机制

JavaScript 是一门采用自动内存管理的语言，也就是垃圾回收机制（Garbage Collection，简称 GC）。该机制的主要功能是自动找出那些不再被使用的对象，然后释放它们所占用的内存。

#### 常见的垃圾回收算法

- **标记清除算法（Mark and Sweep）**
这是最基础的垃圾回收算法。它的工作流程如下：
    1. **标记阶段**：垃圾回收器会从根对象（像全局对象、函数调用栈等）开始，对所有可达对象进行标记。
    2. **清除阶段**：把那些未被标记的对象视为垃圾，释放它们所占用的内存。
- **标记整理算法（Mark and Compact）**
该算法是在标记清除算法的基础上发展而来的，它在清除阶段之后增加了整理内存的步骤，也就是把存活的对象往内存的一端移动，以此来减少内存碎片。
- **引用计数算法（Reference Counting）**
为每个对象维护一个引用计数，当有新的引用指向该对象时，引用计数加 1；当引用被移除时，引用计数减 1。一旦引用计数变为 0，就表明该对象不再被使用，其内存会被释放。不过，这种算法无法处理循环引用的问题。

#### 代码示例

```javascript
// 创建一个对象
let obj = { name: 'John' };

// 此时 obj 指向的对象有一个引用

// 移除引用
obj = null;

// 此时 obj 指向的对象没有引用了，垃圾回收器会在合适的时候回收该对象的内存

```

#### 标记清除算法在什么时候会执行？

JavaScript 的垃圾回收器会在以下几种情况下执行标记清除算法：

- **内存不足**：当可用内存不足时，垃圾回收器会开始执行。
- **手动触发**：你可以通过调用 `global.gc()` 来手动触发垃圾回收。
- **定时触发**：垃圾回收器会在后台定期执行，这是一种自动的方式。

### 2）内存泄漏

内存泄漏指的是程序在运行过程中，一些不再使用的内存没有被释放，从而导致内存占用持续增加，最终可能引发程序性能下降甚至崩溃。

#### 常见的内存泄漏场景

- **全局变量**

在全局作用域中声明变量，如果不手动释放，这些变量会一直存在于内存中。

```javascript
// 全局变量
window.globalVar = { data: [1, 2, 3, 4, 5] };
// 若后续不再使用 globalVar，但未将其置为 null，它会一直占用内存

```

- **未清理的定时器**

如果定时器在不再需要时没有被清除，它会持续占用内存。

```javascript
// 创建一个定时器
const intervalId = setInterval(() => {
    console.log('This is a timer');
}, 1000);

// 如果后续不再需要这个定时器，却没有清除它
// clearInterval(intervalId);

```

- **闭包**

闭包会引用其外部函数的变量，若闭包一直存在，这些变量就不会被释放。

```javascript
function outer() {
    let data = [1, 2, 3];
    return function inner() {
        return data;
    };
}

const closure = outer();
// 由于 closure 这个闭包一直存在，它引用的 data 数组不会被释放

```

- **DOM 元素引用**

如果对 DOM 元素的引用没有被清除，即使该元素已经从 DOM 树中移除，它仍然会占用内存。

```javascript
const element = document.getElementById('myElement');
// 假设后续将该元素从 DOM 树中移除
document.body.removeChild(element);
// 但由于 element 变量仍然引用该元素，它不会被释放

```

### 3）避免内存泄漏的方法

- **避免使用全局变量**：尽可能在局部作用域中声明变量。
- **及时清理定时器**：在不需要定时器时，使用 `clearInterval` 或 `clearTimeout` 清除它们。
- **合理使用闭包**：在闭包不再使用时，手动解除对外部变量的引用。
- **清除 DOM 元素引用**：在 DOM 元素从 DOM 树中移除后，将对该元素的引用置为 `null`。 

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

Monorepo 通过符号链接、虚拟包和依赖管理工具实现包共享
