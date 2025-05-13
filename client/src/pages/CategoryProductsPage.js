// client/src/pages/CategoryProductsPage.js

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './CategoryProductsPage.module.css';
import ProductCard from '../components/ProductCard';
import LoadingOverlay from '../components/LoadingOverlay';

// MOCK DATA - "Rose Bush (Red)" changed to "Rose Bush (Pink)"
const allProducts = [
  { 
    id: 'p1', category: 'plants', name: 'Monstera Deliciosa', 
    price: 1080, originalPrice: 1200, 
    imageUrl: '/images/monstera.jpg', 
    rating: 4.5, numReviews: 172
  },
  { 
    id: 'p2', category: 'plants', name: 'Snake Plant', 
    price: 800, originalPrice: null, 
    imageUrl: '/images/snake-plant.jpg', 
    rating: 4.8, numReviews: 210
  },
  { 
    id: 'p3', category: 'plants', name: 'Fiddle Leaf Fig', 
    price: 2250, originalPrice: 2500,
    imageUrl: '/images/fiddle-leaf.jpg', 
    rating: 4.2, numReviews: 95
  },
  { 
    id: 'p4', category: 'plants', name: 'Rose Bush (Pink)', // << UPDATED NAME
    price: 450, originalPrice: 500, 
    imageUrl: '/images/rose-bush-pink.jpg', // << SUGGESTED IMAGE URL UPDATE
    rating: 4.6, numReviews: 130 
  },
  { 
    id: 's1', category: 'seeds', name: 'Tomato Seeds', 
    price: 130, originalPrice: 150, 
    imageUrl: '/images/tomato-seeds.jpg', 
    rating: 4.0, numReviews: 65
  },
  { 
    id: 's2', category: 'seeds', name: 'Marigold Seeds', 
    price: 120, originalPrice: null, 
    imageUrl: '/images/marigold-seeds.jpg', 
    rating: 4.3, numReviews: 77
  },
  { 
    id: 'pt1', category: 'pots', name: 'Terracotta Pot (Medium)', 
    price: 280, originalPrice: 320, 
    imageUrl: '/images/terracotta-pot.jpg', 
    rating: 4.7, numReviews: 150
  },
  { 
    id: 'pt2', category: 'pots', name: 'Ceramic Planter (Blue)', 
    price: 750, originalPrice: null, 
    imageUrl: '/images/ceramic-planter.jpg', 
    rating: 4.9, numReviews: 92
  },
  { 
    id: 'pc1', category: 'plant-care', name: 'Organic Fertilizer', 
    price: 220, originalPrice: 250, 
    imageUrl: '/images/fertilizer.jpg', 
    rating: 4.4, numReviews: 105
  },
  { 
    id: 'pc2', category: 'plant-care', name: 'Gardening Tool Set', 
    price: 900, originalPrice: 999, 
    imageUrl: '/images/gardening-tools.jpg', 
    rating: 4.1, numReviews: 55
  },
];
const placeholderImage = '/images/placeholder-plant.jpg';


function CategoryProductsPage() {
  const { categoryName } = useParams(); 
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [animateContent, setAnimateContent] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setAnimateContent(false);
    
    const filteredProducts = allProducts.filter(
      (product) => product.category.toLowerCase() === categoryName.toLowerCase()
    );
    const fetchDataDuration = 700; 
    
    const finishLoading = () => {
      setProducts(filteredProducts); 
      setIsLoading(false); 
      setTimeout(() => setAnimateContent(true), 50); 
    };

    setTimeout(finishLoading, fetchDataDuration); 

  }, [categoryName]);

  const pageTitle = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

  return (
    <div className={styles.categoryProductsContainer}>
      <LoadingOverlay isActive={isLoading} />

      {!isLoading && (
          <div className={`${styles.contentWrapper} ${animateContent ? styles.contentVisible : styles.contentHiddenInitially}`}> 
              <nav aria-label="breadcrumb" className={styles.breadcrumbs}>
                  <Link to="/products">Categories</Link> <span>&gt;</span> {pageTitle}
              </nav>
              <h1 className={styles.pageTitle}>{pageTitle}</h1>
              
              {products.length > 0 ? (
                  <div className={styles.productsGrid}> 
                      {products.map((product, index) => (
                          <ProductCard 
                            key={product.id} 
                            product={product} 
                            animationDelay={`${index * 0.07}s`} 
                          />
                      ))}
                  </div>
              ) : (
                  <p className={styles.noProducts}>
                      No products found in this category yet.
                  </p>
              )}
          </div>
      )}
    </div>
  );
}

export default CategoryProductsPage;