export default function Two() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">页面 Two</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-700 mb-4">
          这是路由 Two 的内容页面。你可以在这里添加任何你需要的组件和功能。
        </p>
        <div className="bg-green-50 border border-green-200 rounded-md p-4">
          <h2 className="text-lg font-semibold text-green-900 mb-2">页面信息</h2>
          <ul className="text-green-800 space-y-1">
            <li>• 清晰的布局结构</li>
            <li>• 美观的视觉设计</li>
            <li>• 良好的用户体验</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 