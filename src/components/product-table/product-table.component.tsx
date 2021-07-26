import axios from "axios";
import { useState, useEffect } from "react";
import { Product } from "../../Product";

const ProductTable = () => {
  useEffect(() => {
    getProducts();
  }, []);

  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = () => {
    const productsList: Product[] = [];
    const url = "http://206.189.39.185:5031/api/Product";
    axios.get(url).then((response) => {
      // console.log(response.data.data);
      response.data.data.forEach((item: any) => {
        productsList.push(item);
      });
      // console.log(productsList);
      setProducts(productsList);
    });
  };
  console.log(products);

  return (
    <div>
      product table
      {products.map((product, index) => (
        <p key={index}>{product.productName}</p>
      ))}
    </div>
  );
};

export default ProductTable;
