import React from "react";
import styles from "./Plan.module.css";
import Card from "../Card3/Card3";
import plans from '../Data3'

const Plan = () => {
  return (
    <section className={styles.planSection}>
      
      <div className={styles.cardContainer}>
        {plans.map((plan, index) => (
          <Card key={index} {...plan} />
        ))}
      </div>
    </section>
  );
};

export default Plan;
