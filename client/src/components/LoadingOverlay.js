import React from 'react';
import styles from './LoadingOverlay.module.css';

// Simple CSS spinner component nested inside
function Spinner() {
  return <div className={styles.spinner}></div>;
}

function LoadingOverlay({ isActive }) {
  // Render nothing if not active
  if (!isActive) {
    return null; 
  }

  // Otherwise, render the overlay with the spinner
  return (
    <div className={styles.overlay} aria-live="polite" aria-busy="true">
      <Spinner />
    </div>
  );
}

export default LoadingOverlay;