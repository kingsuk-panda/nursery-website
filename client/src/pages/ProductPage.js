// client/src/pages/ProductPage.js

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './ProductPage.module.css';
import LoadingOverlay from '../components/LoadingOverlay';

// MOCK DATA - "Rose Bush (Red)" changed to "Rose Bush (Pink)"
const allProducts = [
  { 
    id: 'p1', category: 'plants', name: 'Monstera Deliciosa', 
    price: 1080, originalPrice: 1200, 
    imageUrl: '/images/monstera.jpg', 
    description: 'A popular and easy-to-care-for houseplant known for its unique, Swiss cheese-like leaves. Thrives in bright, indirect light. Comes in a standard nursery pot. Water when top 1-2 inches of soil are dry.',
    rating: 4.5, numReviews: 172,
    reviews: [
      { id: 'r1p1', user: 'Rohan S.', rating: 5, comment: 'Beautiful plant, arrived healthy and well-packaged! It\'s already a centerpiece in my living room.', date: '2025-05-01' },
      { id: 'r2p1', user: 'Priya K.', rating: 4, comment: 'Love it, but a bit smaller than I expected from the pictures. Still, it\'s a healthy specimen.', date: '2025-04-22' },
      { id: 'r3p1', user: 'Arjun M.', rating: 5, comment: 'Excellent quality and fantastic customer service. Highly recommend!', date: '2025-04-15' },
    ]
  },
  { 
    id: 'p2', category: 'plants', name: 'Snake Plant', 
    price: 800, originalPrice: null, 
    imageUrl: '/images/snake-plant.jpg', 
    description: 'A hardy succulent that can grow almost anywhere. It filters indoor air and is very low maintenance. Ideal for beginners or those with a busy lifestyle.',
    rating: 4.8, numReviews: 210,
    reviews: [
      { id: 'r1p2', user: 'Amit V.', rating: 5, comment: 'Perfect condition, very easy to care for. It\'s thriving!', date: '2025-05-05' },
      { id: 'r2p2', user: 'Sunita G.', rating: 5, comment: 'Great air purifier, and looks very stylish. Arrived quickly.', date: '2025-04-28' },
    ]
  },
  { 
    id: 'p3', category: 'plants', name: 'Fiddle Leaf Fig', 
    price: 2250, originalPrice: 2500,
    imageUrl: '/images/fiddle-leaf.jpg', 
    description: 'A trendy indoor tree with large, violin-shaped leaves. Requires bright, consistent light and careful watering. A statement piece for any modern home.',
    rating: 4.2, numReviews: 95,
    reviews: [
      { id: 'r1p3', user: 'Sneha M.', rating: 4, comment: 'Looks stunning, but a bit tricky to keep happy. Dropped a few leaves initially but seems stable now.', date: '2025-03-15' },
      { id: 'r2p3', user: 'Rajesh P.', rating: 3, comment: 'Beautiful but high maintenance. Not for the faint of heart!', date: '2025-02-20' },
    ]
  },
  { 
    id: 'p4', category: 'plants', name: 'Rose Bush (Pink)', // << UPDATED NAME
    price: 450, originalPrice: 500, 
    imageUrl: '/images/rose-bush-pink.jpg', // << SUGGESTED IMAGE URL UPDATE
    description: 'Beautiful pink rose bush, perfect for gardens or large pots. Requires full sun and regular care for vibrant blooms. Shipped as a bare-root plant.', // << UPDATED DESCRIPTION
    rating: 4.6, numReviews: 130,
    reviews: [
      { id: 'r1p4', user: 'Meena T.', rating: 5, comment: 'Bloomed beautifully within a few months!', date: '2025-04-18'}
    ]
  },
  { 
    id: 's1', category: 'seeds', name: 'Tomato Seeds', 
    price: 130, originalPrice: 150, 
    imageUrl: '/images/tomato-seeds.jpg', 
    description: 'High-quality tomato seeds for growing your own delicious, juicy tomatoes at home. Suitable for various climates. Pack of approx. 50 seeds.',
    rating: 4.0, numReviews: 65,
    reviews: [
      { id: 'r1s1', user: 'Vikram B.', rating: 4, comment: 'Good germination rate. Looking forward to the harvest.', date: '2025-04-10' },
    ]
  },
  { 
    id: 's2', category: 'seeds', name: 'Marigold Seeds', 
    price: 120, originalPrice: null, 
    imageUrl: '/images/marigold-seeds.jpg', 
    description: 'Easy-to-grow marigold seeds that produce vibrant orange and yellow flowers, great for borders and companion planting. Helps deter pests. Pack of approx. 100 seeds.',
    rating: 4.3, numReviews: 77,
    reviews: []
  },
  { 
    id: 'pt1', category: 'pots', name: 'Terracotta Pot (Medium)', 
    price: 280, originalPrice: 320, 
    imageUrl: '/images/terracotta-pot.jpg', 
    description: 'Classic medium-sized terracotta pot (6-inch diameter), porous and ideal for plants that prefer drier soil. Includes drainage hole and matching saucer.',
    rating: 4.7, numReviews: 150,
    reviews: [ {id: 'r1pt1', user: 'Geeta R.', rating: 5, comment: 'Perfect for my succulents! Great quality.', date: '2025-05-03'} ]
  },
  { 
    id: 'pt2', category: 'pots', name: 'Ceramic Planter (Blue)', 
    price: 750, originalPrice: null, 
    imageUrl: '/images/ceramic-planter.jpg', 
    description: 'Elegant blue ceramic planter with a glossy finish and subtle wave pattern. Adds a touch of style to your indoor plants. Size: 5-inch diameter. Includes attached saucer.',
    rating: 4.9, numReviews: 92,
    reviews: []
  },
  { 
    id: 'pc1', category: 'plant-care', name: 'Organic Fertilizer', 
    price: 220, originalPrice: 250, 
    imageUrl: '/images/fertilizer.jpg', 
    description: 'All-purpose organic fertilizer (500g pack) to nourish your plants and promote healthy growth. Rich in micronutrients. Safe for all plant types, indoor and outdoor.',
    rating: 4.4, numReviews: 105,
    reviews: []
  },
  { 
    id: 'pc2', category: 'plant-care', name: 'Gardening Tool Set', 
    price: 900, originalPrice: 999, 
    imageUrl: '/images/gardening-tools.jpg', 
    description: 'A durable 3-piece gardening tool set including a trowel, cultivator, and transplanter. Ergonomic handles for comfort. Made with rust-resistant aluminum.',
    rating: 4.1, numReviews: 55,
    reviews: []
  },
];
const placeholderImage = '/images/placeholder-plant.jpg';

// Helper function to render star ratings (already here from previous step)
const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.4 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<span key={`full-${i}`} className={styles.starFull}>★</span>);
  }
  if (halfStar) {
    stars.push(<span key="half" className={styles.starHalf}>★</span>); 
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<span key={`empty-${i}`} className={styles.starEmpty}>☆</span>);
  }
  return stars;
};

function ProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [animateContent, setAnimateContent] = useState(false); 
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setIsLoadingData(true);
    setAnimateContent(false); 
    setQuantity(1);

    const foundProduct = allProducts.find(p => p.id === productId);
    
    setTimeout(() => { 
      setProduct(foundProduct);
      setIsLoadingData(false);
      setTimeout(() => setAnimateContent(true), 50); 
    }, 700); 

  }, [productId]);

  const handleQuantityChange = (amount) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  if (isLoadingData && !product) {
    return <LoadingOverlay isActive={true} />;
  }

  if (!product && !isLoadingData) {
    return (
      <div className={`${styles.productPageContainer} ${styles.contentIsReady}`}>
        <div className={styles.notFound}>Product not found!</div>
      </div>
    );
  }
  
  const categoryDisplayName = product?.category.charAt(0).toUpperCase() + product.category.slice(1);
  const discountPercent = product.originalPrice && product.price < product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
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
            className={`${styles.productImage} ${animateContent ? styles.imageAnim : ''}`} 
          />
        </div>

        <div className={`${styles.productInfoColumn} ${animateContent ? styles.textFadeIn : ''}`}>
          <h1 className={styles.productName}>{product?.name}</h1>

          {product.rating && product.numReviews > 0 && (
            <div className={styles.ratingSummary}>
              <span className={styles.starsDisplay}>{renderStars(product.rating)}</span>
              <span className={styles.ratingValue}>{product.rating.toFixed(1)}</span>
              <a href="#reviewsSection" className={styles.numReviewsLink}>({product.numReviews} reviews)</a>
            </div>
          )}

          <div className={styles.priceSection}>
            <span className={styles.currentPrice}>₹{product.price.toFixed(2)}</span>
            {discountPercent > 0 && product.originalPrice && (
              <>
                <span className={styles.originalPrice}>₹{product.originalPrice.toFixed(2)}</span>
                <span className={styles.discountBadge}>{discountPercent}% OFF</span>
              </>
            )}
          </div>
          
          <div className={styles.quantitySelector}>
            <span className={styles.quantityLabel}>Quantity:</span>
            <button onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1} aria-label="Decrease quantity">-</button>
            <input type="text" value={quantity} readOnly aria-label="Current quantity" className={styles.quantityInput} />
            <button onClick={() => handleQuantityChange(1)} aria-label="Increase quantity">+</button>
          </div>

          <div className={styles.actionButtons}>
            <button className={styles.addToCartButton}>Add to Cart</button>
            <button className={styles.buyNowButton}>Buy Now</button>
          </div>
          
          <div className={styles.descriptionSection}>
            <h2 className={styles.sectionTitle}>About this item</h2>
            <p className={styles.productDescription}>{product?.description || "No description available."}</p>
          </div>
        </div>
      </div>

      <div id="reviewsSection" className={`${styles.reviewsSection} ${animateContent ? styles.textFadeInDelayed : ''}`}>
        <h2 className={styles.sectionTitleFullWidth}>Ratings & Reviews</h2>
        {product.reviews && product.reviews.length > 0 ? (
          <div className={styles.reviewList}>
            {product.reviews.map(review => (
              <div key={review.id} className={styles.reviewItem}>
                <div className={styles.reviewHeader}>
                  <strong className={styles.reviewUser}>{review.user}</strong>
                  <span className={styles.reviewStars}>{renderStars(review.rating)}</span>
                </div>
                <p className={styles.reviewComment}>{review.comment}</p>
                <span className={styles.reviewDate}>{review.date}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.noReviewsMessage}>No reviews yet for this product. Be the first to write one!</p>
        )}
      </div>
    </div>
  );
}

export default ProductPage;