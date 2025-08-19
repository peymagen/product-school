import Card from "./Card";
import { products } from "../data";

const Products = () => {
  return (
    <div className="flex flex-wrap gap-[32px] justify-center">
      {products.map((item, index) => (
        <Card key={index} {...item} />
      ))}
    </div>
  );
};

export default Products;
