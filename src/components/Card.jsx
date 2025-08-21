import { IoMdCheckboxOutline } from "react-icons/io";
import styles from "./Card.module.css";

const Card = ({ title, features, type }) => {
  const isDark = type === "dark";

  return (
    <div className={`${styles.card} ${isDark ? styles.darkCard : styles.lightCard}`}>
      <p className={`${styles.title} ${isDark ? styles.darkTitle : styles.lightTitle}`}>
        {title}
      </p>

      <div className={styles.features}>
        {features.map((feature, i) => (
          <div key={i} className={styles.featureItem}>
            <IoMdCheckboxOutline
              className={`${styles.icon} ${isDark ? styles.darkIcon : styles.lightIcon}`}
            />
            <p className={`${styles.featureText} ${isDark ? styles.darkText : styles.lightText}`}>
              {feature}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
