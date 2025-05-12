import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CategoryCard.module.css';

// Accept videoUrl prop instead of backgroundImageUrl
function CategoryCard({ name, linkTo, videoUrl, animationDelay }) { 
  // Removed cardStyle for background image

  return (
    <Link 
      to={linkTo} 
      className={styles.cardLink} 
      style={{ animationDelay: animationDelay || '0s' }} 
    >
      <div className={styles.categoryCard}> {/* No inline style needed here anymore */}
        {/* 👇 Add the video element 👇 */}
        <video 
          className={styles.cardVideo} 
          src={videoUrl} // Use the videoUrl prop
          autoPlay 
          loop 
          muted 
          playsInline
          key={videoUrl} // Helps React if src changes
        >
          Your browser does not support the video tag.
        </video>
        <div className={styles.cardOverlay}> {/* This will sit on top of the video */}
          <h2 className={styles.categoryName}>{name}</h2>
        </div>
      </div>
    </Link>
  );
}

export default CategoryCard;