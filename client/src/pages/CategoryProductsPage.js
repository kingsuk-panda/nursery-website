import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './CategoryProductsPage.module.css';
import ProductCard from '../components/ProductCard';
import LoadingOverlay from '../components/LoadingOverlay';

// MOCK DATA (ensure image paths are correct)
const allProducts = [
  { id: 'p1', category: 'plants', name: 'Monstera Deliciosa', price: 1200, imageUrl: '/images/monstera.jpg' },
  { id: 'p2', category: 'plants', name: 'Snake Plant', price: 800, imageUrl: '/images/snake-plant.jpg' },
  { id: 'p3', category: 'plants', name: 'Fiddle Leaf Fig', price: 2500, imageUrl: '/images/fiddle-leaf.jpg' },
  { id: 'p4', category: 'plants', name: 'Rose Bush (Red)', price: 500, imageUrl: '/images/rose-bush.jpg' },
  { id: 's1', category: 'seeds', name: 'Tomato Seeds', price: 150, imageUrl: '/images/tomato-seeds.jpg' },
  { id: 's2', category: 'seeds', name: 'Marigold Seeds', price: 120, imageUrl: '/images/marigold-seeds.jpg' },
  { id: 'pt1', category: 'pots', name: 'Terracotta Pot (Medium)', price: 300, imageUrl: '/images/terracotta-pot.jpg' },
  { id: 'pt2', category: 'pots', name: 'Ceramic Planter (Blue)', price: 750, imageUrl: '/images/ceramic-planter.jpg' },
  { id: 'pc1', category: 'plant-care', name: 'Organic Fertilizer', price: 250, imageUrl: '/images/fertilizer.jpg' },
  { id: 'pc2', category: 'plant-care', name: 'Gardening Tool Set', price: 900, imageUrl: '/images/gardening-tools.jpg' },
];

function CategoryProductsPage() {
  const { categoryName } = useParams(); 
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    setIsLoading(true);
    const filteredProducts = allProducts.filter(
      (product) => product.category.toLowerCase() === categoryName.toLowerCase()
    );
    const fetchDataDuration = 1000; 
    
    const finishLoading = () => {
      setProducts(filteredProducts); 
      setIsLoading(false); 
    };
    setTimeout(finishLoading, fetchDataDuration); 
  }, [categoryName]);

  const pageTitle = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

  return (
    <div className={styles.categoryProductsContainer}>
      <LoadingOverlay isActive={isLoading} />

      {/* The contentWrapper will still fade in, providing an entry for title/breadcrumbs */}
      {!isLoading && (
          <div className={styles.contentWrapper}> 
              <nav aria-label="breadcrumb" className={styles.breadcrumbs}>
                  <Link to="/products">Categories</Link> <span>&gt;</span> {pageTitle}
              </nav>
              <h1 className={styles.pageTitle}>{pageTitle}</h1>
              {products.length > 0 ? (
                  // The grid itself doesn't need a separate fade-in class now
                  <div className={styles.productsGrid}> 
                      {products.map((product, index) => ( // Added index here
                          <ProductCard 
                            key={product.id} 
                            product={product} 
                            // Pass a staggered animation delay to each product card
                            animationDelay={`${index * 0.1}s`} // Adjust 0.1s for faster/slower stagger
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