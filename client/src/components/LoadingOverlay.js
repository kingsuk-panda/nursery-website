import React from 'react';
import styles from './LoadingOverlay.module.css';

// Updated Spinner component for pulsing dots
function Spinner() {
  return (
    <div className={styles.spinnerContainer}> {/* Renamed for clarity, now a container for dots */}
      <div className={`${styles.dot} ${styles.dot1}`}></div>
      <div className={`${styles.dot} ${styles.dot2}`}></div>
      <div className={`${styles.dot} ${styles.dot3}`}></div>
    </div>
  );
}

function LoadingOverlay({ isActive }) {
  if (!isActive) {
    return null;
  }

  return (
    <div className={styles.overlay} aria-live="polite" aria-busy="true">
      <Spinner />
    </div>
  );
}

export default LoadingOverlay;