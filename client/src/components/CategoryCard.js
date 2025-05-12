import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CategoryCard.module.css';

function CategoryCard({ name, linkTo, backgroundImageUrl }) {
  // Style for the card itself, to apply the background image
  const cardStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
  };

  return (
    <Link to={linkTo} className={styles.cardLink}>
      <div className={styles.categoryCard} style={cardStyle}>
        <div className={styles.cardOverlay}> {/* For the blur and content */}
          <h2 className={styles.categoryName}>{name}</h2>
        </div>
      </div>
    </Link>
  );
}

export default CategoryCard;