
import React from "react";
import styles from "./Card2.module.css";

const Card = ({ quoteImg, text, avatar, name, position, bgColor, textColor }) => {
  return (
    <div className={`${styles.card} ${bgColor} ${textColor}`}>
      {/* Quote Section */}
      <div className={styles.quoteSection}>
        <img src={quoteImg} alt="Quote" className={styles.quoteImg} />
        <p className={styles.quoteText}>{text}</p>
      </div>

      {/* Profile Section */}
      <div className={styles.profile}>
        <img src={avatar} alt={name} className={styles.avatar} />
        <div className={styles.userInfo}>
          <p className={styles.name}>{name}</p>
          <p className={styles.position}>{position}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
