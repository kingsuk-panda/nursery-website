import React from 'react';
import styles from './HeroSection.module.css';
// Import your video
import heroVideo from '../assets/videos/hero-video.mp4'; // Adjust path if needed

function HeroSection() {
  return (
    <section className={styles.hero}>
      <video 
        className={styles.heroVideo} 
        autoPlay 
        loop 
        muted 
        playsInline 
        key={heroVideo} // Adding key helps React re-render if src changes
      >
        <source src={heroVideo} type="video/mp4" />
        {/* You can add other sources here for different formats if you have them */}
        {/* e.g., <source src={heroVideoWebM} type="video/webm" /> */}
        Your browser does not support the video tag.
      </video>
      {/* The ::before pseudo-element on .hero will act as the dark overlay */}
      <div className={styles.content}>
        <h1 className={styles.title}>Bring Nature Home</h1>
        <p className={styles.subtitle}>Discover a wide variety of plants to brighten your space.</p>
        <button className={styles.button}>Explore Plants</button>
      </div>
    </section>
  );
}

export default HeroSection;