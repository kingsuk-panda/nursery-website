import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './CategoryProductsPage.module.css';
import ProductCard from '../components/ProductCard';
import LoadingIndicator from '../components/LoadingIndicator'; // Import the new component

// MOCK DATA (ensure image paths are correct for your setup)
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
  // State to trigger content fade-in animation *after* loading is false
  const [showContent, setShowContent] = useState(false); 

  useEffect(() => {
    setIsLoading(true);
    setShowContent(false); // Reset content visibility on category change
    const startTime = Date.now();

    // --- Simulate fetching products ---
    // Replace this section with your actual API call later
    const filteredProducts = allProducts.filter(
      (product) => product.category.toLowerCase() === categoryName.toLowerCase()
    );
    const fetchDataDuration = 500; // Simulate 0.5 second fetch time
    // --- End Simulation ---
    
    const minLoadingTime = 2000; // Ensure loading shows for at least 2 seconds

    setTimeout(() => { // This represents the fetch completing
        const endTime = Date.now();
        const elapsedTime = endTime - startTime;
        const remainingTime = minLoadingTime - elapsedTime;

        const finishLoading = () => {
            setProducts(filteredProducts);
            setIsLoading(false);
            // Use a short timeout to allow state to update and LoadingIndicator to unmount
            // before triggering the content fade-in animation
            setTimeout(() => setShowContent(true), 50); 
        };

        if (remainingTime > 0) {
            // If fetch finished faster than 2s, wait the remainder
            setTimeout(finishLoading, remainingTime);
        } else {
            // If fetch took 2s or longer, finish immediately
            finishLoading();
        }
    }, fetchDataDuration); // This outer timeout simulates the fetch delay itself

  }, [categoryName]); // Re-run effect when categoryName changes

  const pageTitle = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

  return (
    <div className={styles.categoryProductsContainer}>
        {isLoading ? (
            // Show the animated loading indicator
            <LoadingIndicator text="Loading products..." />
        ) : (
            // Show the content with fade-in animation controlled by showContent state
            <div className={`${styles.contentWrapper} ${showContent ? styles.contentFadeIn : styles.contentHidden}`}>
                <nav aria-label="breadcrumb" className={styles.breadcrumbs}>
                    <Link to="/products">Categories</Link> <span>&gt;</span> {pageTitle}
                </nav>
                <h1 className={styles.pageTitle}>{pageTitle}</h1>
                {products.length > 0 ? (
                    // Apply specific fade-in for grid (can have slight delay)
                    <div className={`${styles.productsGrid} ${showContent ? styles.gridFadeIn : ''}`}>
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
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