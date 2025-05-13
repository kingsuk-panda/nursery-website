import React, { useState, useEffect } from 'react';
import styles from './PageRevealWipe.module.css';

function PageRevealWipe({ onWipeComplete }) {
  const [isWipingOut, setIsWipingOut] = useState(false);

  useEffect(() => {
    // Start the wipe-out animation shortly after the component mounts
    const wipeOutTimer = setTimeout(() => {
      setIsWipingOut(true);
    }, 100); // Short delay to ensure initial styles are applied

    // Call the onWipeComplete callback after the animation duration
    // Match this duration to your CSS animation/transition
    const animationDuration = 700; // e.g., 0.7s
    const completeTimer = setTimeout(() => {
      if (onWipeComplete) {
        onWipeComplete();
      }
    }, 100 + animationDuration);

    return () => {
      clearTimeout(wipeOutTimer);
      clearTimeout(completeTimer);
    };
  }, [onWipeComplete]);

  return (
    <div 
      className={`${styles.wipeOverlay} ${isWipingOut ? styles.wipingOut : styles.visible}`} 
    />
  );
}

export default PageRevealWipe;