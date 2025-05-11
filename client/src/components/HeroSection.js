import React from 'react';
import styles from './HeroSection.module.css'; // Import CSS module

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Bring Nature Home</h1>
        <p className={styles.subtitle}>Discover a wide variety of plants to brighten your space.</p>
        <button className={styles.button}>Explore Plants</button>
      </div>
    </section>
  );
}

export default HeroSection;