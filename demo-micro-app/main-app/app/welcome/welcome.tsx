import { Link } from "react-router";

export function Welcome() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">欢迎来到微应用</h1>
        <p className="text-xl text-gray-600 mb-8">
          这是一个基于 React Router 的微应用示例
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Link 
            to="/" 
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            首页
          </Link>
          <Link 
            to="/one" 
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            页面 One
          </Link>
          <Link 
            to="/two" 
            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            页面 Two
          </Link>
        </div>
        
        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">路由说明</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white p-4 rounded-md">
              <h3 className="font-semibold text-blue-600 mb-2">首页 (/)</h3>
              <p className="text-gray-600">应用的主页面，包含导航链接</p>
            </div>
            <div className="bg-white p-4 rounded-md">
              <h3 className="font-semibold text-green-600 mb-2">页面 One (/one)</h3>
              <p className="text-gray-600">第一个功能页面，展示蓝色主题</p>
            </div>
            <div className="bg-white p-4 rounded-md">
              <h3 className="font-semibold text-purple-600 mb-2">页面 Two (/two)</h3>
              <p className="text-gray-600">第二个功能页面，展示绿色主题</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}