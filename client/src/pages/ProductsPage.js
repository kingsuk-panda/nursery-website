import React from 'react';
// import { Link } from 'react-router-dom'; // Link is used within CategoryCard
import styles from './ProductsPage.module.css';
import CategoryCard from '../components/CategoryCard';

const categories = [
  { name: 'Plants', path: '/products/plants', imageUrl: '/images/category-plants.jpg' }, // Replace with your actual image paths
  { name: 'Seeds', path: '/products/seeds', imageUrl: '/images/category-seeds.jpg' },
  { name: 'Pots', path: '/products/pots', imageUrl: '/images/category-pots.jpg' },
  { name: 'Plant Care', path: '/products/plant-care', imageUrl: '/images/category-plant-care.jpg' },
];

function ProductsPage() {
  return (
    <div className={styles.productsPageContainer}>
      <h1 className={styles.pageTitle}>Our Products</h1>
      <div className={styles.categoryGrid}>
        {categories.map((category, index) => (
          <CategoryCard
            key={category.name}
            name={category.name}
            linkTo={category.path}
            backgroundImageUrl={category.imageUrl}
            // Pass a staggered animation delay
            animationDelay={`${index * 0.15}s`} // e.g., 0s, 0.15s, 0.3s, 0.45s
          />
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;