// client/src/pages/Home.js
import React from 'react';
import HeroSection from '../components/HeroSection';
// import styles from './Home.module.css'; // Assuming Home.module.css might not be needed or is minimal

function Home() {
  return (
    <div> {/* This div will allow HeroSection to be full width/height before the container */}
      <HeroSection />
      {/* Content below the hero section will go into a standard container */}
      <div className="container page-content-after-hero"> {/* Use a general or specific class for spacing */}
        <h2>Welcome to Our Plant Paradise!</h2>
        <p>
          Explore our collections, find plant care tips, or get in touch with us.
          We are here to help you bring more green into your life.
        </p>
        {/* You can add more sections here like: */}
        {/* <FeaturedProducts /> */}
        {/* <CareTipsPreview /> */}
      </div>
    </div>
  );
}

export default Home;