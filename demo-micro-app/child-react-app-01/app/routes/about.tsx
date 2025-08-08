import type { Route } from "./+types/about";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "关于我们 - React Router App" },
    { name: "description", content: "了解我们的技术栈和团队" },
  ];
}

export default function About() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">关于我们</h1>
      <p className="text-lg mb-8">
        这是一个使用 React Router 7 + TypeScript 构建的现代化 Web 应用。
      </p>
      
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">技术栈</h2>
        <ul className="space-y-2">
          <li className="flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
            React 19 - 用于构建用户界面的 JavaScript 库
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
            TypeScript - 类型安全的 JavaScript
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
            React Router 7 - 官方路由管理器
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
            Tailwind CSS - 实用优先的 CSS 框架
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
            Vite - 快速构建工具
          </li>
        </ul>
      </div>
    </div>
  );
} 