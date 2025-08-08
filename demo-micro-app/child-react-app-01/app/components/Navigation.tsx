import { Link, useLocation } from "react-router";

interface MenuItem {
  name: string;
  path: string;
  icon: string;
}

const menuItems: MenuItem[] = [
  { name: "首页", path: "/", icon: "🏠" },
  { name: "关于", path: "/about", icon: "ℹ️" },
  { name: "产品", path: "/products", icon: "📦" },
  { name: "联系", path: "/contact", icon: "📞" },
];

export function Navigation() {
  const location = useLocation();
  
  return (
    <nav className="fixed left-0 top-0 w-64 h-full bg-gradient-to-b from-blue-600 to-purple-700 text-white shadow-lg z-50">
      <ul className="py-6">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <li key={item.path} className="mb-2">
              <Link
                to={item.path}
                className={`flex items-center px-6 py-3 text-white transition-all duration-300 hover:bg-white/10 hover:translate-x-2 ${
                  isActive
                    ? "bg-white/20 border-l-4 border-white font-semibold"
                    : "border-l-4 border-transparent"
                }`}
              >
                <span className="text-xl mr-3">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
} 