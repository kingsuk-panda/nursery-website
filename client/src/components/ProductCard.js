import React from 'react';
import styles from './ProductCard.module.css';
import { Link } from 'react-router-dom';

const placeholderImage = '/images/placeholder-plant.jpg';

// Accept animationDelay prop
function ProductCard({ product, animationDelay }) { 
  return (
    // Apply animationDelay as an inline style to the root div
    <div 
      className={styles.productCard} 
      style={{ animationDelay: animationDelay || '0s' }}
    >
      <Link to={`/product/${product.id}`} className={styles.cardLink}>
        <img 
          src={product.imageUrl || placeholderImage} 
          alt={product.name} 
          className={styles.productImage} 
        />
        <div className={styles.productInfo}>
          <h3 className={styles.productName}>{product.name}</h3>
          <p className={styles.productPrice}>₹{product.price.toFixed(2)}</p>
        </div>
      </Link>
      {/* <button className={styles.addToCartButton}>Add to Cart</button> */}
    </div>
  );
}

export default ProductCard;