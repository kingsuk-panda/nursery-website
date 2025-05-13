import React from 'react';
import styles from './ProductCard.module.css';
import { Link } from 'react-router-dom';

const placeholderImage = '/images/placeholder-plant.jpg';

// Helper function to render star ratings for ProductCard
const renderStarsProductCard = (rating) => {
  const stars = [];
  // Ensure rating is a number
  const numericRating = parseFloat(rating);
  if (isNaN(numericRating)) {
    return null; // Or some placeholder for missing rating
  }

  const fullStars = Math.floor(numericRating);
  const halfStar = numericRating % 1 >= 0.4 ? 1 : 0; // Threshold for showing a "half" (visually full) star
  const emptyStars = 5 - fullStars - halfStar;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<span key={`full-${i}`} className={styles.starFull}>★</span>);
  }
  if (halfStar) {
    // For card simplicity, a full star character is often used, styling might differentiate
    // or a dedicated half-star icon/SVG if available.
    stars.push(<span key="half" className={styles.starHalf}>★</span>); 
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<span key={`empty-${i}`} className={styles.starEmpty}>☆</span>);
  }
  return stars;
};

function ProductCard({ product, animationDelay }) { 
  // Ensure price and originalPrice are numbers for calculations
  const currentPrice = parseFloat(product.price);
  const originalPriceNum = product.originalPrice ? parseFloat(product.originalPrice) : null;

  const hasDiscount = originalPriceNum && originalPriceNum > currentPrice;
  const discountPercent = hasDiscount 
    ? Math.round(((originalPriceNum - currentPrice) / originalPriceNum) * 100)
    : 0;

  return (
    <div 
      className={styles.productCard} 
      style={{ animationDelay: animationDelay || '0s' }}
    >
      <Link to={`/product/${product.id}`} className={styles.cardLink}>
        <div className={styles.imageContainer}>
          <img 
            src={product.imageUrl || placeholderImage} 
            alt={product.name} 
            className={styles.productImage} 
          />
          {hasDiscount && discountPercent > 0 && ( // Only show if discount is actual
            <div className={styles.discountBadgeOnImage}>{discountPercent}% OFF</div>
          )}
        </div>
        <div className={styles.productInfo}>
          <h3 className={styles.productName}>{product.name}</h3>
          
          {/* Rating Display */}
          {typeof product.rating === 'number' && product.numReviews > 0 && (
            <div className={styles.ratingLine}>
              <span className={styles.cardStars}>{renderStarsProductCard(product.rating)}</span>
              <span className={styles.cardNumReviews}>({product.numReviews})</span>
            </div>
          )}
           {/* Fallback for no rating or if you want to show something else */}
           { (typeof product.rating !== 'number' || product.numReviews === 0) && product.rating !== null && (
             <div className={styles.ratingLinePlaceholder}></div> // Ensures consistent height if no rating
           )}


          {/* Price Display */}
          <div className={styles.priceLine}>
            <span className={styles.currentCardPrice}>₹{currentPrice.toFixed(2)}</span>
            {hasDiscount && originalPriceNum && (
              <span className={styles.originalCardPrice}>₹{originalPriceNum.toFixed(2)}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;