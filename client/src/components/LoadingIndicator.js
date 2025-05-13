import React, { useMemo, forwardRef } from 'react'; // Import forwardRef
import styles from './LoadingIndicator.module.css';

// Wrap the component definition with forwardRef
const LoadingIndicator = forwardRef(({ text = "Loading..." }, ref) => {
  const characters = useMemo(() => text.split(''), [text]);

  return (
    // Attach the forwarded ref to the root div element
    <div className={styles.loadingContainer} ref={ref}> 
      <span className={styles.loadingText}>
        {characters.map((char, index) => (
          <span 
            key={`${char}-${index}`}
            className={styles.char}
            style={{ animationDelay: `${index * 0.04}s` }} 
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
    </div>
  );
}); // Note the closing parenthesis for forwardRef

export default LoadingIndicator;