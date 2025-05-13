import React from 'react';
import styles from './ProductCard.module.css';
import { Link } from 'react-router-dom'; // To link to individual product page later

// Assuming placeholder image if actual product image is not available
const placeholderImage = '/images/placeholder-plant.jpg'; // Place a placeholder in public/images

function ProductCard({ product }) {
  return (
    <div className={styles.productCard}>
      <Link to={`/product/${product.id}`} className={styles.cardLink}> {/* Update to actual product path later */}
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
      {/* <button className={styles.addToCartButton}>Add to Cart</button> */} {/* Add later */}
    </div>
  );
}

export default ProductCard;