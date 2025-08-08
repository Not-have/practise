import type { Route } from "./+types/not-found";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "页面未找到 - React Router App" },
    { name: "description", content: "抱歉，您访问的页面不存在" },
  ];
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          页面未找到
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          抱歉，您访问的页面不存在。
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
} 