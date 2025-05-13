import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './ProductPage.module.css';
import LoadingOverlay from '../components/LoadingOverlay';
import PageRevealWipe from '../components/PageRevealWipe'; // Import the new wipe component

// MOCK DATA (ensure image paths and descriptions are correct)
const allProducts = [
  { id: 'p1', category: 'plants', name: 'Monstera Deliciosa', price: 1200, imageUrl: '/images/monstera.jpg', description: 'A popular and easy-to-care-for houseplant known for its unique, Swiss cheese-like leaves. Thrives in bright, indirect light.' },
  { id: 'p2', category: 'plants', name: 'Snake Plant', price: 800, imageUrl: '/images/snake-plant.jpg', description: 'A hardy succulent that can grow almost anywhere. It filters indoor air and is very low maintenance.' },
  { id: 'p3', category: 'plants', name: 'Fiddle Leaf Fig', price: 2500, imageUrl: '/images/fiddle-leaf.jpg', description: 'A trendy indoor tree with large, violin-shaped leaves. Requires bright, consistent light and careful watering.' },
  { id: 'p4', category: 'plants', name: 'Rose Bush (Red)', price: 500, imageUrl: '/images/rose-bush.jpg', description: 'Beautiful red rose bush, perfect for gardens. Requires full sun and regular care for vibrant blooms.' },
  { id: 's1', category: 'seeds', name: 'Tomato Seeds', price: 150, imageUrl: '/images/tomato-seeds.jpg', description: 'High-quality tomato seeds for growing your own delicious, juicy tomatoes at home. Suitable for various climates.' },
  { id: 's2', category: 'seeds', name: 'Marigold Seeds', price: 120, imageUrl: '/images/marigold-seeds.jpg', description: 'Easy-to-grow marigold seeds that produce vibrant orange and yellow flowers, great for borders and companion planting.' },
  { id: 'pt1', category: 'pots', name: 'Terracotta Pot (Medium)', price: 300, imageUrl: '/images/terracotta-pot.jpg', description: 'Classic medium-sized terracotta pot, porous and ideal for plants that prefer drier soil. Includes drainage hole.' },
  { id: 'pt2', category: 'pots', name: 'Ceramic Planter (Blue)', price: 750, imageUrl: '/images/ceramic-planter.jpg', description: 'Elegant blue ceramic planter with a glossy finish. Adds a touch of style to your indoor plants. Includes saucer.' },
  { id: 'pc1', category: 'plant-care', name: 'Organic Fertilizer', price: 250, imageUrl: '/images/fertilizer.jpg', description: 'All-purpose organic fertilizer to nourish your plants and promote healthy growth. Safe for all plant types.' },
  { id: 'pc2', category: 'plant-care', name: 'Gardening Tool Set', price: 900, imageUrl: '/images/gardening-tools.jpg', description: 'A basic 3-piece gardening tool set including a trowel, cultivator, and transplanter. Durable and comfortable to use.' },
];
const placeholderImage = '/images/placeholder-plant.jpg';


function ProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(true); // For data fetching
  const [isPageRevealing, setIsPageRevealing] = useState(true); // For the wipe animation
  const [showActualContent, setShowActualContent] = useState(false); // For content fade-in

  useEffect(() => {
    setIsLoadingData(true);
    setIsPageRevealing(true); // Start with page covered for reveal
    setShowActualContent(false);

    const foundProduct = allProducts.find(p => p.id === productId);
    
    setTimeout(() => { // Simulate data fetch
      setProduct(foundProduct);
      setIsLoadingData(false);
      // Once data loading is done, the PageRevealWipe (if not loading) will start its animation.
      // PageRevealWipe's onWipeComplete will then set showActualContent.
    }, 700); // Adjust simulated fetch time

  }, [productId]);

  const handleWipeComplete = () => {
    setIsPageRevealing(false); // Wipe is done
    setShowActualContent(true); // Now show the content
  };

  if (isLoadingData && !product) { // Show main loading overlay only during initial data fetch
    return <LoadingOverlay isActive={true} />;
  }

  if (!product && !isLoadingData) { // Product not found after loading
    return (
      <div className={styles.productPageContainer}>
        <div className={styles.notFound}>Product not found!</div>
      </div>
    );
  }

  // Capitalize category for breadcrumb
  const categoryDisplayName = product?.category.charAt(0).toUpperCase() + product.category.slice(1);

  return (
    <> {/* Use Fragment to allow PageRevealWipe and container to be siblings */}
      {/* The wipe component is active after data loading and before content is fully shown */}
      {!isLoadingData && isPageRevealing && <PageRevealWipe onWipeComplete={handleWipeComplete} />}
      
      <div 
        className={`${styles.productPageContainer} ${showActualContent ? styles.contentVisible : styles.contentHidden}`}
      >
        <nav aria-label="breadcrumb" className={styles.breadcrumbs}>
          <Link to="/products">Categories</Link> <span>&gt;</span> 
          {product && <Link to={`/products/${product.category.toLowerCase()}`}>{categoryDisplayName}</Link>}
          <span>&gt;</span> 
          {product?.name}
        </nav>

        <div className={styles.productDetailLayout}>
          <div className={styles.productImageColumn}>
            <img 
              src={product?.imageUrl || placeholderImage} 
              alt={product?.name} 
              className={styles.productImage} 
            />
          </div>

          <div className={styles.productInfoColumn}>
            <h1 className={styles.productName}>{product?.name}</h1>
            <p className={styles.productPrice}>₹{product?.price?.toFixed(2)}</p>
            
            <div className={styles.descriptionSection}>
              <h2 className={styles.sectionTitle}>Description</h2>
              <p className={styles.productDescription}>{product?.description || "No description available."}</p>
            </div>
            <button className={styles.addToCartButton}>Add to Cart</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductPage;