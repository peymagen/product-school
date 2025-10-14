import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import styles from './Hero.module.css';  // Import CSS Module

const Hero = () => (
  <div className={styles.hero}>
    {/* Left Side */}
    <div className={styles.heroContent}>
      <h1 className={styles.title}>
        One Platform for Your Entire Campus
      </h1>
      <p className={styles.subtitle}>
        Manage your school or college website, ERP, and communication — all in one place.
      </p>
      <button className={styles.button}>
        Book Demo
        <FaArrowRight className="w-[10px] h-[10px]" />
      </button>
    </div>

    {/* Right Side */}
    <div className={styles.rightBox}>
      {/* Add image or illustration here later */}
    </div>
  </div>
);

export default Hero;
