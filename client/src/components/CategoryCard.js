import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CategoryCard.module.css';

// Accept animationDelay prop
function CategoryCard({ name, linkTo, backgroundImageUrl, animationDelay }) { 
  const cardStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
  };

  return (
    <Link 
      to={linkTo} 
      className={styles.cardLink} 
      // Apply the animationDelay as an inline style
      style={{ animationDelay: animationDelay || '0s' }} 
    >
      <div className={styles.categoryCard} style={cardStyle}>
        <div className={styles.cardOverlay}>
          <h2 className={styles.categoryName}>{name}</h2>
        </div>
      </div>
    </Link>
  );
}

export default CategoryCard;