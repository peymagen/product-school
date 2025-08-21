import React from "react";
import Card from "./card2.jsx";
import { testimonials } from "./data2.js";
import styles from "./Testimonial.module.css";

const App = () => {
  return (
    <div className={styles.container}>
      {testimonials.map((item, index) => (
        <Card key={index} {...item} />
      ))}
    </div>
  );
};

export default App;
