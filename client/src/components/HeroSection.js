import React from 'react'; // Removed useState, useEffect as they are no longer needed for subtitle
import styles from './HeroSection.module.css';
import heroVideo from '../assets/videos/hero-video.mp4'; // Make sure this path is correct
import nurseryLogo from '../assets/nursery-logo.png'; // Make sure this path is correct

// The full subtitle text is now directly in the JSX
// const fullSubtitleText = "Brighten your world with sustainable greens, nurtured by empowered women and blessed by Devi's touch.";
// const TYPING_SPEED_MS = 50; 
// const TYPING_DELAY_MS = 400;

function HeroSection() {
  // Removed useState for displayedSubtitle and isTypingComplete
  // Removed useEffect for typing animation

  return (
    <section className={styles.hero}>
      <video 
        className={styles.heroVideo} 
        autoPlay 
        loop 
        muted 
        playsInline 
        key={heroVideo}
      >
        <source src={heroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={styles.content}>
        <img 
          src={nurseryLogo} 
          alt="Evergreen Pushpanjali Nursery Logo" 
          className={styles.heroLogo} 
        />
        <h1 className={styles.title}>Evergreen Pushpanjali Nursery</h1>
        {/* Subtitle now directly renders the full text */}
        <p className={styles.subtitle}>
          Brighten your world with sustainable greens, nurtured by empowered women and blessed by Devi's touch.
        </p>
        <button className={styles.button}>Explore Plants</button>
      </div>
    </section>
  );
}

export default HeroSection;