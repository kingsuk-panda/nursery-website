import React from 'react';
import styles from './ProductsPage.module.css';
import CategoryCard from '../components/CategoryCard';

// 👇 Import your new background video for this page
import pageBackgroundVideo from '../assets/videos/products-page-bg.mp4'; // Replace with your actual video file

// Category video imports (ensure these paths are correct)
import plantsVideo from '../assets/videos/category-plants.mp4';
import seedsVideo from '../assets/videos/category-seeds.mp4';
import potsVideo from '../assets/videos/category-pots.mp4';
import careVideo from '../assets/videos/category-plant-care.mp4';

const categories = [
  { name: 'Plants', path: '/products/plants', videoUrl: plantsVideo }, 
  { name: 'Seeds', path: '/products/seeds', videoUrl: seedsVideo },
  { name: 'Pots', path: '/products/pots', videoUrl: potsVideo },
  { name: 'Plant Care', path: '/products/plant-care', videoUrl: careVideo },
];

function ProductsPage() {
  return (
    <div className={styles.productsPageContainer}>
      {/* Background Video */}
      <video 
        className={styles.pageBackgroundVideo} 
        autoPlay 
        loop 
        muted 
        playsInline 
        key={pageBackgroundVideo} // Helps React re-render if src changes
      >
        <source src={pageBackgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Overlay for readability */}
      <div className={styles.videoOverlay}></div>

      {/* Page Content (Title and Category Grid) */}
      <div className={styles.pageContentWrapper}> {/* New wrapper for content */}
        <h1 className={styles.pageTitle}>Our Products</h1>
        <div className={styles.categoryGrid}>
          {categories.map((category, index) => (
            <CategoryCard
              key={category.name}
              name={category.name}
              linkTo={category.path}
              videoUrl={category.videoUrl}
              animationDelay={`${index * 0.15}s`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;