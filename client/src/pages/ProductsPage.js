import React from 'react';
import { Link } from 'react-router-dom'; // For linking to category pages later
import styles from './ProductsPage.module.css';
import CategoryCard from '../components/CategoryCard'; // We'll create this next

// Placeholder data for categories - eventually this might come from an API or be more dynamic
const categories = [
  { name: 'Plants', path: '/products/plants', imageUrl: '/path/to/plants-bg.jpg' }, // Replace with actual image paths
  { name: 'Seeds', path: '/products/seeds', imageUrl: '/path/to/seeds-bg.jpg' },
  { name: 'Pots', path: '/products/pots', imageUrl: '/path/to/pots-bg.jpg' },
  { name: 'Plant Care', path: '/products/plant-care', imageUrl: '/path/to/plant-care-bg.jpg' },
];

function ProductsPage() {
  return (
    <div className={styles.productsPageContainer}>
      <h1 className={styles.pageTitle}>Our Products</h1>
      <div className={styles.categoryGrid}>
        {categories.map((category) => (
          <CategoryCard
            key={category.name}
            name={category.name}
            linkTo={category.path}
            backgroundImageUrl={category.imageUrl} // For the blurry background effect
          />
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;