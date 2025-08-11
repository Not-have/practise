import { useState } from 'react';
import styles from './Products.module.css';

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
    name: '产品 A',
    description: '这是一个很棒的产品，具有出色的性能和品质。',
    price: 199,
    image: 'https://via.placeholder.com/300x200?text=Product+A'
  },
  {
    id: 2,
    name: '产品 B',
    description: '另一个优秀的产品，满足您的各种需求。',
    price: 299,
    image: 'https://via.placeholder.com/300x200?text=Product+B'
  },
  {
    id: 3,
    name: '产品 C',
    description: '高端产品，为您提供最佳的体验。',
    price: 399,
    image: 'https://via.placeholder.com/300x200?text=Product+C'
  },
  {
    id: 4,
    name: '产品 D',
    description: '创新设计，引领行业潮流。',
    price: 499,
    image: 'https://via.placeholder.com/300x200?text=Product+D'
  }
];

export default function Products() {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({}); 

  const handleImageError = (productId: number) => {
    setImageErrors(prev => ({ ...prev, [productId]: true }));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>产品展示</h1>
      <p className={styles.description}>浏览我们的产品目录</p>
      
      <div className={styles.productGrid}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <img 
              src={imageErrors[product.id] ? '' : product.image}
              alt={product.name}
              className={styles.productImage}
              onError={() => handleImageError(product.id)}
            />
            <div className={styles.productInfo}>
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.productDescription}>{product.description}</p>
              <div className={styles.productFooter}>
                <span className={styles.productPrice}>¥{product.price}</span>
                <button className={styles.productButton}>
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