import type { Route } from "./+types/products";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "产品展示 - React Router App" },
    { name: "description", content: "浏览我们的产品目录" },
  ];
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "产品 A",
    description: "这是一个很棒的产品，具有出色的性能和品质。",
    price: 199,
    image: "https://via.placeholder.com/300x200?text=Product+A"
  },
  {
    id: 2,
    name: "产品 B",
    description: "另一个优秀的产品，满足您的各种需求。",
    price: 299,
    image: "https://via.placeholder.com/300x200?text=Product+B"
  },
  {
    id: 3,
    name: "产品 C",
    description: "高端产品，为您提供最佳的体验。",
    price: 399,
    image: "https://via.placeholder.com/300x200?text=Product+C"
  },
  {
    id: 4,
    name: "产品 D",
    description: "创新设计，引领行业潮流。",
    price: 499,
    image: "https://via.placeholder.com/300x200?text=Product+D"
  }
];

export default function Products() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">产品展示</h1>
      <p className="text-lg mb-8">浏览我们的产品目录</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-blue-600">¥{product.price}</span>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors">
                  查看详情
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 