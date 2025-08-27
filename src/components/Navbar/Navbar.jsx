import React, { useState, useEffect } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import Logo from "../assets/Logo Icon.png";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1030);

  const menu = ["Features", "Products", "Resources", "Pricing"];

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1030);
      if (window.innerWidth >= 1030) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDropdown = (item) => {
    setOpenDropdown(openDropdown === item ? null : item);
  };

  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <div className={styles.logoContainer}>
        <img src={Logo} alt="Logo" className={styles.logoImage} />
        <span className={styles.logoText}>Acadex</span>
      </div>

      {/* Desktop Menu */}
      {isDesktop && (
        <ul className={styles.menu}>
          {menu.map((item) => (
            <li
              key={item}
              className={styles.menuItem}
              onClick={() => toggleDropdown(item)}
            >
              <span className={styles.menuLabel}>
                {item}
                {openDropdown === item ? (
                  <MdKeyboardArrowUp className={styles.icon} />
                ) : (
                  <MdKeyboardArrowDown className={styles.icon} />
                )}
              </span>
              {openDropdown === item && (
                <div className={styles.dropdown}>
                  <a href="#">{item} option 1</a>
                  <a href="#">{item} option 2</a>
                  <a href="#">{item} option 3</a>
                </div>
              )}
            </li>
          ))}
          <li>
            <button className={styles.ctaButton}>
              Get in touch <FaArrowRight className={styles.icon} />
            </button>
          </li>
        </ul>
      )}

      {/* Mobile Toggle */}
      {!isDesktop && (
        <button
          className={styles.mobileButton}
          onClick={() => {
            setIsMenuOpen((prev) => !prev);
            setOpenDropdown(null);
          }}
        >
          {isMenuOpen ? (
            <IoMdClose className={styles.icon1} />
          ) : (
            <IoMdMenu className={styles.icon1} />
          )}
        </button>
      )}

      {/* Mobile Menu */}
      {!isDesktop && isMenuOpen && (
        <div className={styles.mobileMenu}>
          <ul className={styles.mobileMenuList}>
            {menu.map((item) => (
              <li key={item} className={styles.mobileMenuItem}>
                <div
                  className={styles.mobileMenuHeader}
                  onClick={() => toggleDropdown(item)}
                >
                  <span>{item}</span>
                  {openDropdown === item ? (
                    <MdKeyboardArrowUp className={styles.icon} />
                  ) : (
                    <MdKeyboardArrowDown className={styles.icon} />
                  )}
                </div>
                {openDropdown === item && (
                  <div className={styles.dropdown}>
                    <p>{item} option 1</p>
                    <p>{item} option 2</p>
                    <p>{item} option 3</p>
                  </div>
                )}
              </li>
            ))}
            <li className={styles.mobileCta}>
              <button className={styles.mobileCtaButton}>
                Get in touch <FaArrowRight className={styles.icon} />
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;