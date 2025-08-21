import Card from "./Card";
import { products } from "../data";
import styles from "./Products.module.css";

const Products = () => {
  return (
    <div className={styles.productsContainer}>
      {products.map((item, index) => (
        <Card key={index} {...item} />
      ))}
    </div>
  );
};

export default Products;
