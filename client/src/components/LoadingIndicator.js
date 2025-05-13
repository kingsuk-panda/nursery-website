import React, { useMemo } from 'react';
import styles from './LoadingIndicator.module.css';

function LoadingIndicator({ text = "Loading..." }) {
  // Split the text into characters. useMemo prevents re-splitting on every render.
  const characters = useMemo(() => text.split(''), [text]);

  return (
    // Container to center the loading text
    <div className={styles.loadingContainer}>
      <span className={styles.loadingText}>
        {characters.map((char, index) => (
          <span 
            key={`${char}-${index}`} // More stable key
            className={styles.char}
            style={{ animationDelay: `${index * 0.08}s` }} // Stagger delay for each letter
          >
            {/* Use a non-breaking space for actual spaces to maintain layout */}
            {char === ' ' ? '\u00A0' : char} 
          </span>
        ))}
      </span>
    </div>
  );
}

export default LoadingIndicator;