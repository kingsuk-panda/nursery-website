import React, { useState, useEffect, useRef } from 'react'; // Import useRef
import { useParams, Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import styles from './CategoryProductsPage.module.css';
import ProductCard from '../components/ProductCard';
import LoadingIndicator from '../components/LoadingIndicator'; 

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
  const [showContent, setShowContent] = useState(false); 
  
  // 👇 Create a ref for the loading indicator's DOM node
  const loadingIndicatorRef = useRef(null); 

  useEffect(() => {
    setIsLoading(true);
    setShowContent(false); 
    const startTime = Date.now();

    // --- Simulate fetching products ---
    const filteredProducts = allProducts.filter(
      (product) => product.category.toLowerCase() === categoryName.toLowerCase()
    );
    const fetchDataDuration = 500; 
    // --- End Simulation ---
    
    const minLoadingTime = 2000; 

    const finishLoading = () => {
      setProducts(filteredProducts); 
      setIsLoading(false); 
    };

    setTimeout(() => { // Simulate fetch completing
        const endTime = Date.now();
        const elapsedTime = endTime - startTime;
        const remainingTime = minLoadingTime - elapsedTime;

        if (remainingTime > 0) {
            setTimeout(finishLoading, remainingTime);
        } else {
            finishLoading();
        }
    }, fetchDataDuration);

  }, [categoryName]);

  const pageTitle = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

  return (
    <div className={styles.categoryProductsContainer}>
        <CSSTransition
          // 👇 Pass the ref via nodeRef
          nodeRef={loadingIndicatorRef} 
          in={isLoading} 
          timeout={500} // Exit animation duration
          classNames={{ // Use the CSS Module class names directly if preferred
             exit: styles.loadingIndicatorExit,
             exitActive: styles.loadingIndicatorExitActive,
             // We are not animating enter here, but if needed:
             // enter: styles.loadingIndicatorEnter,
             // enterActive: styles.loadingIndicatorEnterActive,
          }}
          unmountOnExit 
          onExited={() => setShowContent(true)} 
        >
          {/* 👇 Pass the ref down to the LoadingIndicator component */}
          <LoadingIndicator ref={loadingIndicatorRef} text="Loading products..." />
        </CSSTransition>

        {showContent && (
            // Content wrapper - applies fade-in animation via CSS module class
            <div className={`${styles.contentWrapper} ${styles.contentFadeIn}`}> 
                <nav aria-label="breadcrumb" className={styles.breadcrumbs}>
                    <Link to="/products">Categories</Link> <span>&gt;</span> {pageTitle}
                </nav>
                <h1 className={styles.pageTitle}>{pageTitle}</h1>
                {products.length > 0 ? (
                    // Grid - animation applied by parent or specifically here
                    <div className={styles.productsGrid}> 
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