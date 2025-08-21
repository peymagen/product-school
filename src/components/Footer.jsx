import React, { useState } from "react";
import Logo from '../assets/Logo Icon.png'
import { FaArrowRight } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import icon from '../assets/Icon.png';
import styles from './Footer.module.css'

const Footer = () => {
  const [selectedOption, setSelectedOption] = useState("english");
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Top Section */}
        <div className={styles.topSection}>
          {/* Logo */}
          <div className={styles.logoContainer}>
            <img src={Logo} alt="Logo" className={styles.logo} />
            <span className={styles.logoText}>Acadex</span>
          </div>

          {/* Links */}
          <div className={styles.links}>
            <p className={styles.heading}>Product</p>
            <a href="/">Overview</a>
            <a href="/">Pricing</a>
            <a href="/">Customer stories</a>
          </div>

          <div className={styles.links}>
            <p className={styles.heading}>Resources</p>
            <a href="/">Blog</a>
            <a href="/">Guides & tutorials</a>
            <a href="/">Help center</a>
          </div>

          <div className={styles.links}>
            <p className={styles.heading}>Company</p>
            <a href="/">About us</a>
            <a href="/">Careers</a>
            <a href="/">Media kit</a>
          </div>

          {/* CTA */}
          <div className={styles.cta}>
            <p className={styles.ctaHeading}>Try It Today</p>
            <p className={styles.ctaText}>
              Get started for free. Add your whole team as your needs grow.
            </p>
            <button className={styles.demoButton}>
              <span>Book Demo</span>
              <FaArrowRight />
            </button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={styles.bottomSection}>
          <div className={styles.left}>
            {/* Language Dropdown */}
            <div className={styles.dropdown}>
              <img src={icon} alt="Language" className={styles.icon} />
              <span onClick={toggleDropdown} className={styles.dropdownText}>
                {selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)}
              </span>
              <FaChevronDown onClick={toggleDropdown} className={styles.chevron} />

              {showDropdown && (
                <div className={styles.dropdownMenu}>
                  <p onClick={() => { setSelectedOption("english"); setShowDropdown(false); }}>English</p>
                  <p onClick={() => { setSelectedOption("hindi"); setShowDropdown(false); }}>Hindi</p>
                </div>
              )}
            </div>

            {/* Footer Links */}
            <p>Terms & privacy</p>
            <p>Security</p>
            <p>Status</p>
            <p>©2025</p>
          </div>

          {/* Social */}
          <div className={styles.social}>
            <FaTwitter />
            <FaFacebookF />
            <FaLinkedinIn />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;