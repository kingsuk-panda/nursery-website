import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './ProductPage.module.css';
import LoadingOverlay from '../components/LoadingOverlay';

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
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [animateContent, setAnimateContent] = useState(false); 

  useEffect(() => {
    setIsLoadingData(true);
    setAnimateContent(false); 

    const foundProduct = allProducts.find(p => p.id === productId);
    
    setTimeout(() => { 
      setProduct(foundProduct);
      setIsLoadingData(false);
      setTimeout(() => setAnimateContent(true), 50); 
    }, 700); 

  }, [productId]);

  if (isLoadingData && !product) {
    return <LoadingOverlay isActive={true} />;
  }

  if (!product && !isLoadingData) {
    return (
      <div className={`${styles.productPageContainer} ${styles.contentVisible}`}> {/* Ensure container is visible */}
        <div className={styles.notFound}>Product not found!</div>
      </div>
    );
  }
  
  const categoryDisplayName = product?.category.charAt(0).toUpperCase() + product.category.slice(1);

  return (
    // Main container gets a simple visibility class or a very subtle base animation
    <div 
      className={`${styles.productPageContainer} ${animateContent ? styles.contentIsReady : styles.contentHiddenInitially}`}
    >
      <nav aria-label="breadcrumb" className={`${styles.breadcrumbs} ${animateContent ? styles.textFadeIn : ''}`}>
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
            // Apply image animation class when animateContent is true
            className={`${styles.productImage} ${animateContent ? styles.imageAnim : ''}`} 
          />
        </div>

        {/* Apply text animation class to the whole info column */}
        <div className={`${styles.productInfoColumn} ${animateContent ? styles.textFadeIn : ''}`}>
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
  );
}

export default ProductPage;