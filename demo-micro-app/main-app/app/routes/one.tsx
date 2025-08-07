export default function One() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">页面 One</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-700 mb-4">
          这是路由 One 的内容页面。你可以在这里添加任何你需要的组件和功能。
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">功能特性</h2>
          <ul className="text-blue-800 space-y-1">
            <li>• 响应式设计</li>
            <li>• 现代化 UI 组件</li>
            <li>• 易于扩展的结构</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 