import React from "react";
import styles from "./Card3.module.css";
import { FaCheck } from "react-icons/fa";

const Card = ({ title, price, description, features, buttonText, highlight }) => {
  return (
    <div className={`${styles.card} ${highlight ? styles.highlight : ""}`}>
      <div className={styles.header}>
        <h3 className={`${styles.title} ${highlight ? styles.whiteText : ""}`}>{title}</h3>
        <p className={`${styles.price} ${highlight ? styles.priceHighlight : ""}`}>{price}</p>
        <p className={`${styles.description} ${highlight ? styles.whiteText : ""}`}>{description}</p>
      </div>

      <div className={styles.features}>
        {features.map((feature, index) => (
          <div key={index} className={styles.featureItem}>
            <FaCheck className={`${styles.icon} ${highlight ? styles.iconHighlight : ""}`} />
            <p className={`${styles.featureText} ${highlight ? styles.whiteText : ""}`}>{feature}</p>
          </div>
        ))}
      </div>

      <button className={`${styles.button} ${highlight ? styles.buttonHighlight : ""}`}>
        {buttonText}
      </button>
    </div>
  );
};

export default Card;
