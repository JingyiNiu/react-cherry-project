import ProductTable from "../../components/product-table/product-table.component"; // arrow function product table

import "./products.style.css";

const Products = () => {
  return (
    <div className='main-container'>
      <h1>Product Page</h1>
      <ProductTable />
    </div>
  );
};

export default Products;
