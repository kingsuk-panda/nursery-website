import React from 'react';
import styles from './ProductsPage.module.css';
import CategoryCard from '../components/CategoryCard';

// 👇 Update to use videoUrl and provide paths to your actual category videos 👇
// Make sure these video files exist in your src/assets/videos/ or public/videos/
// If in src/assets, you'll need to import them first.
// If in public, you can use direct paths like '/videos/category-plants.mp4'.
// For simplicity, assuming you'll import them:

import plantsVideo from '../assets/videos/category-plants.mp4'; // Example import
import seedsVideo from '../assets/videos/category-seeds.mp4';   // Example import
import potsVideo from '../assets/videos/category-pots.mp4';     // Example import
import careVideo from '../assets/videos/category-plant-care.mp4'; // Example import


const categories = [
  { name: 'Plants', path: '/products/plants', videoUrl: plantsVideo }, 
  { name: 'Seeds', path: '/products/seeds', videoUrl: seedsVideo },
  { name: 'Pots', path: '/products/pots', videoUrl: potsVideo },
  { name: 'Plant Care', path: '/products/plant-care', videoUrl: careVideo },
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
            videoUrl={category.videoUrl} // Pass videoUrl prop
            animationDelay={`${index * 0.15}s`}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;